# AquaEye / Benchmark Chile–Noruega y decisión de producto (12 noviembre 2026)

## Conclusión
**No crear otro software de producción, control alimentario, biomasa, bienestar, benchmarking industrial, presupuestos, pronóstico biológico ni un simulador económico genérico.** Ya existen ofertas muy desarrolladas. El diferencial comercial candidato, a validar, es **AquaEye Decision Desk**: ficha independiente y auditable para una decisión de inversión/intervención; su costo y beneficio estimado, evidencia, alternativas, umbrales, restricciones y resultado observado posterior. No afirmar que es único: Manolin y otros ya ofrecen análisis de productos e intervenciones. Es una hipótesis de nicho, no una brecha validada.

## Chile / Noruega: productos y segmentación

| Proveedor/producto | País/mercado | Qué resuelve realmente | Qué NO replicar | Posible complemento |
|---|---|---|---|---|
| AKVA **fishtalk 5** | Noruega, internacional | gestión biológica, económica, producción y trazabilidad, cloud/API | ERP productivo y control de operaciones | importar exportaciones resumidas para comité financiero |
| ScaleAQ **Mercatus Farmer / Future / Finance** | Noruega y Chile | biología, crecimiento, alimentación, sensores, proyecciones, costo/KPIs | gestión biomasa, forecast y modelo de costos integral | evaluar caso económico específico con fuente y decisión registrada |
| Aquabyte **Strategic Advisor** | Noruega y Chile | biomasa, caligus, bienestar, hipótesis de cosecha/sanitización a 14 días, escenarios | modelos de visión, pesaje, caligus o cosecha | dossier inter-áreas de decisión, compras/proveedores y evidencia ex post |
| Horizon Software | Noruega | planeación multianual, producción, simulación biología/economía, presupuesto, análisis | calculador costo/kg o escenario genérico | comparación de inversiones y seguimiento de resultados reales |
| Aquabench **SalmoBench Digital** | Chile | benchmarking productivo/sanitario sectorial, datos de industria, filtros y descargas | base sectorial o benchmark propio sin datos | contextos y comparaciones autorizadas como fuente de dossier |
| Aquabyte (sensor) / ITG SCAPP | Chile, internacional | monitorización de alimentación, apetito, FCR, bienestar, visión | control alimentación, hardware o IA de visión | consumir datos agregados de rendimiento si se autoriza |
| Manolin | Internacional | analítica conectada entre productores, productos, sanidad, evidencia de terreno | inteligencia biológica multipoblación y análisis de productos | no asumir diferenciación en "evidencia de intervenciones"; revisar con compradores |
| Sernapesca | Chile (regulador) | datos sanitarios públicos, mortalidad, antimicrobianos, antiparasitarios, informes agregados | no simular que existe API en vivo por centro | contexto público regulatorio, nunca imputar datos privados a una empresa |

### Fuentes primarias / enlaces comprobados
- https://www.akvagroup.com/fishtalk/
- https://scaleaq.cl/categoria-de-producto/software-es-cl/biologia/
- https://scaleaq.cl/producto/farmer/
- https://www.aquabyte.cl/products/soporte-para-la-toma-de-decisiones
- https://horizonsoftware.no/
- https://www.salmobench.com/
- https://aquabench.com/la-industria-del-salmon/
- https://manolinaqua.com/
- https://itgchile.com/en/index.php/precision-feeding/
- https://www.sernapesca.cl/noticias/sernapesca-publica-informes-sanitarios-y-de-uso-de-antimicrobianos-y-antiparasitarios-en-la-salmonicultura/
- https://www.sernapesca.cl/informes-y-datos/resultados-de-gestion/
- https://www.consejodelsalmon.cl/principales-datos-de-la-industria/

### Mercado y por qué Chile/Noruega
- Consejo del Salmón reporta 1.151.997 t cosechadas de salmónidos en Chile durante 2025. Las cifras incluyen Atlántico, coho y trucha; no intercambiar con volumen mundial de una sola especie.
- Se reporta que Chile/Noruega concentran buena parte de la producción mundial de salmón Atlántico. Esto implica potencial de estandarizar un dossier, pero **NO ventas aseguradas ni ausencia de competidores**.
- Sernapesca confirma relevancia de mortalidad e incidentes sanitarios. Los datos públicos son contexto sectorial, **no inputs calibrados de una compañía**.
- La investigación internacional sobre adopción de IA acuícola encuentra que demostrar ROI es barrera importante; no interpretar esto como evidencia directa de demanda por nuestra app: https://rethinkpriorities.org/research-area/how-ai-is-affecting-farmed-aquatic-animals-2/

## Primer incremento desarrollado
Rama \`aquaeye-decision-desk-v03\`:
- \`decision-desk/model.js\` función pura, rangos **beneficio/costo** de inversión, clasificación según evidencia, límites consistentes en moneda y horizonte, resultado observado separado del esperado, exportación CSV.
- \`decision-desk/index.html\` demo con **dos alternativas** a comparar, escenarios conservador/base/optimista, fuentes/hipótesis explícitas, ficha TXT y CSV; funciona en navegador, sin backend.
- \`tests/decision-desk.test.mjs\` pruebas de cálculo, validación, fuentes, moneda, horizontes, CSV y diferencias ex post.
- GitHub Actions \`.github/workflows/aquaeye-decision-desk.yml\` valida el cálculo y la sintaxis.

**Precauciones económicas:** se ingresan por separado beneficios y costos incrementales; rango conservador = beneficio mínimo – costo máximo, base = beneficio base – costo base, optimista = beneficio máximo – costo mínimo. Esto es una **envolvente aritmética**, no P10/P50/P90, no distribución de probabilidades y no estimación causal. Para comparar, se exige igual moneda/horizonte. Tampoco incorpora riesgo sanitario, bienestar animal o límites regulatorios; su evaluación va fuera del cálculo antes de decidir. Ningún monto del demo es real ni inferido de la industria.

## Casos concretos a validar (no programar más sin evidencia)
1. **Evaluar intervención alimentaria o servicio externo**: costos propuestos, cambios esperados, línea base y evidencia disponible.
2. **Revisar inversión en mitigación sanitaria**: solo evaluación económico-administrativa después de validación veterinaria, sin recomendar tratamientos.
3. **Comparar tecnología operativa o contrato proveedor** con costos de implantación y resultados de piloto.

Usuario: gerente de producción + finanzas + control de gestión; comprador potencial gerente de operaciones/finanzas, o proveedor que necesita acreditar a un cliente que su tecnología generó valor. Restricción: sensibilidad comercial; requiere NDA, acceso individual y hosting seguro si se usan datos reales.

## Hipótesis comercial contra productos existentes
**Candidato**: ficha y ciclo de decisión independientes de sistemas de monitoreo; anota hipótesis, supuestos y fuentes, compara ofertas/acciones y revisa después su cumplimiento. Este servicio es **neutral respecto al proveedor**, y evita reemplazar sistemas empresariales. No está probado que las plataformas existentes carezcan de esta funcionalidad o que se pueda vender de forma aislada.

## Próximos pasos de negocio, orden de prioridad
1. Entrevistar 3 responsables producción/finanzas y 2 proveedores de tecnología acuícola, preguntando qué sistema usan y cómo justifican una intervención o proyecto.
2. Mostrar una ficha de dos decisiones ficticias y pedirles que la llenen con **campos faltantes, no con datos confidenciales**.
3. Comparar contra reporte que hoy producen (Excel, Fishtalk, Mercatus, ERP, otras). Medir **minutos de elaboración** y trazabilidad de cifras.
4. Solo si hay interés, solicitar dataset agregado autorizado y un caso de decisión real para calibrar fórmulas/unidades/flujo.
5. Definir mecanismo comercial: módulo liviano por proyecto, licencia SaaS o servicio de evaluación con software; evitar prometer disponibilidad de APIs de terceros.
6. Pasar algoritmos y fuentes comerciales de clientes a backend privado antes de dar acceso externo.
7. Internacionalización: NOK y USD, idioma inglés/noruego posteriormente; no duplicar flujos sin usuarios en Noruega.

## GitHub-first / propiedad intelectual
- Antes de copiar, evaluar licencias y actividad del repositorio; las soluciones líderes son comerciales y su tecnología no se puede copiar.
- El ejemplo público contiene solo cálculos aritméticos estándar. No incluye fórmulas propietarias, bases de datos ni credenciales.
- El repo AquaEye **es público**, incluso las ramas de desarrollo: NO cargar modelos calibrados, recetas comerciales ni datos de salmoneras aquí.
- No desplegar esta prueba para clientes con información real sin autenticación, segregación, auditabilidad y revisión de seguridad.
- No confundir FAO **AquaCrop** (simulador de *cultivos agrícolas*) con acuicultura: no es una plataforma aplicable a salmoneras.
