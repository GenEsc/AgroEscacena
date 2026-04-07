# Agroescacena

Web profesional para **Agroescacena**, empresa familiar de jardineria, paisajismo, mantenimiento y podas con mas de 30 anos de experiencia en el Aljarafe, Sevilla.

## Tecnologias

- **React 19** con **Vite 8**
- **Tailwind CSS 4**
- **Lucide React** (iconos)
- **Plant.id API** (identificador de plantas)
- Deploy listo para **Vercel**

## Estructura

```
src/
├── components/
│   ├── Header.jsx        # Navbar fijo con blur, menu hamburguesa en movil
│   ├── Hero.jsx          # Pantalla de inicio con logo y CTAs
│   ├── Services.jsx      # Grid de 6 servicios
│   ├── Portfolio.jsx     # Carrusel automatico de trabajos realizados
│   ├── PlantIdentifier.jsx  # Identificador de plantas con IA
│   ├── Contact.jsx       # Botones de llamada, WhatsApp y email
│   └── Footer.jsx        # Pie de pagina
├── hooks/
│   └── useScrollReveal.js  # Animaciones al hacer scroll
├── assets/
│   ├── logos/            # Logos de la empresa
│   └── portfolio/        # Imagenes del carrusel (carga automatica)
└── styles/
    └── globals.css       # Tailwind + animaciones custom
```

## Instalacion y desarrollo

```bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev

# Compilar para produccion
npm run build

# Previsualizar build
npm run preview
```

## Variables de entorno

Crea un archivo `.env` en la raiz del proyecto:

```env
VITE_PLANT_ID_API_KEY=tu_clave_de_plant_id
```

Puedes obtener una clave gratuita en [plant.id](https://plant.id).

## Anadir trabajos al portfolio

Coloca imagenes (`.jpg`, `.png`, `.webp`) en la carpeta `src/assets/portfolio/`. Se cargan automaticamente en el carrusel sin necesidad de modificar codigo.

## Deploy en Vercel

El proyecto incluye `vercel.json` configurado. Solo necesitas conectar el repositorio a Vercel y se desplegara automaticamente con cada push.

```bash
npm run build   # genera la carpeta dist/
```
