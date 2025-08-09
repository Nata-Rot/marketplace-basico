// src/app/api/stores/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { storeSchema } from '@/lib/validations'

export async function GET() {
  try {
    const stores = await prisma.store.findMany({
      include: {
        owner: {
          select: { name: true, email: true },
        },
        _count: {
          select: { products: true },
        },
      },
    })

    return NextResponse.json(stores)
  } catch (error) {
    console.error('Error al obtener tiendas:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

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
    const { name, description } = storeSchema.parse(body)

    const store = await prisma.store.create({
      data: {
        name,
        description,
        ownerId: session.user.id,
      },
    })

    return NextResponse.json(store, { status: 201 })
  } catch (error) {
    console.error('Error al crear tienda:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
