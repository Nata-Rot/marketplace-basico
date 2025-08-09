// src/lib/validations.ts

import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  userType: z.enum(['BUSINESS', 'CLIENT']),
})

export const storeSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().optional(),
})

export const productSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().optional(),
  price: z.number().min(0.01, 'El precio debe ser mayor a 0'),
  stock: z.number().int().min(0, 'El stock no puede ser negativo'),
  storeId: z.string().min(1, 'Debe seleccionar una tienda'),
})

export const orderSchema = z.object({
  productId: z.string().min(1, 'Debe seleccionar un producto'),
  quantity: z.number().int().min(1, 'La cantidad debe ser mayor a 0'),
})