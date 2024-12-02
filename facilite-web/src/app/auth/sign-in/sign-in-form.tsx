'use client'

import { useFormState } from '@/app/hook/use-form-state'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertTriangle, LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signInWithEmailPassword } from './action'

export default function SignInForm() {
  const router = useRouter()

  const [{ message, success }, handleSubmit, isPending] = useFormState(
    signInWithEmailPassword,
    () => router.push('/')
  )

  return (
    <form onSubmit={handleSubmit} className="w-64">
      {success === false && message && (
        <Alert variant="destructive" className="max-w-72 mb-2">
          <AlertTriangle className="size-4" />
          <AlertTitle>Falha na Autenticação</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <h2 className="text-gray-950 text-xl mb-2">Login</h2>

      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email" className="text-gray-800">
            E-mail
          </Label>

          <Input
            id="email"
            type="email"
            className="border border-gray-900 ring-0 focus-within:border-none"
            name="email"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-gray-800">
            Senha
          </Label>

          <Input
            id="password"
            type="password"
            className="border border-gray-900 ring-0 focus-within:border-none"
            name="password"
          />
        </div>

        <span className="mt-3 inline-block text-xs">Esquece a senha?</span>
      </div>

      <Button type="submit" disabled={isPending} className="w-full mt-3">
        {isPending ? <LoaderIcon className="size-4 animate-spin" /> : 'Entrar'}
      </Button>
    </form>
  )
}
