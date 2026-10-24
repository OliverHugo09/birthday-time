# Product Backlog - Landing Maomao Birthday Time

## Épica 1: Configuración y Datos
**Objetivo:** Desacoplar datos del código para facilitar mantenimiento sin modificar lógica/estilos.

**RF relacionados:** RF-01, RF-02  
**RNF relacionados:** RNF-06, RNF-07

| ID | Historia de Usuario | Ref | Prioridad | Criterios de Aceptación (BDD) |
| :-- | :-- | :-- | :-- | :-- |
| US-01 | Como visitante, quiero que la página cargue automáticamente la lista de cumpleaños desde un archivo estático para ver la información sin intervención manual. | RF-01 | Must have | **Dado que** existe `data/birthdays.json` válido, **Cuando** la página carga, **Entonces** el sistema debe leerlo con `fetch()` y renderizar la lista. **Dado que** el JSON es inválido o no existe, **Cuando** falla la carga, **Entonces** debe mostrarse un mensaje de error en la UI sin romper el layout. |
| US-02 | Como visitante, quiero ver por cada persona su nombre, fecha de cumpleaños y nota opcional para identificar a quién corresponde cada contador. | RF-02 | Must have | **Dado que** un elemento tiene `name`, `date` y `note`, **Cuando** se renderiza, **Entonces** se muestra en tarjeta. **Dado que** `note` está ausente, **Cuando** se renderiza, **Entonces** la tarjeta debe renderizarse sin ese campo. | 

## Épica 2: Contadores Regresivos
**Objetivo:** Calcular y mostrar tiempo restante hasta el próximo cumpleaños.

**RF relacionados:** RF-03, RF-04  
**RNF relacionados:** RNF-02

| ID | Historia de Usuario | Ref | Prioridad | Criterios de Aceptación (BDD) |
| :-- | :-- | :-- | :-- | :-- |
| US-03 | Como visitante, quiero que el sistema determine el próximo cumpleaños correctamente aunque ya haya pasado este año para siempre ver el tiempo restante correcto. | RF-03 | Must have | **Dado que** la fecha `MM-DD` es futura en el año actual, **Cuando** se calcula, **Entonces** usar año actual. **Dado que** la fecha `MM-DD` ya pasó en el año actual, **Cuando** se calcula, **Entonces** usar año siguiente. **Dado que** la fecha es válida, **Cuando** se calcula con `new Date(año, mes-1, día)`, **Entonces** obtener fecha objetivo correcta. |
| US-04 | Como visitante, quiero ver el tiempo restante en días, horas, minutos y segundos actualizado cada segundo para saber con precisión cuánto falta. | RF-04 | Must have | **Dado que** hay un cumpleaños futuro, **Cuando** transcurre 1 segundo, **Entonces** los valores se actualizan. **Dado que** es el día del cumpleaños, **Cuando** se calcula, **Entonces** mostrar `0 días 00 horas 00 minutos 00 segundos`. **Dado que** se inicializa, **Entonces** ejecutar actualización con `setInterval(updateAll, 1000)`. | 

## Épica 3: Tema Maomao y Personalización
**Objetivo:** Aplicar identidad visual Maomao con colores centralizados y fáciles de modificar.

**RF relacionados:** RF-05, RF-06  
**RNF relacionados:** RNF-04, RNF-08  
**Reglas:** RN-04, RN-05

| ID | Historia de Usuario | Ref | Prioridad | Criterios de Aceptación (BDD) |
| :-- | :-- | :-- | :-- | :-- |
| US-05 | Como visitante, quiero ver la landing con temática inspirada en Maomao para tener una experiencia acorde al proyecto. | RF-05 | Must have | **Dado que** se cargan estilos, **Cuando** se aplica tema, **Entonces** usar paleta terrosa/hierbática definida. **Dado que** hay texto sobre fondo/superficie, **Entonces** cumplir contraste mínimo WCAG AA. |
| US-06 | Como mantenedor, quiero poder cambiar los colores modificando únicamente variables CSS para ajustar el tema sin tocar lógica JavaScript. | RF-06 | Must have | **Dado que** todas las paletas están en `:root`, **Cuando** se modifica un valor `--color-*`, **Entonces** el cambio se refleja en toda la UI. **Dado que** los componentes usan variables, **Entonces** no hay colores hardcodeados fuera de `:root`. |

## Épica 4: Responsive y Despliegue Estático
**Objetivo:** Garantizar usabilidad móvil y compatibilidad con Cloudflare Pages.

**RF relacionados:** RF-07, RF-08  
**RNF relacionados:** RNF-01, RNF-05, RNF-07

| ID | Historia de Usuario | Ref | Prioridad | Criterios de Aceptación (BDD) |
| :-- | :-- | :-- | :-- | :-- |
| US-07 | Como visitante en móvil, quiero ver las tarjetas correctamente distribuidas para leer la información sin scroll horizontal. | RF-07 | Must have | **Dado que** viewport ancho <= 320px, **Cuando** se renderiza, **Entonces** sin scroll horizontal. **Dado que** viewport entre 320px y 768px, **Entonces** layout adaptable con media queries. |
| US-08 | Como mantenedor, quiero desplegar la app en Cloudflare Pages sin build step para publicar rápidamente. | RF-08 | Must have | **Dado que** solo hay archivos estáticos, **Cuando** se sube a Cloudflare Pages, **Entonces** se sirve correctamente. **Dado que** se usan rutas relativas (`./css/...`, `./js/...`), **Entonces** funciona sin configuración compleja. **Dado que** no hay runtime server-side, **Entonces** compatible con static hosting. |

## Épica 5: Calidad y Seguridad (Integración RNF)
**Objetivo:** Cumplir con seguridad, rendimiento y mantenibilidad.

**RNF relacionados:** RNF-01, RNF-02, RNF-03

| ID | Historia de Usuario | Ref | Prioridad | Criterios de Aceptación (BDD) |
| :-- | :-- | :-- | :-- | :-- |
| US-09 | Como visitante, quiero una página liviana sin dependencias externas para cargar rápidamente. | RNF-01 | Should have | **Dado que** assets son locales, **Cuando** se mide, **Entonces** tamaño total < 150 KB (sin imágenes pesadas). **Dado que** sin CDN externos, **Entonces** sin requests a dominios terceros. |
| US-10 | Como visitante, quiero que la página no ejecute código inseguro para garantizar una experiencia segura. | RNF-03 | Must have | **Dado que** se renderizan datos, **Cuando** se inserta contenido, **Entonces** usar `textContent` o construcción controlada. **Dado que** hay strings, **Entonces** sin `eval()`. **Dado que** hay HTML, **Entonces** evitar `innerHTML` con datos no sanitizados. |

## Priorización MoSCoW (Resumen)
| Categoría | Historias | Notas |
| :-- | :-- | :-- |
| **Must have** | US-01, US-02, US-03, US-04, US-05, US-06, US-07, US-08, US-10 | Críticos para MVP |
| **Should have** | US-09 | Importante pero no bloqueante para funcionalidad core |
| **Could have** | - | Sin elementos asignados en MVP |
| **Won't have** | - | Fuera de fase actual según alcance |

## Definition of Done (General)
- Código funciona sin errores de consola
- Datos cargados desde `data/birthdays.json`
- Contadores actualizados cada segundo
- Colores definidos únicamente con variables CSS
- Responsive en 320px+
- Compatible con Cloudflare Pages (archivos estáticos)
- Sin `eval()`, sin uso inseguro de `innerHTML` con datos dinámicos
- Contraste WCAG AA verificado para texto principal/secundario
- Rutas relativas utilizadas