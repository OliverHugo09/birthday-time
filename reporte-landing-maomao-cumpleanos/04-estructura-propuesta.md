# Estructura propuesta del proyecto

```
birthday-time/
├── index.html        # Landing principal
├── css/
│   └── styles.css    # Estilos con paleta Maomao
├── js/
│   ├── app.js        # Lógica de carga de JSON y contadores
│   └── countdown.js  # Cálculo días/horas/min/seg
├── data/
│   └── birthdays.json # Datos estáticos
└── assets/
    └── img/          # Imágenes opcionales (decorativas)
```

## Especificaciones técnicas
- **HTML5 semántico**
- **CSS3** con variables CSS para la paleta
- **Vanilla JavaScript** (sin frameworks)
- **Datos:** `birthdays.json` con estructura:
```json
[
  {
    "name": "Nombre",
    "date": "MM-DD", // o YYYY-MM-DD; mejor usar MM-DD para calcular próximo cumpleaños
    "note": "Opcional"
  }
]
```
- **Contadores:** Calcular diferencia entre ahora y la próxima fecha de cumpleaños (considerar año siguiente si ya pasó este año). Mostrar: `DD días HH horas MM minutos SS segundos` (en tiempo restante)
- **Estático:** Puede servirse con cualquier servidor estático (VS Code Live Server, http-server, etc.)