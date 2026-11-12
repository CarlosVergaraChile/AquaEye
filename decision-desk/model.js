/**
 * AquaEye Decision Desk v0.1.
 * A transparent decision comparison, NOT a biological, causal or financial forecast.
 * All monetary amounts MUST share a currency and evaluation horizon.
 * No personal, client-confidential or production data should be used in the public demo.
 */
const money=(n,name)=>{if(typeof n!=="number"||!Number.isFinite(n)||n<0||n>1e15)throw new Error(name+": se requiere monto finito no negativo");return n};
const text=(s,name,max=160)=>{if(typeof s!=="string"||!s.trim()||s.length>max)throw new Error(name+": texto obligatorio y limitado");return s.trim()};
const MONEY=["CLP","USD","NOK","EUR"];
function ordered(x,name){
 if(!x||typeof x!=="object"||Array.isArray(x))throw new Error(name+": se requieren tres montos");
 const low=money(x.low,name+".low"),base=money(x.base,name+".base"),high=money(x.high,name+".high");
 if(low>base||base>high)throw new Error(name+": debe cumplirse mínimo <= base <= máximo");
 return {low,base,high};
}
export function evaluateDecision(input){
 if(!input||typeof input!=="object"||Array.isArray(input))throw new Error("decisión inválida");
 const name=text(input.name,"nombre"),horizon=text(input.horizon,"horizonte",80);
 const currency=input.currency;if(!MONEY.includes(currency))throw new Error("moneda inválida");
 const benefits=ordered(input.benefits,"beneficios"),costs=ordered(input.costs,"costos");
 const evidence=typeof input.evidence==="string"?input.evidence.trim():"";
 if(evidence.length>900)throw new Error("fuente demasiado larga");
 const assumptions=typeof input.assumptions==="string"?input.assumptions.trim():"";
 if(assumptions.length>1200)throw new Error("supuestos demasiado largos");
 const net={conservative:benefits.low-costs.high,base:benefits.base-costs.base,optimistic:benefits.high-costs.low};
 const threshold=costs.base;
 const classification=!evidence?"EVIDENCIA_PENDIENTE":
    net.optimistic<0?"NO_FAVORABLE_EN_ESCENARIOS":
    net.conservative>0?"FAVORABLE_BAJO_SUPUESTOS":
    "INCIERTO";
 const actual=input.actual;
 let outcome=null;
 if(actual!==undefined&&actual!==null){
   if(typeof actual!=="object"||Array.isArray(actual))throw new Error("resultado observado inválido");
   const observedBenefit=money(actual.benefit,"beneficio observado");
   const observedCost=money(actual.cost,"costo observado");
   const source=text(actual.source,"fuente resultado",300);
   outcome={benefit:observedBenefit,cost:observedCost,net:observedBenefit-observedCost,
     varianceVsBase:observedBenefit-observedCost-net.base,source,
     caution:"Diferencia descriptiva; no atribuye causalidad ni supone impacto incremental sin un contrafactual válido."};
 }
 return {name,horizon,currency,benefits,costs,assumptions,evidence,
   net,breakEvenBenefit:threshold,
   classification,outcome,
   caveat:"Montos ingresados por el usuario. El rango combina extremos, no es intervalo estadístico ni predicción. No autoriza intervenciones sanitarias ni sustituye la evaluación de cumplimiento o bienestar animal."};
}
export function compareDecisions(inputs){
 if(!Array.isArray(inputs)||inputs.length<1||inputs.length>10)throw new Error("se requieren entre 1 y 10 alternativas");
 const decisions=inputs.map(evaluateDecision);
 const currency=decisions[0].currency,horizon=decisions[0].horizon;
 if(decisions.some(x=>x.currency!==currency||x.horizon!==horizon))
   throw new Error("no comparar distintas monedas o horizontes");
 const names=new Set(decisions.map(x=>x.name.toLowerCase()));
 if(names.size!==decisions.length)throw new Error("nombres duplicados");
 return {currency,horizon,decisions,
   disclaimer:"Comparación de hipótesis, NO recomendación automática. Revisar riesgos, ética, bienestar, regulación y factibilidad con especialistas."};
}
export function exportDecisionCSV(summary){
 if(!summary||!Array.isArray(summary.decisions))throw new Error("resumen inválido");
 const head=["Alternativa","Moneda","Horizonte","Beneficio_min","Beneficio_base","Beneficio_max","Costo_min","Costo_base","Costo_max","Neto_conservador","Neto_base","Neto_optimista","Clasificacion","Fuente","Supuestos","Neto_observado"];
 const quote=x=>'"'+String(x??"").replaceAll('"','""')+'"';
 const lines=summary.decisions.map(d=>[d.name,d.currency,d.horizon,d.benefits.low,d.benefits.base,d.benefits.high,d.costs.low,d.costs.base,d.costs.high,d.net.conservative,d.net.base,d.net.optimistic,d.classification,d.evidence,d.assumptions,d.outcome?.net??""].map(quote).join(";"));
 return "\uFEFF"+[head.join(";"),...lines].join("\r\n");
}
