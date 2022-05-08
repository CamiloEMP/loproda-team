import { Logo } from '~/components/logo'
import { Link } from '@remix-run/react'
import { Button } from 'flowbite-react'
import { validate } from '~/util/validate'
import { useForm } from 'react-hook-form'
import { LockClosedIcon, MailIcon } from '@heroicons/react/outline'
import { Card } from '~/components/ui/card'

interface LoginForm {
  email: string
  password: string
}

export default function Logup(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>()

  const onSubmit = (data: LoginForm) => {
    if (Object.keys(errors).length === 0) {
      console.log('send', data)
    }
  }
  return (
    <main className="h-full w-full pt-4 px-4 flex flex-col items-center gap-4 overflow-x-auto">
      <Logo />
      <h1 className="text-2xl dark:text-white">Iniciar Sesion</h1>
      <Card className="w-full md:w-fit">
        <form
          className="flex flex-col gap-4 md:w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Correo Electronico
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <MailIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="mi@email.com"
                required
                {...register('email', validate.email)}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.email.type === 'required'
                  ? 'El campo es Requerido'
                  : null}
                {errors.email.type === 'pattern'
                  ? `El Correo Electronico no es valido`
                  : null}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Contraseña
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <LockClosedIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="contraseña"
                required
                {...register('password', validate.password)}
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.password.type === 'required'
                  ? 'El campo es Requerido'
                  : null}
                {errors.password.type === 'minLength'
                  ? `Minimo ${validate.password.minLength} caracteres`
                  : null}
              </p>
            )}
          </div>
          <Button type="submit" className="!w-full block">
            Resgitrate
          </Button>
          <p className="text-center text-sm text-gray-500">
            Si no tienes una cuenta.{' '}
            <Link
              to="/auth/logup"
              type="button"
              className="text-blue-500 hover:underline"
            >
              Registrate
            </Link>
          </p>
        </form>
      </Card>
    </main>
  )
}
