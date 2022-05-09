/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logo } from '~/components/logo'
import { Form, Link, useActionData, useTransition } from '@remix-run/react'
import { Button, Spinner } from 'flowbite-react'
import { validate } from '~/util/validate'
import { LockClosedIcon, MailIcon, UserIcon } from '@heroicons/react/outline'
import { Card } from '~/components/ui/card'
import type { ActionFunction, MetaFunction } from '@remix-run/node'
import { redirect, json } from '@remix-run/node'
import { supabaseClient as supabase } from '~/supabase.server'
import * as Yup from 'yup'
import { v4 } from 'uuid'
import { getValidationErrors } from '~/util/getErrors.yup'
import { formDataToJSON } from '~/util/formDataToJSON'

const validateForm = async (formData: FormData) => {
  const formJSON = formDataToJSON(formData)
  const projectSchema = Yup.object({
    name: Yup.string()
      .required('Es un campo obligatorio')
      .min(
        validate.name.minLength,
        `Minimo ${validate.name.minLength} caracteres`
      ),
    email: Yup.string()
      .email('Este no es un correo electrónico válido.')
      .required('Es un campo obligatorio')
      .nullable(),
    password: Yup.string()
      .required('Es un campo obligatorio')
      .min(
        validate.password.minLength,
        `Minimo ${validate.password.minLength} caracteres`
      )
  })

  try {
    const project = await projectSchema.validate(formJSON, {
      abortEarly: false
    })
    return project
  } catch (error) {
    throw getValidationErrors(error)
  }
}

export const meta: MetaFunction = () => {
  return {
    title: 'Registro de usuarios',
    description: 'Registrate en team.loproda.com'
  }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  try {
    // validate
    const { email, password, name } = await validateForm(formData)
    const user = await supabase.auth.signUp({ email, password })
    if (user.error) return json({ errors: { signup: true } })

    const userProfile = await supabase.from('profiles').insert({
      id: user.user?.id,
      name,
      lastname: '',
      avatar: '',
      username: name.replace(/ /g, '') + v4(),
      active: false
    })

    if (userProfile.error) return json({ errors: { signupProfile: true } })
    return redirect('/auth/login')
  } catch (errors) {
    return json({ errors })
  }
}

export default function Logup(): JSX.Element {
  const data = useActionData()
  const transition = useTransition()
  return (
    <main className="h-full w-full pt-4 px-4 flex flex-col items-center gap-4 overflow-x-auto">
      <Link to="/">
        <Logo />
      </Link>
      <h1 className="text-2xl dark:text-white">Registrate</h1>
      <Card className="w-full md:w-fit">
        <Form method="post" className="flex flex-col gap-4 md:w-96">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Nombre
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="mi nombre"
                required
              />
            </div>
            {data?.errors && data.errors.name && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {data.errors.name}
              </p>
            )}
          </div>
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
            {data?.errors && data.errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {data.errors.email}
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
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="contraseña"
                required
              />
            </div>
            {data?.errors && data.errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {data.errors.password}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="!w-full block"
            disabled={transition.state === 'submitting'}
          >
            {transition.state === 'submitting' && (
              <Spinner color="blue" size="sm" className="mr-2" />
            )}
            Resgitrate
          </Button>
          <p className="text-center text-sm text-gray-500">
            Si ya tienes una cuenta.{' '}
            <Link
              to="/auth/login"
              type="button"
              className="text-blue-500 hover:underline"
            >
              Iniciar Sesion
            </Link>
          </p>
        </Form>
      </Card>
    </main>
  )
}
