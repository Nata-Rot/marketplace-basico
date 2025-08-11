# 🛒 Marketplace Básico

Aplicación monolítica en Next.js que simula un pequeño marketplace con dos
tipos de usuarios: Business y Cliente.
La aplicación debe permitir a los negocios crear tiendas con productos, y a los clientes
navegar, registrarse y realizar compras.
<img width="1857" height="1131" alt="image" src="https://github.com/user-attachments/assets/fd925b40-8399-4483-a4a4-42b84ab02b00" />


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

Crear archivo  `.env.local` `.env`:

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

# Reiniciar la aplicación
npm run dev


########### Si no funciona, segunda opción ###########
# Borrar la base de datos
rm -f prisma/dev.db

# Aplicar el esquema Prisma
npx prisma db push

# Opcional: Ejecutar el seed para datos de prueba
npx prisma db seed

# O validar con Prisma Studio
npx prisma studio

# Reiniciar la aplicación
npm run dev
```
# 
### 5. Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:3000

## 👤 Usuarios de Prueba/Test

### Business
- **Email**: business@test.com
- **Password**: Market2025#
- **Tipo**: Business

### Cliente
- **Email**: cliente@test.com  
- **Password**: Market2025#
- **Tipo**: Cliente


## 🗄️ Modelo de Base de Datos

### Validación base de datos
```bash
npx prisma studio
http://localhost:5555/
```

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
1. Registrarse o usar cuenta de prueba.
<img width="1767" height="966" alt="image" src="https://github.com/user-attachments/assets/f8264f44-5539-4174-b64c-ef5fe018e7e6" />
<img width="1681" height="1042" alt="image" src="https://github.com/user-attachments/assets/841206bd-4173-44bf-96a6-661a967a5177" />

2. Crear una tienda
<img width="1795" height="1088" alt="image" src="https://github.com/user-attachments/assets/4f649603-e5cd-466f-a88b-54342b64c836" />

3. Añadir productos a la tienda
<img width="1762" height="1012" alt="image" src="https://github.com/user-attachments/assets/d2a062bd-067a-4d70-9612-81ef10b1a9e0" />

4. Ver pedidos en el dashboard
<img width="1737" height="1103" alt="image" src="https://github.com/user-attachments/assets/d7aa9a8c-43c9-4057-8e53-39b06f6bf7f9" />

### Como Cliente:
1. Navegar tiendas sin registrarse
<img width="1663" height="835" alt="image" src="https://github.com/user-attachments/assets/ee720140-7c15-4709-b9a2-019d161ff1d5" />
<img width="1673" height="1016" alt="image" src="https://github.com/user-attachments/assets/7d66b611-6485-46eb-95ea-239e376fe5d4" />

2. Registrarse para poder comprar
<img width="1767" height="966" alt="image" src="https://github.com/user-attachments/assets/f8264f44-5539-4174-b64c-ef5fe018e7e6" />
<img width="1681" height="1042" alt="image" src="https://github.com/user-attachments/assets/841206bd-4173-44bf-96a6-661a967a5177" />

3. Realizar una compra
<img width="1801" height="1037" alt="image" src="https://github.com/user-attachments/assets/2bd8fd14-4fa4-4fa4-8d7c-a971a2a6d5e8" />

4. Ver historial de pedidos
<img width="1773" height="1086" alt="image" src="https://github.com/user-attachments/assets/b5d172af-2cbf-4445-8440-a4b51ffdf6eb" />

## 📁 Estructura del Proyecto
<img width="500" height="1033" alt="image" src="https://github.com/user-attachments/assets/28af2070-9e41-4387-a6d9-e8baaa2fdeec" />
<img width="332" height="928" alt="image" src="https://github.com/user-attachments/assets/96282d8b-551d-4c8e-85e6-766f871d662b" />

## 📝 Notas de Desarrollo

- La aplicación usa middleware para proteger rutas según el rol del usuario
- Los formularios incluyen validación tanto en cliente como en servidor
- Se implementa manejo de errores y loading states
- El diseño es responsive y accesible

