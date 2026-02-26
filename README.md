# 🌳 My Family Tree

Aplicación web interactiva del árbol genealógico de la familia — construida con React + Vite.

## 🚀 Cómo correr el proyecto

### Requisitos
- Node.js 18+ instalado ([descargar aquí](https://nodejs.org))
- npm (viene con Node)

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en modo desarrollo
npm run dev
```

Luego abre tu navegador en **http://localhost:5173**

### Para construir para producción
```bash
npm run build
npm run preview
```

---

## 📸 Cómo cambiar las fotos

Las fotos están definidas en `src/App.jsx` al inicio del componente principal:

```jsx
const [photos, setPhotos] = useState({
  maria:   DEFAULT_AVATAR,  // ← reemplaza con URL o ruta de imagen
  javier:  DEFAULT_AVATAR,
  jenny:   DEFAULT_AVATAR,
  zule:    DEFAULT_AVATAR,
  edwin:   DEFAULT_AVATAR,
  brando:  DEFAULT_AVATAR,
  brahian: DEFAULT_AVATAR,
  vanessa: DEFAULT_AVATAR,
});
```

**Opciones para agregar fotos:**

1. **Desde URL pública**: reemplaza `DEFAULT_AVATAR` con una URL directa, ej:
   ```jsx
   maria: "https://ejemplo.com/foto-maria.jpg",
   ```

2. **Imagen local**: pon la foto en `public/` y usa la ruta:
   ```jsx
   maria: "/foto-maria.jpg",
   ```

3. **Desde el navegador**: haz clic en cualquier miembro del árbol, y en la tarjeta modal usa el botón 📷 para subir la foto directamente.

---

## ✨ Funcionalidades

- 🌳 Árbol genealógico interactivo con emojis
- 📋 Tarjeta modal con descripción al hacer clic
- 📷 Subida de fotos desde la interfaz
- 🔍 Zoom de imagen a pantalla completa
- 🏙️ Info de ubicación (Ituango / Medellín, Enciso)
- ♊ Badge especial para gemelos (Brando & Brahian)
- ⭐ Badge para "yo" (Brando)

---

## 🗂 Estructura del proyecto

```
family-tree/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx        ← Componente principal (árbol + modal)
│   ├── main.jsx       ← Entry point de React
│   └── index.css      ← Estilos globales + fuentes
├── index.html
├── package.json
├── vite.config.js
└── README.md
```
