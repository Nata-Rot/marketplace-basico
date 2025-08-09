// src/middleware.ts

import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const { token } = req.nextauth

    // Rutas que requieren autenticación de BUSINESS
    const businessRoutes = ['/dashboard/business']
    
    // Rutas que requieren autenticación de CLIENT  
    const clientRoutes = ['/dashboard/client', '/checkout']

    // Verificar acceso a rutas de business
    if (businessRoutes.some(route => pathname.startsWith(route))) {
      if (!token || token.userType !== 'BUSINESS') {
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
    }

    // Verificar acceso a rutas de cliente
    if (clientRoutes.some(route => pathname.startsWith(route))) {
      if (!token || token.userType !== 'CLIENT') {
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
    }

    // Redirigir a dashboard correspondiente después del login
    if (pathname === '/auth/login' && token) {
      const redirectTo = token.userType === 'BUSINESS' 
        ? '/dashboard/business' 
        : '/dashboard/client'
      return NextResponse.redirect(new URL(redirectTo, req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Permitir acceso a rutas públicas
        const publicRoutes = ['/', '/stores', '/auth/login', '/auth/register']
        const isPublicRoute = publicRoutes.some(route => 
          pathname === route || pathname.startsWith('/stores/')
        )
        
        if (isPublicRoute) return true
        
        // Requerir autenticación para rutas protegidas
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/checkout/:path*',
    '/auth/login',
    '/auth/register'
  ]
}