# 🛒 Marketplace Básico

Aplicación monolítica en Next.js que simula un pequeño marketplace con dos
tipos de usuarios: Business y Cliente.
La aplicación debe permitir a los negocios crear tiendas con productos, y a los clientes
navegar, registrarse y realizar compras.

## 🛠️ Tecnologías

- **Framework**: Next.js 14 (App Router)
- **Base de datos**: SQLite con Prisma ORM
- **Autenticación**: NextAuth.js
- **Estilos**: Tailwind CSS
- **UI Components**: Headless UI
- **Validación**: Zod

## 📦 Instalación

### 1. Clonar el repositorio GitHub

```bash
git clone <https://github.com/Nata-Rot/marketplace-basico>
cd marketplace-basico
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env` o tambien `.env.local`:

```env
# Base de datos
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="HDSJA73838HDGD!IOI.HJWS"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Configurar la base de datos

```bash
# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma db push

# (Opcional) Cargar datos de prueba
npx prisma db seed
```

### 5. Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:3000

## 👤 Usuarios de Prueba/Test

### Business
- **Email**: business@test.com
- **Password**: 123456
- **Tipo**: Business

### Cliente
- **Email**: cliente@test.com  
- **Password**: 123456
- **Tipo**: Cliente


## 🗄️ Modelo de Base de Datos

### Tablas Principales

- **User**: Usuarios (Business y Cliente)
- **Store**: Tiendas creadas por Business
- **Product**: Productos asociados a tiendas
- **Order**: Pedidos realizados por clientes

### Relaciones

- Un Business puede tener múltiples tiendas
- Una tienda puede tener múltiples productos
- Un cliente puede realizar múltiples pedidos
- Cada pedido está asociado a un producto, tienda y business

## 🔒 Manejo de Permisos

### Rutas Públicas
- `/` - Página principal
- `/stores` - Lista de tiendas
- `/stores/[id]` - Productos de una tienda
- `/auth/login` - Login
- `/auth/register` - Registro

### Rutas Protegidas - Business
- `/dashboard/business` - Dashboard principal
- `/dashboard/business/stores` - Gestión de tiendas
- `/dashboard/business/products` - Gestión de productos
- `/dashboard/business/orders` - Pedidos recibidos

### Rutas Protegidas - Cliente
- `/dashboard/client` - Dashboard del cliente
- `/dashboard/client/orders` - Historial de pedidos
- `/checkout` - Proceso de compra

## 🧪 Testing

Para probar la aplicación:

### Como Business:
1. Registrarse o usar cuenta de prueba
2. Crear una tienda
3. Añadir productos a la tienda
4. Ver pedidos en el dashboard

### Como Cliente:
1. Navegar tiendas sin registrarse
2. Registrarse para poder comprar
3. Realizar una compra
4. Ver historial de pedidos


## 📝 Notas de Desarrollo

- La aplicación usa middleware para proteger rutas según el rol del usuario
- Los formularios incluyen validación tanto en cliente como en servidor
- Se implementa manejo de errores y loading states
- El diseño es responsive y accesible

