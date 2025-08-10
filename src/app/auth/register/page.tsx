'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'CLIENT' as 'BUSINESS' | 'CLIENT',
  })
  const [passwordStrength, setPasswordStrength] = useState({
    valid: false,
    message: 'La contraseña debe tener 8+ caracteres, mayúsculas, números y símbolos'
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const validatePassword = (password: string) => {
      const hasMinLength = password.length >= 8
      const hasUpperCase = /[A-Z]/.test(password)
      const hasNumbers = /\d/.test(password)
      const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password)

      const isValid = hasMinLength && hasUpperCase && hasNumbers && hasSpecialChars
      let message = ''

      if (!isValid) {
        const missing = []
        if (!hasMinLength) missing.push('8+ caracteres')
        if (!hasUpperCase) missing.push('mayúscula')
        if (!hasNumbers) missing.push('número')
        if (!hasSpecialChars) missing.push('símbolo')
        message = `Falta: ${missing.join(', ')}`
      } else {
        message = '✓ Contraseña segura'
      }

      setPasswordStrength({ valid: isValid, message })
    }

    if (formData.password) {
      validatePassword(formData.password)
    } else {
      setPasswordStrength({
        valid: false,
        message: 'La contraseña debe tener 8+ caracteres, mayúsculas, números y símbolos'
      })
    }
  }, [formData.password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!passwordStrength.valid) {
      toast.error('La contraseña no cumple con los requisitos de seguridad')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Usuario creado exitosamente')
        router.push('/auth/login')
      } else {
        toast.error(data.error || 'Error al crear usuario')
      }
    } catch (error) {
      toast.error('Error al crear usuario')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link
              href="/auth/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${passwordStrength.valid ? 'border-green-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="Escribe tu contraseña segura"
              />
              <p className={`mt-1 text-xs ${passwordStrength.valid ? 'text-green-600' : 'text-gray-500'}`}>
                {passwordStrength.message}
              </p>
            </div>

            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                Tipo de usuario
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="CLIENT">Cliente - Quiero comprar productos</option>
                <option value="BUSINESS">Business - Quiero vender productos</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || !passwordStrength.valid}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}