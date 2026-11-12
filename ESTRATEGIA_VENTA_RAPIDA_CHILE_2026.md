# AquaEye — Hipótesis de venta rápida Chile, 12 noviembre 2026

## Decisión de negocio
**Priorizar proveedores tecnológicos y de servicios de salmonicultura**, antes que vender otra plataforma integral a grandes productoras. El producto inicial es una **ficha económico-técnica de evaluación de intervenciones** que el proveedor y su cliente pueden usar para justificar un piloto, comparar alternativas y registrar los resultados observados.

Esta es una **hipótesis comercial**, no evidencia de ventas. La alternativa secundaria es un gerente de finanzas/operaciones en una salmonera mediana que necesite consolidar reportes entre producción y áreas corporativas.

### Por qué este orden
- EY + Consejo del Salmón (19/10/2026): 43% de empresas encuestadas priorizan mejoras operacionales, productividad y costos; analítica/Big Data 83% de menciones como tecnología proyectada; IA avanzada 80%; 26% pilotos, 26% aplicaciones implementadas. Fuente https://www.ey.com/es_cl/newsroom/2026/10/desafios-y-tendencias-salmonicultura-latam-2026 . **No equivale a intención de comprar AquaEye**.
- CORFO Los Lagos (19/08/2026) creó plataforma para visibilizar proveedores y vincularlos con la industria salmonera: https://www.corfo.gob.cl/sites/cpp/regional/corfo-los-lagos-lanza-plataforma-digital-para-conectar-a-proveedores-con-la-industria-del-salmon/ . **Canal potencial de prospectos y validación**, no una alianza confirmada.
- Competidores AKVA fishtalk, ScaleAQ Mercatus, Aquabyte, Manolin y Horizon ofrecen producción, decisiones y analítica; competir en plataforma total o forecasting biológico aumenta barreras. AquaEye debe consumir salidas disponibles, no reemplazarlas.

## Qué vendemos primero
**Piloto de evaluación de una decisión** con un conjunto mínimo de datos agregados autorizados:
1. Identificar decisión económica real (ej. contratar servicio de monitoreo, comprar tecnología de alimentación, mejorar rendimiento de planta).
2. Comparar **dos alternativas más no intervenir**, con horizonte y moneda única, costos de adquisición, operación y supuestos incrementales documentados.
3. Preparar ficha apta para comité comprador: rango conservador/base/optimista **aritmético**; riesgos fuera del cálculo; beneficios reclamados con procedencia explícita; umbral de recuperación.
4. Tras piloto, registrar resultados observados, fuente, variación respecto al estimado y factores explicativos.
5. Entregar comparación CSV / ficha, sin reclamar atribución causal que no esté probada.

Lo que NO ofrecemos al principio:
- ERP acuícola, integración API con proveedores sin autorización, monitoreo en tiempo real, IA predictiva ni simulación veterinaria.
- Datos propios de Sernapesca a nivel empresa/centro, benchmarking no licenciado o estimaciones de ahorros sin medición.
- Garantía de ROI, recomendaciones sanitarias automáticas ni tiempos de implementación fijos.

## Producto demostrable — estado
Rama `aquaeye-piloto-comercial-chile-v04` agrega a `decision-desk/index.html`:
- corrección de selectores de UI; hallazgo que la prueba de sintaxis no detectó;
- plantilla CSV descargable, importación de **dos** alternativas verificadas antes de tocar formulario;
- rechazo de montos ambiguos, monedas/horizontes diferentes, valores negativos, fuentes vacías y archivos grandes;
- comparación y dossier CSV/TXT, resultados ex post, con datos ficticios y sin backend.

**Limitación intencional:** no importa exports arbitrarios de AKVA/ScaleAQ/Aquabyte; se utiliza **mapeo manual a plantilla** para evitar depender de formatos comerciales sin contrato.

## Tracción: 3 conversaciones antes de invertir más
**Segmento A (primer intento):** 2 proveedores de tecnologías o servicios para alimentación, sanidad no terapéutica, sensores o planta que venden por diferenciación económica.
**Segmento B:** 1 gerencia de operación/finanzas de salmonera con un caso real de inversión.

Preguntas breves:
1. Cuando proponen una intervención, ¿cómo estiman su costo/beneficio y quién aprueba?
2. ¿Qué Excel, ERP o reporte alimenta la decisión hoy? ¿Cuánto demora prepararlo?
3. ¿Cómo verifica el comprador, 30–90 días después, que el supuesto se cumplió?
4. ¿Qué información faltaría para aceptar una ficha neutral de dos opciones?
5. ¿Pagarían por un análisis de piloto acotado, por suscripción o no necesitarían producto adicional?

**Criterio go:** al menos un interesado acuerda una demostración de su caso con datos autorizados y valida formato/uso; se registra reducción de tiempo o una decisión documentada.
**Criterio pausa:** los sistemas internos ya resuelven el problema con poco esfuerzo o no existe responsable que quiera usarlo.
**No confundir interés verbal con intención de compra.**

## Oferta comercial candidata — sin precios inventados
- **Diagnóstico demostrativo:** un caso con datos ficticios; 20–30 minutos de reunión.
- **Piloto acotado:** ficha de decisión validada con equipo cliente, un conjunto de supuestos, seguimiento ex post y acta de evaluación.
- **Producto posterior:** aplicación autenticada con historial de decisiones, integraciones y licencias por empresa, si hay compradores reales.

## Riesgos y protección
- El repositorio AquaEye actualmente es **público**; no subir datos de salmonera, costos sensibles, contratos, API keys ni modelos calibrados.
- En demo pública solo usar datos sintéticos. El archivo CSV se procesa en navegador, no se envía a servidores de esta app, pero el usuario debe evitar importar datos confidenciales en un demo no auditado.
- Antes de producción: hosting privado/identidad, validación de seguridad y licencias, aprobación de cliente, calidad de datos, derechos de uso.
- Una fórmula aritmética no es inteligencia artificial. El valor está en el proceso y la evidencia, no en agregar una etiqueta AI.
