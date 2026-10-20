# AquaEye

**AquaEye Executive Center** — cockpit modular de decisión operacional para la salmonicultura. Parte de la línea de productos **Cockpits de Decisión Ejecutiva** de GL Strategic.

## Qué hace

Convierte datos de cultivo, alimento, sanidad, planta y comercialización en escenarios, riesgos y recomendaciones ejecutivas priorizadas por impacto en EBITDA.

- **Motor causal:** 6 palancas operativas (FCR, mortalidad, caligus, yield, precio, tipo de cambio) conectadas a biomasa, volumen, costos e ingreso.
- **Módulos por eslabón:** Cultivo, Alimento, Sanitario, Planta y Comercial, cada uno con sus propias palancas.
- **Boardroom ejecutivo:** EBITDA base vs actual, tornado de sensibilidad, top 3 palancas, waterfall y Monte Carlo (P10/P50/P90, probabilidad de EBITDA negativo).
- **Plan de acción:** ranking de intervenciones por ROI (ΔEBITDA / costo de acción), con breakeven y lógica causal. Exportable a CSV.
- **Calibración con datos reales:** carga de CSV de empresa con validación, detección de outliers y calibración automática de inputs.
- **Reporte ejecutivo:** narrativa automática descargable para presentaciones.
- **Trazabilidad:** todos los supuestos y fórmulas son visibles y auditables (sin cajas negras).

## Estructura

- `ui/` — Interfaz principal (index.html + styles.css)
- `engine/` — Motor de simulación, KPIs, grafo causal y plan de acción
- `model/` — Grafo causal, elasticidades, variables y subgrafos recursivos
- `modules/` — Configuración de los 5 eslabones de la cadena de valor
- `data/` — Datos demo de la industria y registro de evidencia
- `calibration/` — Protocolo de calibración, diccionario de datos y plantilla CSV
- `manual/` — Manual de uso interactivo
- `docs/` — Documentación

## Uso

Abrir `ui/index.html` en el navegador (se recomienda servir por HTTP para que carguen los módulos JS, ej. `python -m http.server`). Sin backend, sin instalación.

## Versión en producción

La versión desplegada vive en el respaldo de Hostinger: [respaldo-webs-hostinger](https://github.com/CarlosVergaraChile/respaldo-webs-hostinger) → `ingenieriadegestion.cl/salmon/`

## Línea de productos relacionada

| Vertical | Repo |
|---|---|
| Laboratorio / ensayos | [idiem-decision-intelligence](https://github.com/CarlosVergaraChile/idiem-decision-intelligence) |
| Gestión municipal | `ilumina-arica` (privado) |
| Plantilla base | `project-cockpit-template` (privado) |
| Salmonicultura | **este repo** |

## Estado

- [x] Demo funcional con datos de industria
- [x] Carga y calibración con CSV de empresa
- [ ] Piloto con empresa salmonera
- [ ] Propuesta comercial
