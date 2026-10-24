# Requerimientos Funcionales y No Funcionales - Landing Maomao Birthday Time

## 1. Requerimientos Funcionales (RF)

| ID | Módulo | Requerimiento | Flujo principal | Excepciones/Dependencias |
| :-- | :-- | :-- | :-- | :-- |
| RF-01 | Carga de datos | El sistema debe cargar los datos de cumpleaños desde `data/birthdays.json` mediante `fetch()` o import estático. | Al cargar la página, leer JSON y renderizar lista. | Si el archivo no existe o es JSON inválido, mostrar mensaje de error en UI. Depende de que exista `data/birthdays.json`. |
| RF-02 | Visualización | El sistema debe mostrar una tarjeta por persona con: nombre, fecha de cumpleaños, nota opcional. | Renderizar lista ordenada (opcional por fecha o por proximidad). | Si `note` está ausente, omitir el campo sin romper layout. |
| RF-03 | Cálculo de próximo cumpleaños | El sistema debe calcular la fecha del próximo cumpleaños tomando como referencia `MM-DD`. Si la fecha ya pasó este año, debe usar el año siguiente. | Para cada elemento, obtener fecha objetivo = próximo cumpleaños y calcular diferencia con `Date.now()`. | Considerar fechas válidas. Si fecha es inválida, omitir contador o mostrar indicador de error para ese elemento. |
| RF-04 | Contadores regresivos | El sistema debe mostrar contadores en tiempo restante con unidades: días, horas, minutos y segundos (`DD días HH horas MM minutos SS segundos`). | Actualizar cada 1000ms con `setInterval`. | Si el cumpleaños es hoy, mostrar `0 días 00 horas 00 minutos 00 segundos` o indicador "Hoy". |
| RF-05 | Tema Maomao | El sistema debe aplicar la paleta de colores inspirada en Maomao mediante variables CSS. | Cargar estilos con `:root` y aplicar clases. | Debe mantener legibilidad con contraste verificable. |
| RF-06 | Personalización de colores | El sistema debe permitir modificar los colores de la web mediante variables CSS (`--color-*`) sin modificar lógica JS. | Definir todas las paletas en `:root` y componentes usar solo variables. | Debe existir al menos un conjunto de variables documentado para reemplazo directo. |
| RF-07 | Responsive básico | El sistema debe adaptarse a anchos de viewport móvil y escritorio. | Aplicar media queries para layout de tarjetas. | Mantener legibilidad en anchos mínimos de 320px. |
| RF-08 | Despliegue estático | El sistema debe ser completamente estático (sin backend, sin base de datos) compatible con Cloudflare Pages. | Servir archivos estáticos (`index.html`, `css/`, `js/`, `data/`). | No debe requerir runtime server-side ni variables de entorno obligatorias para MVP. |

## 2. Requerimientos No Funcionales (RNF)

| ID | Categoría | Descripción | Métrica / Estándar |
| :-- | :-- | :-- | :-- |
| RNF-01 | Rendimiento | Carga inicial debe ser mínima sin dependencias externas. | Tamaño total de assets < 150 KB (sin imágenes pesadas). Primer render < 500ms en conexión 3G simulada. |
| RNF-02 | Rendimiento | Actualización de contadores sin bloqueos. | `setInterval` a 1000ms, sin operaciones síncronas pesadas en callback. Actualización sin reflow/repaint innecesario. |
| RNF-03 | Seguridad | Sin ejecución de código remoto. Solo contenido estático local. | Sin `eval()`, sin inyección de HTML desde strings no saneados. Uso exclusivo de `textContent` o construcción controlada. |
| RNF-04 | Usabilidad | Legibilidad con paleta Maomao. | Contraste mínimo WCAG AA para texto sobre fondo/superficie. |
| RNF-05 | Usabilidad | Diseño usable en móviles. | Funcional en viewport 320px - 768px sin scroll horizontal. |
| RNF-06 | Escalabilidad | Datos desacoplados del código. | Agregar/remover personas solo editando `data/birthdays.json` sin modificar `html/css/js`. |
| RNF-07 | Escalabilidad/Despliegue | Compatible con Cloudflare Pages (static hosting). | Sin build step obligatorio para MVP. Archivos servibles directamente. Rutas relativas. Sin `node_modules` requerido para servir. |
| RNF-08 | Mantenibilidad | Colores centralizados en variables CSS. | Todas las paletas definidas en `:root` con prefijo `--color-`. Componentes referencian únicamente variables. Cambios de tema requieren edición única en `:root`. |

## 3. Reglas de Negocio

| ID | Regla | Descripción |
| :-- | :-- | :-- |
| RN-01 | Cálculo de próximo cumpleaños | Si `mes/día` ya pasó en el año actual, el objetivo es `mes/día/año+1`. Si es hoy o futuro en año actual, usar año actual. |
| RN-02 | Formato de datos | `birthdays.json` debe ser array de objetos con `name` (string) y `date` en formato `MM-DD` (requeridos). `note` opcional (string). |
| RN-03 | Sin backend | No se permite lógica de autenticación, persistencia o escritura. Únicamente lectura estática. |
| RN-04 | Tema obligatorio | La UI debe mantener la temática Maomao; colores base deben derivarse de la paleta definida. |
| RN-05 | Personalización via variables | Los colores DEBEN estar expuestos como variables CSS para facilitar modificación sin tocar reglas complejas. |

## 4. Matriz de Trazabilidad

| Módulo (PM) | RFs relacionados | RNFs relacionados | Notas |
| :-- | :-- | :-- | :-- |
| Planeación/Diseño | RF-05, RF-06 | RNF-04, RNF-08, RN-04, RN-05 | Paleta y variables CSS |
| Estructura/Datos | RF-01, RF-02 | RNF-06, RN-07 | `data/birthdays.json`, estático |
| Lógica Contadores | RF-03, RF-04 | RNF-02 | Cálculo próximo cumpleaños + `setInterval` |
| UI/Responsive | RF-07 | RNF-01, RNF-05 | Responsive básico |
| Despliegue | RF-08 | RNF-07 | Cloudflare Pages compatible |

## 5. Recomendaciones para implementación
- Usar `:root { --color-bg: #1a1814; ... }` y `var(--color-bg)`.
- Calcular con `new Date(currentYear, month-1, day)` para evitar ambigüedad.
- Actualizar cada segundo con `setInterval(updateAll, 1000)`.
- Servir con rutas relativas (`./css/styles.css`, `./js/app.js`).
- Para Cloudflare Pages: subir carpeta raíz con `index.html` (sin _redirects complejos para MVP).