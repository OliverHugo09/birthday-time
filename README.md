# Birthday Time - Landing Page Maomao

Landing page estática para visualizar los cumpleaños de personas importantes, con temática inspirada en **Maomao** (Los Diarios de la Boticaria).

## Características
- 100% estático (HTML/CSS/JavaScript puro)
- Datos desde `data/birthdays.json` (sin base de datos)
- Contadores regresivos en días, horas, minutos y segundos
- Tema Maomao con paleta de colores personalizable mediante variables CSS
- Responsive (320px+)
- Compatible con Cloudflare Pages

## Estructura
```
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

## Personalización de colores
Modificar únicamente las variables CSS en `css/styles.css` (`:root`):
```css
:root {
    --color-bg-primary: #1a1814;
    --color-accent-gold: #d9b75b;
    /* ... más variables */
}
```

## Añadir cumpleaños
Editar `data/birthdays.json`:
```json
[
  {
    "name": "Nombre",
    "date": "MM-DD",
    "note": "Opcional"
  }
]
```

## Despliegue en Cloudflare Pages
1. Subir la carpeta raíz completa
2. Sin build command necesario
3. Servir `index.html` como punto de entrada
4. Usa rutas relativas - compatible directamente

## Desarrollo local
Usar servidor local (Live Server, http-server):
```bash
npx http-server .
```

## Documentación
Ver carpeta `reporte-landing-maomao-cumpleanos/` para análisis completo, requerimientos, historias de usuario y reportes de iteración.
