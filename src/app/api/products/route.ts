import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { productSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.userType !== 'BUSINESS') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { name, description, price, stock, storeId } = productSchema.parse(body)

    // Verifica que la tienda pertenece al usuario //
    const store = await prisma.store.findFirst({
      where: {
        id: storeId,
        ownerId: session.user.id,
      },
    })

    if (!store) {
      return NextResponse.json(
        { error: 'Tienda no encontrada o no autorizada' },
        { status: 404 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        storeId,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error al crear producto:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}