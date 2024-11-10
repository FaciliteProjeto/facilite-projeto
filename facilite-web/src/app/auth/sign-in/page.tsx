import { Logo } from './logo'
import SignInForm from './sign-in-form'

export default function SignIn() {
  return (
    <div className="grid grid-cols-2 items-center justify-center">
      <div className="flex flex-col bg-black h-screen items-center justify-center">
        <Logo />
      </div>

      <div className="flex flex-col bg-gray-50 h-screen items-center justify-center">
        <SignInForm />
      </div>
    </div>
  )
}
