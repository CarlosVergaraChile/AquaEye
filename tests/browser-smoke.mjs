import { chromium } from "playwright";
import assert from "node:assert/strict";

const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({acceptDownloads:true});
 const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 const response=await page.goto("http://127.0.0.1:8128/decision-desk/index.html",{waitUntil:"networkidle"});
 assert.equal(response.status(),200);
 await page.getByRole("button",{name:"Comparar alternativas"}).click();
 await page.locator("#results .report").first().waitFor();
 assert.equal(await page.locator("#results .report").count(),2);
 assert.match(await page.locator("#memo").innerText(),/AQUAEYE/);
 // Header and two alternatives imported, then form automatically recalculates.
 const template=await page.evaluate(async()=>{const m=await import("./import-csv.js");return m.decisionTemplateCSV()});
 await page.locator("#csvfile").setInputFiles({name:"ejemplo.csv",mimeType:"text/csv",buffer:Buffer.from(template,"utf8")});
 await page.waitForTimeout(200);
 assert.equal(await page.locator("#error").textContent(),"");
 assert.equal(await page.locator("#results .report").count(),2);
 assert.equal(await page.locator(".case").first().locator(".bBase").inputValue(),"25000");
 // Imported observed outcomes can be supplied and displayed without causal claims.
 await page.locator(".case").first().locator(".actualBenefit").fill("20000");
 await page.locator(".case").first().locator(".actualCost").fill("15000");
 await page.locator(".case").first().locator(".actualSource").fill("FICTICIO prueba");
 await page.getByRole("button",{name:"Comparar alternativas"}).click();
 assert.match(await page.locator("#results").innerText(),/Neto observado/);
 const [download]=await Promise.all([page.waitForEvent("download"),page.getByRole("button",{name:"Exportar comparación CSV"}).click()]);
 assert.match(download.suggestedFilename(),/aquaeye_escenarios_DEMO\.csv/);
 assert.deepEqual(errors,[],"Browser runtime exceptions");
 console.log("AquaEye browser E2E: load, compare, CSV import, observed result, CSV export all passed");
}finally{await browser.close()}
