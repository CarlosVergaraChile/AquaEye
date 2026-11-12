import test from "node:test";
import assert from "node:assert/strict";
import {importDecisionCSV,decisionTemplateCSV} from "../decision-desk/import-csv.js";
test("La plantilla contiene dos alternativas válidas, sin datos de empresa",()=>{
 const out=importDecisionCSV(decisionTemplateCSV());
 assert.equal(out.decisions.length,2);assert.equal(out.currency,"USD");
 assert.match(out.decisions[0].evidence,/FICTICIO/);
 assert.equal(out.decisions[0].net.base,9000);
});
test("Acepta comillas y delimitador punto y coma",()=>{
 const csv=decisionTemplateCSV().replace('Intervención A (EJEMPLO)','Intervención; "A"');
 const out=importDecisionCSV(csv);
 assert.equal(out.decisions[0].name,'Intervención; "A"');
});
test("Rechaza mezclas de moneda, horizonte, filas incompletas",()=>{
 const csv=decisionTemplateCSV();
 assert.throws(()=>importDecisionCSV(csv.replace('"USD";"12 meses";"2000"','"NOK";"12 meses";"2000"')),/monedas/);
 assert.throws(()=>importDecisionCSV(csv.replace('"USD";"12 meses";"2000"','"USD";"6 meses";"2000"')),/horizontes/);
 assert.throws(()=>importDecisionCSV(csv.replace('"FICTICIO sin fuente real"','""')),/fuente/);
});
test("Rechaza importes ambiguos 1.000,00 y fórmulas",()=>{
 const csv=decisionTemplateCSV();
 assert.throws(()=>importDecisionCSV(csv.replace('"10000"','"1.000,00"')),/número de columnas|número sin separador/);
 assert.throws(()=>importDecisionCSV(csv.replace('"10000"','"=10+20"')),/número sin separador/);
});
test("Rechaza CSV grande, duplicados y más de 10 alternativas",()=>{
 const csv=decisionTemplateCSV();
 assert.throws(()=>importDecisionCSV("x".repeat(100001)),/supera 100 KB/);
 const lines=csv.trim().split(/\r?\n/);
 assert.throws(()=>importDecisionCSV([lines[0],lines[1],lines[1]].join("\n")),/duplicados/);
 assert.throws(()=>importDecisionCSV([lines[0],...Array(11).fill(lines[1])].join("\n")),/entre 1 y 10/);
});
test("Rechaza CSV malformado sin alterar otras entradas",()=>{
 assert.throws(()=>importDecisionCSV('alternativa;moneda\n"intervención'),/comillas/);
});
