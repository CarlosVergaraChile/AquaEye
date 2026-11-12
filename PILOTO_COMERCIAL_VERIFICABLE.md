# AquaEye — piloto acotado de valor comercial

## Mercado
Salmoneras chilenas y eventualmente proveedores de servicios con datos suficientes. No competir con AKVA Fishtalk/ScaleAQ (gestión acuícola integral), Aquabyte (visión y biomasa) ni plataformas de monitoreo en tiempo real. Ser **una capa de evaluación económica de decisiones**.

## Hipótesis a validar
Con seis variables iniciales (FCR, mortalidad, caligus, rendimiento de planta, precio de venta, FX) y costos disponibles, un gerente de producción/finanzas puede comparar y cuestionar tres decisiones:
- Variación en alimentación y conversión: ¿se justifica intervenir cuando cambia el precio del alimento o el FCR?
- Control sanitario: ¿cómo cambian el costo y riesgo bajo hipótesis de intervención verificables?
- Rendimiento de planta: ¿cómo afecta un cambio de yield al resultado económico?

No asumir que los efectos son causales ni directamente intervenibles. Una sensibilidad es un escenario hipotético, no una recomendación operativa ni un ROI medido.

## Fuentes existentes
- \`AquaEye\` público con README de FCR, caligus, yield, costos, módulos, CSV y Monte Carlo; piloto con empresa pendiente.
- \`salmon\` privado histórico con documentación v17 y supuestos \`base.yaml\`; comparar fórmulas antes de reutilizar.
- AKVA fishtalk https://www.akvagroup.com/fishtalk/
- ScaleAQ Mercatus Farmer https://scaleaq.cl/producto/farmer/
- Aquabyte https://www.aquabyte.cl/

## QA imprescindible antes de demo comercial
1. Elegir **un solo motor oficial**. Contrastar la consistencia de dos repos \`AquaEye\` y \`salmon\`.
2. Verificar unidades: CLP vs USD, kg vs toneladas, biomasa inicial vs vendible, FCR, precio, feed costs, tratamiento sanitario, FX.
3. Calcular tres casos manuales en Excel/Node y comparar con el motor. Cada cambio debe poder explicarse por una fórmula auditable.
4. No dar cifras como US$ 1,5M por 0,1 FCR sin supuestos y cálculo reproducible; el marketing del landing anterior fue ajustado en esta rama para eliminar cifras puntuales no sustentadas.
5. Probar CSV real solo si es agregado/autorizado y no incluye información confidencial.
6. Seleccionar una persona de producción/finanzas que acepte revisar el resultado, aportar base de comparación y decidir continuidad.

## Modelo comercial candidato
Piloto acotado con validación de modelo y un problema cuantificable; si aporta valor, considerar licencia mensual/anual o contrato de instalación y soporte. No fijar precio sin costos de operación, prueba de disposición a pagar y propiedad/licencias claras.

## Go/no-go
**Seguir** si se demuestra que usuario con datos propios obtiene un análisis correcto, comprensible y útil que no recibe directamente de sus sistemas actuales. **Pausar** si solo es un simulador vistoso, si no disponemos de fuente o si los sistemas incumbentes ya resuelven el problema sin fricción.
