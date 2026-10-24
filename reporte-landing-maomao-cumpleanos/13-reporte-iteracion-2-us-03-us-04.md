# Reporte de Validación - Iteración 2 (US-03 + US-04)

## Archivos creados/modificados
| Archivo | Estado | Descripción |
| :-- | :-- | :-- |
| `js/countdown.js` | Creado | Lógica de cálculo de próximo cumpleaños, diferencia de tiempo y formateo. |
| `js/app.js` | Modificado | Integración con countdown.js, renderizado de contadores, actualización con setInterval. |
| `css/styles.css` | Modificado | Estilos para `.birthday-card__countdown`. |
| `index.html` | Sin cambios | Ya cargaba app.js como módulo. |

## Funcionalidad implementada
- [x] Cálculo correcto de próximo cumpleaños (año actual si futuro/hoy, año siguiente si ya pasó).
- [x] Cálculo de diferencia en días, horas, minutos, segundos.
- [x] Formateo: `DD días HH horas MM minutos SS segundos`.
- [x] Actualización automática cada 1000ms con `setInterval`.
- [x] Manejo de cumpleaños hoy: muestra mensaje "¡Hoy es su cumpleaños!" o valores en 0.
- [x] Validación de formato MM-DD y fechas inválidas.
- [x] Uso de módulos ES6 (`import/export`).

## Verificación de Criterios BDD

**US-03 (RF-03):** Como visitante, quiero que el sistema determine el próximo cumpleaños correctamente aunque ya haya pasado este año para siempre ver el tiempo restante correcto.
- [x] Dado que la fecha `MM-DD` es futura en el año actual, Cuando se calcula, Entonces usar año actual. (`getNextBirthdayDate()` - si fecha >= hoy usa año actual)
- [x] Dado que la fecha `MM-DD` ya pasó en el año actual, Cuando se calcula, Entonces usar año siguiente. (Compara con fecha inicio del día actual)
- [x] Dado que la fecha es válida, Cuando se calcula con `new Date(año, mes-1, día)`, Entonces obtener fecha objetivo correcta. (Usado correctamente, con validación de fecha válida)

**US-04 (RF-04):** Como visitante, quiero ver el tiempo restante en días, horas, minutos y segundos actualizado cada segundo para saber con precisión cuánto falta.
- [x] Dado que hay un cumpleaños futuro, Cuando transcurre 1 segundo, Entonces los valores se actualizan. (`setInterval` a 1000ms actualiza todos los contadores)
- [x] Dado que es el día del cumpleaños, Cuando se calcula, Entonces mostrar `0 días 00 horas 00 minutos 00 segundos` o indicador "Hoy". (`getCountdownText()` detecta y muestra mensaje)
- [x] Dado que se inicializa, Entonces ejecutar actualización con `setInterval(updateAll, 1000)`. (Implementado en `renderBirthdays()`)

## Cumplimiento RNF
- [x] RNF-02 - Rendimiento: `setInterval` 1000ms, sin operaciones síncronas pesadas, actualizaciones dirigidas por elemento.
- [x] RNF-03 - Seguridad: Uso de `textContent` únicamente.
- [x] RN-01 - Regla de negocio: Lógica año actual/siguiente implementada correctamente.

## Pruebas recomendadas
1. Abrir con servidor local (Live Server) - Los contadores deben actualizar cada segundo.
2. Probar con fecha futura, fecha pasada (año actual) y fecha hoy.
3. Verificar formato con ceros (`00 horas 00 minutos 00 segundos`).
4. Comprobar que no hay errores en consola.
5. Validar cálculo con fecha inválida (ej. `02-30`) muestra "Fecha inválida".

## Siguiente paso
Esperando aprobación para **Iteración 3: US-05 + US-06** (Tema Maomao completo con variables CSS y verificación de personalización).
