# Plan de Desarrollo - Software Engineer

## Enfoque: Iterativo por Historia de Usuario
Desarrollo por **Historia de Usuario (US)**, no por épica completa. Cada iteración entrega archivos funcionales y revisables para aprobación antes de continuar.

## Orden de implementación (basado en dependencias MVP)
| Orden | US | Épica | Razón | Entregable |
| :-- | :-- | :-- | :-- | :-- |
| 1 | US-01, US-02 | Configuración y Datos | Estructura base + carga JSON + render inicial | `index.html`, `css/styles.css`, `js/app.js`, `data/birthdays.json` (mock) |
| 2 | US-03, US-04 | Contadores Regresivos | Lógica de cálculo + actualización cada segundo | `js/countdown.js` + integración en `app.js` |
| 3 | US-05, US-06 | Tema Maomao y Personalización | Variables CSS completas + aplicación de tema | Actualización `css/styles.css` con `:root` completo |
| 4 | US-07 | Responsive básico | Media queries | Ajustes `css/styles.css` |
| 5 | US-08, US-09, US-10 | Despliegue/Calidad/Seguridad | Validaciones, rutas relativas, revisión final | Ajustes finales + checklist |

## Metodología por iteración
1. **Análisis** - Revisar US + criterios BDD
2. **Desglose** - Listar archivos a crear/modificar
3. **Implementación** - Código funcional y completo
4. **Validación** - Verificar criterios BDD punto por punto
5. **Entrega** - Mostrar archivos + checklist para revisión/aprobación
6. **Siguiente** - Solo tras aprobación

## Sugerencia de revisión
Cada iteración debe incluir:
- **Archivos a crear/modificar** (rutas exactas)
- **Código completo** (sin placeholders)
- **Validación de criterios** (BDD checklist)
- **Notas de prueba** (cómo probar localmente: Live Server / http-server)

## Estructura objetivo final
```text
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── countdown.js
└── data/
    └── birthdays.json
``` 

**Recomendación:** Iniciar con **Iteración 1: US-01 + US-02** para tener base visible y aprobable.