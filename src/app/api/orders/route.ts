import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { orderSchema } from '@/lib/validations'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    let orders

    if (session.user.userType === 'BUSINESS') {
      // Business ve los pedidos de sus tiendas //
      orders = await prisma.order.findMany({
        where: {
          store: {
            ownerId: session.user.id,
          },
        },
        include: {
          client: {
            select: { name: true, email: true },
          },
          product: true,
          store: true,
        },
        orderBy: { createdAt: 'desc' },
      })
    } else {
      // Cliente ve sus propios pedidos //
      orders = await prisma.order.findMany({
        where: {
          clientId: session.user.id,
        },
        include: {
          product: true,
          store: {
            include: {
              owner: {
                select: { name: true, email: true },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })
    }

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error al obtener pedidos:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.userType !== 'CLIENT') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { productId, quantity } = orderSchema.parse(body)

    // Obtiene producto y tienda //
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { store: true },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      )
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { error: 'Stock insuficiente' },
        { status: 400 }
      )
    }

    const total = product.price * quantity

    // Crea el pedido y actualizar stock //
    const [order] = await prisma.$transaction([
      prisma.order.create({
        data: {
          quantity,
          total,
          clientId: session.user.id,
          productId,
          storeId: product.storeId,
        },
      }),
      prisma.product.update({
        where: { id: productId },
        data: { stock: product.stock - quantity },
      }),
    ])

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error al crear pedido:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}