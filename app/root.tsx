import type { MetaFunction, LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'
import { AppProvider } from './provider/app'
import style from './styles.css'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

export const links: LinksFunction = () => {
  return [
    { href: style, rel: "stylesheet"}
  ]
}

export default function App() {
  return (
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
        <LiveReload />
      </body>
    </html>
  )
}
