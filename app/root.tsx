import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import { AppProvider } from './provider/app'
import style from './styles.css'
import { createClient } from '@supabase/supabase-js'
import { Provider } from 'react-supabase'

export const loader: LoaderFunction = () => {
  return json({
    supabaseKey: process.env.SUPABASE_KEY,
    supabaseUrl: process.env.SUPABASE_URL
  })
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

export const links: LinksFunction = () => {
  return [{ href: style, rel: 'stylesheet' }]
}

export default function App() {
  const data = useLoaderData()
  const supabase = createClient(data.supabaseUrl, data.supabaseKey)

  return (
    <Provider value={supabase}>
      <html lang="es">
        <head>
          <Meta />
          <Links />
        </head>
        <body className="font-inter bg-white dark:bg-gray-800">
          <AppProvider>
            <Outlet />
          </AppProvider>
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === 'development' && <LiveReload />}
        </body>
      </html>
    </Provider>
  )
}
