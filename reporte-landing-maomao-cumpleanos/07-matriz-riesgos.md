# Matriz de Riesgos

| Riesgo | Probabilidad | Impacto | Severidad | Estrategia de mitigación |
| :-- | :-- | :-- | :-- | :-- |
| **Cálculo incorrecto al cambiar de año** | Media | Alto | Alta | Normalizar a fecha del año actual o siguiente según si ya pasó. Probar con fechas cercanas al 31/12 y 01/01. |
| **Formato de fecha inconsistente en JSON** | Media | Alto | Alta | Definir schema estricto (`MM-DD` recomendado). Validar datos y mostrar fallback claro si falta campo. |
| **Diferencias horarias / actualización en tiempo real** | Media | Medio | Media | Usar `Date.now()`/`new Date()` local. Actualizar contadores con `setInterval` cada 1000ms. Documentar comportamiento basado en hora local. |