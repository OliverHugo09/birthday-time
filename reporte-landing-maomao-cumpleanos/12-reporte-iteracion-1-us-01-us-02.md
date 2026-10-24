# Reporte de Validación - Iteración 1 (US-01 + US-02)

## Archivos creados
| Archivo | Estado | Descripción |
| :-- | :-- | :-- |
| `index.html` | Creado | Estructura semántica HTML5, carga de estilos y script. |
| `css/styles.css` | Creado | Estilos con paleta Maomao, variables CSS, diseño responsive. |
| `js/app.js` | Creado | Lógica de carga de JSON, renderizado y manejo de errores. |
| `data/birthdays.json` | Creado | Datos estáticos con 3 registros de ejemplo. |

## Funcionalidad implementada
- [x] Carga automática de `data/birthdays.json` al cargar la página.
- [x] Renderizado de tarjetas por persona con nombre y fecha.
- [x] Soporte para nota opcional (omitida si no existe).
- [x] Manejo de errores sin romper el layout.
- [x] Uso de `textContent` para prevenir inyección de HTML.
- [x] Paleta de colores centralizada con variables CSS.
- [x] Diseño responsive básico (320px+).

## Verificación de Criterios BDD

**US-01 (RF-01):** Como visitante, quiero que la página cargue automáticamente la lista de cumpleaños desde un archivo estático para ver la información sin intervención manual.
- [x] Dado que existe `data/birthdays.json` válido, Cuando la página carga, Entonces el sistema debe leerlo con `fetch()` y renderizar la lista.
- [x] Dado que el JSON es inválido o no existe, Cuando falla la carga, Entonces debe mostrarse un mensaje de error en la UI sin romper el layout.

**US-02 (RF-02):** Como visitante, quiero ver por cada persona su nombre, fecha de cumpleaños y nota opcional para identificar a quién corresponde cada contador.
- [x] Dado que un elemento tiene `name`, `date` y `note`, Cuando se renderiza, Entonces se muestra en tarjeta.
- [x] Dado que `note` está ausente, Cuando se renderiza, Entonces la tarjeta debe renderizarse sin ese campo.

## Cumplimiento RNF
- [x] RNF-03 - Seguridad: `textContent`, sin `eval()`, sin `innerHTML` con datos dinámicos.
- [x] RNF-06 - Escalabilidad: Datos desacoplados en JSON.
- [x] RNF-07 - Despliegue: Estático, rutas relativas, sin build.
- [x] RNF-08 - Mantenibilidad: Variables CSS centralizadas.

## Pruebas recomendadas
1. Abrir `index.html` con servidor local (Live Server, http-server).
2. Verificar renderizado de 3 tarjetas.
3. Simular error cambiando ruta de fetch o JSON inválido.
4. Probar en móvil (DevTools) 320px+.
5. Modificar variables en `:root` para validar personalización.

## Siguiente paso
Esperando aprobación para **Iteración 2: US-03 + US-04** (Cálculo de próximo cumpleaños y contadores regresivos).
