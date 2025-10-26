# UCOfit Frontend

Frontend de la aplicación UCOfit construido con React, TypeScript y Vite.

## 🚀 Tecnologías

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción
- **Material-UI** - Componentes de UI
- **Axios** - Cliente HTTP
- **React Router** - Enrutamiento
- **Framer Motion** - Animaciones

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── common/         # Componentes comunes
│   ├── layout/         # Componentes de layout
│   └── pages/          # Páginas de la aplicación
├── services/           # Servicios de API
├── types/              # Definiciones de tipos TypeScript
├── theme/              # Configuración del tema
└── assets/             # Recursos estáticos
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta ESLint para verificar la calidad del código
- `npm run lint:fix` - Ejecuta ESLint y corrige errores automáticamente
- `npm run type-check` - Verifica los tipos de TypeScript
- `npm run preview` - Previsualiza la build de producción

## 🔧 Configuración de Desarrollo

### Calidad de Código

El proyecto incluye configuraciones para mantener alta calidad de código:

- **ESLint**: Reglas estrictas para TypeScript y React
- **Prettier**: Formateo automático del código
- **TypeScript**: Verificación de tipos estricta

### Servicios de API

Los servicios están organizados por funcionalidad:

- `api.ts` - Configuración base de Axios
- `baseService.ts` - Utilidades para manejo de errores
- `retoService.ts` - Gestión de retos
- `publicacionService.ts` - Gestión de publicaciones
- `comentarioService.ts` - Gestión de comentarios
- `usuarioService.ts` - Gestión de usuarios

## 📋 Mejoras Implementadas

### 1. Coherencia con el Backend
- Tipos actualizados para coincidir con los modelos del backend
- Servicios refactorizados para usar los nuevos endpoints
- Manejo consistente de errores

### 2. Calidad de Código
- Eliminación de comentarios innecesarios
- Código duplicado refactorizado
- Manejo centralizado de errores
- Tipado fuerte con TypeScript

### 3. Buenas Prácticas
- Servicios modulares y reutilizables
- Manejo consistente de respuestas de API
- Validación de tipos en tiempo de compilación
- Configuración estricta de ESLint

### 4. Eliminación de Redundancia
- Servicio base para manejo de errores
- Funciones utilitarias compartidas
- Tipos reutilizables entre servicios

## 🚀 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

3. Verificar calidad del código:
```bash
npm run lint
npm run type-check
```

## 📝 Notas de Desarrollo

- Todos los servicios usan el patrón de manejo centralizado de errores
- Los tipos están sincronizados con el backend
- Se recomienda ejecutar `npm run lint` antes de cada commit
- Los servicios retornan objetos `RespuestaAPI` consistentes
