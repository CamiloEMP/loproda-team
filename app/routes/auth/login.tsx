import { Logo } from '~/components/logo'
import { Form, Link, useTransition, useSearchParams } from '@remix-run/react'
import { Alert, Button, Spinner } from 'flowbite-react'
import { LockClosedIcon, MailIcon } from '@heroicons/react/outline'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { Card } from '~/components/ui/card'
import type { ActionFunction, MetaFunction } from '@remix-run/node'
import { authenticator } from '~/auth.server'

export const meta: MetaFunction = () => {
  return {
    title: 'Iniciar Sesion',
    description: 'Inicia sesion en tu cuenta de team.loproda.com'
  }
}

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate('sb', request, {
    successRedirect: '/',
    failureRedirect: '/auth/login?auth_fall=true'
  })
}

export default function Logup(): JSX.Element {
  const [search] = useSearchParams()
  const transition = useTransition()

  return (
    <main className="h-full w-full pt-4 px-4 flex flex-col items-center gap-4 overflow-x-auto">
      <Link to="/">
        <Logo />
      </Link>
      <h1 className="text-2xl dark:text-white">Iniciar Sesion</h1>
      <Card className="w-full md:w-fit">
        <Form method="post" className="flex flex-col gap-4 md:w-96">
          {search.has('auth_fall') && (
            <Alert color="red" Icon={InformationCircleIcon}>
              <span>El Correo Electronico o la contraseña son invalidos</span>
            </Alert>
          )}
          {search.has('signout') && (
            <Alert color="blue" Icon={InformationCircleIcon}>
              <span>Se cerro la sesion con exito</span>
            </Alert>
          )}
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
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="mi@email.com"
                required
              />
            </div>
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
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="contraseña"
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="!w-full block"
            disabled={transition.state === 'submitting'}
          >
            {transition.state === 'submitting' && (
              <Spinner color="blue" size="sm" className="mr-2" />
            )}{' '}
            Iniciar Sesion
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
        </Form>
      </Card>
    </main>
  )
}
