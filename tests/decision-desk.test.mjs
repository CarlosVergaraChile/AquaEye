import test from "node:test";
import assert from "node:assert/strict";
import {evaluateDecision,compareDecisions,exportDecisionCSV} from "../decision-desk/model.js";
const item={name:"Evaluación de alimentación",currency:"USD",horizon:"12 meses",
 benefits:{low:100,base:250,high:400},costs:{low:90,base:140,high:200},
 evidence:"Cifras ficticias para prueba",assumptions:"No representa resultados reales"};
test("rango económico consistente sin Monte Carlo inventado",()=>{
 const x=evaluateDecision(item);
 assert.deepEqual(x.net,{conservative:-100,base:110,optimistic:310});
 assert.equal(x.breakEvenBenefit,140);assert.equal(x.classification,"INCIERTO");
});
test("faltan fuentes: nunca inferir confianza",()=>{const x=evaluateDecision({...item,evidence:""});assert.equal(x.classification,"EVIDENCIA_PENDIENTE")});
test("favorable solo bajo los supuestos incluso en extremo conservador",()=>{const x=evaluateDecision({...item,benefits:{low:300,base:400,high:500}});assert.equal(x.classification,"FAVORABLE_BAJO_SUPUESTOS")});
test("rechazar rangos invertidos, negativos, no numéricos",()=>{
 assert.throws(()=>evaluateDecision({...item,costs:{low:100,base:90,high:150}}),/mínimo/);
 assert.throws(()=>evaluateDecision({...item,benefits:{low:-1,base:200,high:300}}),/no negativo/);
 assert.throws(()=>evaluateDecision({...item,costs:{low:0,base:"50",high:90}}),/no negativo/);
});
test("jamás mezclar NOK/USD o horizontes distintos",()=>{
 assert.throws(()=>compareDecisions([item,{...item,name:"Otra",currency:"NOK"}]),/monedas/);
 assert.throws(()=>compareDecisions([item,{...item,name:"Otra",horizon:"1 mes"}]),/horizontes/);
});
test("registro observado no atribuye causalidad",()=>{
 const x=evaluateDecision({...item,actual:{benefit:190,cost:165,source:"Reporte autorizado de fin de período"}});
 assert.equal(x.outcome.net,25);
 assert.equal(x.outcome.varianceVsBase,-85);
 assert.match(x.outcome.caution,/no atribuye causalidad/);
});
test("CSV funciona con comillas, números y valores observados",()=>{
 const c=compareDecisions([{...item,name:'Prueba "A"'}]);
 const csv=exportDecisionCSV(c);
 assert.match(csv,/""A""/);assert.match(csv,/"110"/);
});
test("rechazar alternativas duplicadas y más de 10",()=>{
 assert.throws(()=>compareDecisions([item,item]),/duplicados/);
 assert.throws(()=>compareDecisions(Array.from({length:11},(_,i)=>({...item,name:String(i)}))),/entre 1 y 10/);
});
