import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Limpiar datos existentes
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.store.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // Crear usuarios de prueba
  const hashedPassword = await bcrypt.hash('123456', 10)

  const businessUser = await prisma.user.create({
    data: {
      name: 'Juan Pérez',
      email: 'business@test.com',
      password: hashedPassword,
      userType: 'BUSINESS',
    },
  })

  const clientUser = await prisma.user.create({
    data: {
      name: 'María García',
      email: 'cliente@test.com',
      password: hashedPassword,
      userType: 'CLIENT',
    },
  })

  // Crear usuarios adicionales
  const businessUser2 = await prisma.user.create({
    data: {
      name: 'Carlos Rodríguez',
      email: 'business2@test.com',
      password: hashedPassword,
      userType: 'BUSINESS',
    },
  })

  const clientUser2 = await prisma.user.create({
    data: {
      name: 'Ana López',
      email: 'cliente2@test.com',
      password: hashedPassword,
      userType: 'CLIENT',
    },
  })

  // Crear tiendas
  const techStore = await prisma.store.create({
    data: {
      name: 'TechnoShop',
      description: 'Los mejores productos tecnológicos y gadgets',
      ownerId: businessUser.id,
    },
  })

  const fashionStore = await prisma.store.create({
    data: {
      name: 'Moda Elegante',
      description: 'Ropa y accesorios de última moda',
      ownerId: businessUser.id,
    },
  })

  const homeStore = await prisma.store.create({
    data: {
      name: 'Hogar & Decoración',
      description: 'Todo para hacer de tu hogar un lugar especial',
      ownerId: businessUser2.id,
    },
  })

  // Crear productos para TechnoShop
  await prisma.product.createMany({
    data: [
      {
        name: 'iPhone 15 Pro',
        description: 'El último iPhone con cámara profesional y chip A17 Pro',
        price: 1299.99,
        stock: 10,
        storeId: techStore.id,
      },
      {
        name: 'MacBook Air M2',
        description: 'Laptop ultradelgada con chip M2 y 8GB de RAM',
        price: 1199.99,
        stock: 5,
        storeId: techStore.id,
      },
      {
        name: 'AirPods Pro',
        description: 'Auriculares inalámbricos con cancelación de ruido',
        price: 249.99,
        stock: 20,
        storeId: techStore.id,
      },
      {
        name: 'iPad Air',
        description: 'Tablet versátil para trabajo y entretenimiento',
        price: 599.99,
        stock: 8,
        storeId: techStore.id,
      },
    ],
  })

  // Crear productos para Moda Elegante
  await prisma.product.createMany({
    data: [
      {
        name: 'Vestido de Verano',
        description: 'Vestido ligero y cómodo perfecto para el verano',
        price: 89.99,
        stock: 15,
        storeId: fashionStore.id,
      },
      {
        name: 'Jeans Premium',
        description: 'Jeans de alta calidad con corte moderno',
        price: 129.99,
        stock: 12,
        storeId: fashionStore.id,
      },
      {
        name: 'Chaqueta de Cuero',
        description: 'Chaqueta de cuero genuino estilo clásico',
        price: 299.99,
        stock: 6,
        storeId: fashionStore.id,
      },
      {
        name: 'Zapatos Deportivos',
        description: 'Zapatillas cómodas para uso diario',
        price: 149.99,
        stock: 18,
        storeId: fashionStore.id,
      },
    ],
  })

  // Crear productos para Hogar & Decoración
  await prisma.product.createMany({
    data: [
      {
        name: 'Sofá Moderno',
        description: 'Sofá de 3 plazas con diseño contemporáneo',
        price: 899.99,
        stock: 3,
        storeId: homeStore.id,
      },
      {
        name: 'Mesa de Centro',
        description: 'Mesa de centro de madera con estilo minimalista',
        price: 199.99,
        stock: 7,
        storeId: homeStore.id,
      },
      {
        name: 'Lámpara de Pie',
        description: 'Lámpara elegante con luz LED regulable',
        price: 79.99,
        stock: 12,
        storeId: homeStore.id,
      },
      {
        name: 'Alfombra Persa',
        description: 'Alfombra tradicional de alta calidad',
        price: 449.99,
        stock: 4,
        storeId: homeStore.id,
      },
    ],
  })

  // Obtener todos los productos con sus IDs
  const allProducts = await prisma.product.findMany({
    select: {
      id: true,
      name: true
    }
  })

  // Función para encontrar ID de producto por nombre con tipado explícito
  const getProductIdByName = (name: string): string => {
    const product = allProducts.find((p: { name: string; id: string }) => p.name === name)
    if (!product) {
      throw new Error(`Producto ${name} no encontrado`)
    }
    return product.id
  }

  // Crear pedidos de ejemplo con tipado seguro
  await prisma.order.createMany({
    data: [
      {
        quantity: 1,
        total: 249.99,
        clientId: clientUser.id,
        productId: getProductIdByName('AirPods Pro'),
        storeId: techStore.id,
        status: 'CONFIRMED',
      },
      {
        quantity: 2,
        total: 179.98,
        clientId: clientUser2.id,
        productId: getProductIdByName('Vestido de Verano'),
        storeId: fashionStore.id,
        status: 'PENDING',
      },
      {
        quantity: 1,
        total: 199.99,
        clientId: clientUser.id,
        productId: getProductIdByName('Mesa de Centro'),
        storeId: homeStore.id,
        status: 'SHIPPED',
      },
    ]
  })

  console.log('✅ Seed completado exitosamente!')
  console.log('')
  console.log('👥 Usuarios creados:')
  console.log(`📧 Business: ${businessUser.email} / 123456`)
  console.log(`📧 Cliente: ${clientUser.email} / 123456`)
  console.log(`📧 Business 2: ${businessUser2.email} / 123456`)
  console.log(`📧 Cliente 2: ${clientUser2.email} / 123456`)
  console.log('')
  console.log('🏪 Tiendas creadas: 3')
  console.log('📦 Productos creados: 12')
  console.log('🛒 Pedidos de ejemplo: 3')
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })