# Reporte Frontend Maomao v2 - Rediseño Completo

## Archivos modificados
| Archivo | Estado | Descripción |
| :-- | :-- | :-- |
| `css/styles.css` | Reescrito | Nueva paleta oficial, variables limpias, tipografía Noto Serif JP |
| `index.html` | Reescrito | SVGs detallados (emblema, flores, hierbas), kanji del título |
| `js/app.js` | Reescrito | SVGs programáticos modulares, nuevo campo `gifts`, iconos dinámicos |
| `data/birthdays.json` | Actualizado | 6 personajes + campo `gifts` (regalos/gustos) |

## Nueva Paleta de Colores (Variables CSS)
```css
--color-bg-primary: #F4EBD9;   /* Crema papel de herbolario */
--color-bg-surface: #FBF6EA;   /* Beige claro tarjetas */
--color-text-primary: #3B2A22; /* Marrón cabello oscuro */
--color-primary: #5E7F6E;      /* Verde jade apagado */
--color-secondary: #8A9A5B;    /* Verde oliva botánico */
--color-accent-red: #A63D40;   /* Rojo bermellón palacio */
--color-accent-gold: #C9A24D;  /* Dorado antiguo */
--color-border: #7A5C45;       /* Marrón tierra */
```

## SVGs Detallados Implementados
- **Emblema header**: Círculo con 4 pétalos (jade/oro) - estilo sello imperial
- **Flores decorativas**: 3 pétalos superpuestos con centro dorado (esquinas superior)
- **Hierbas tarjetas**: Tallo con 2 hojas + flor central dorada/bermellón
- **Icono regalos**: Caja con lazo bermellón
- **Icono contador**: Reloj analógico minimalista
- **Esquinas tarjetas**: Hojas botánicas rotadas
- **Hierbas footer**: 3 hojas alternadas con punto dorado

## Nuevo Campo JSON: `gifts`
Ejemplo:
```json
{
  "name": "Maomao",
  "gifts": "Libros de farmacología raros, hierbas medicinales exóticas, especímenes de plantas venenosas"
}
```

## Funcionalidad Mantenida
- [x] Carga JSON + renderizado tarjetas
- [x] Contadores regresivos D/H/M/S con setInterval 1000ms
- [x] Cálculo próximo cumpleaños (año actual/siguiente)
- [x] Manejo errores + validación
- [x] Responsive 320px+
- [x] Sin dependencias externas (fuentes Google Fonts cacheables)

## Pruebas
1. Servidor local → verificar 6 tarjetas
2. Contadores actualizan cada segundo
3. Campo "Gustos y regalos" visible
4. Responsive móvil
5. Modificar `:root` → cambios globales