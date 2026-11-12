/**
 * Strict CSV bridge for the standalone AquaEye commercial DEMO.
 * Schema is explicit. Money in ONE currency per file, decimal separator DOT.
 * No Excel auto-detection, currency conversion, or use of proprietary exports.
 */
import {compareDecisions} from "./model.js";
const HEADERS=["alternativa","moneda","horizonte","beneficio_min","beneficio_base","beneficio_max","costo_min","costo_base","costo_max","fuente","supuestos"];
const MAX_BYTES=100000;
function parseDelimited(raw,delimiter){
 const rows=[],row=[];let cell="",quoted=false,afterQuote=false;
 const add=()=>{row.push(cell);cell="";afterQuote=false};
 for(let i=0;i<raw.length;i++){
  const c=raw[i];
  if(quoted){
   if(c==='"'&&raw[i+1]==='"'){cell+='"';i++}
   else if(c==='"'){quoted=false;afterQuote=true}
   else cell+=c;
  }else if(afterQuote){
   if(c===delimiter)add();
   else if(c==="\n"||c==="\r"){add();rows.push(row.splice(0));if(c==="\r"&&raw[i+1]==="\n")i++}
   else if(c!==" "&&c!=="\t")throw Error("Texto inesperado tras comillas CSV");
  }else if(c==='"'&&!cell){quoted=true}
  else if(c===delimiter)add();
  else if(c==="\n"||c==="\r"){add();rows.push(row.splice(0));if(c==="\r"&&raw[i+1]==="\n")i++}
  else if(c==='"')throw Error("Comillas CSV mal ubicadas");
  else cell+=c;
 }
 if(quoted)throw Error("CSV tiene comillas sin cierre");
 if(cell||row.length||afterQuote){add();rows.push(row)}
 return rows.filter(x=>x.some(c=>c.trim()));
}
const numeric=(value,name)=>{
 if(typeof value!=="string"||! /^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(value.trim()))
  throw Error(name+": use número sin separador de miles y punto decimal (ej. 12500.50)");
 const n=Number(value);if(!Number.isFinite(n))throw Error(name+": número inválido");return n;
};
export function importDecisionCSV(text){
 if(typeof text!=="string"||new TextEncoder().encode(text).length>MAX_BYTES)throw Error("El CSV supera 100 KB o no es texto");
 const clean=text.replace(/^\uFEFF/,"");
 const headerLine=clean.split(/\r?\n/,1)[0];
 const delimiter=headerLine.includes(";")?";":",";
 const rows=parseDelimited(clean,delimiter);
 if(rows.length<2||rows.length>11)throw Error("Se requiere cabecera y entre 1 y 10 alternativas");
 if(rows[0].length!==HEADERS.length||rows[0].some((h,i)=>h.trim().toLowerCase()!==HEADERS[i]))
  throw Error("Cabeceras no corresponden a la plantilla AquaEye");
 const inputs=rows.slice(1).map((cells,i)=>{
  if(cells.length!==HEADERS.length)throw Error("Fila "+(i+2)+": número de columnas incorrecto");
  const [name,currency,horizon,bl,bb,bh,cl,cb,ch,evidence,assumptions]=cells.map(x=>x.trim());
  if(!evidence)throw Error("Fila "+(i+2)+": fuente/evidencia obligatoria para importación");
  return {name,currency,horizon,benefits:{
   low:numeric(bl,"beneficio_min fila "+(i+2)),base:numeric(bb,"beneficio_base fila "+(i+2)),high:numeric(bh,"beneficio_max fila "+(i+2))
  },costs:{
   low:numeric(cl,"costo_min fila "+(i+2)),base:numeric(cb,"costo_base fila "+(i+2)),high:numeric(ch,"costo_max fila "+(i+2))
  },evidence,assumptions};
 });
 return compareDecisions(inputs);
}
function csvSafe(value){
 const s=String(value??"");
 // Spreadsheet formula injection: prefix any formula-like cell with a literal apostrophe
 const safe=/^[\s]*[=+\-@\t\r]/.test(s)?"'"+s:s;
 return '"'+safe.replaceAll('"','""')+'"';
}
export function decisionTemplateCSV(){
 return "\uFEFF"+[HEADERS.join(";"),
  ["Intervención A (EJEMPLO)","USD","12 meses","10000","25000","50000","9000","16000","30000","FICTICIO sin fuente real","Montos inventados para DEMO"],
  ["Intervención B (EJEMPLO)","USD","12 meses","2000","28000","65000","11000","23000","38000","FICTICIO sin fuente real","Montos inventados para DEMO"]
 ].map(r=>r.map(csvSafe).join(";")).join("\r\n");
}
export const decisionCsvColumns=Object.freeze([...HEADERS]);
