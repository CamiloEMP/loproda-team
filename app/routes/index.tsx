import { Button } from 'flowbite-react'
import { Navbar } from '~/components/navbar'
import { useAppContext } from '~/provider/app'

export default function Index() {
  const { setTheme, theme } = useAppContext()
  return (
    <>
    <Navbar />
    <main>
      pagina de presentacion
    </main>
    </>
  )
}
