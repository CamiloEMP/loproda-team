import { Link } from '@remix-run/react'
import { Button } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Logo } from '../logo'
import { Navbar } from '../navbar'

function HeaderTitle(
  setText: (text: string) => void,
  texto: string,
  n: () => void
) {
  let i = 0
  const timer = setInterval(function () {
    if (i < texto.length) {
      setText(texto.substr(0, i++) + '|')
    } else {
      clearInterval(timer)
      setText(texto)
      setTimeout(n, 2600)
    }
  }, 150)
}

export function IndexPage(): JSX.Element {
  const [hText, setHText] = useState('')
  const [hIndex, setHIndex] = useState(0)

  useEffect(() => {
    const headerText = ['tu equipo', 'tu proyecto', 'tu organizacion']
    HeaderTitle(setHText, headerText[hIndex], () => {
      setHIndex(hIndex >= 2 ? 0 : hIndex + 1)
    })
  }, [hIndex])

  return (
    <>
      <Navbar />
      <main>
        <header className="container mx-auto h-96 flex flex-col justify-center md:flex-row md:justify-start md:items-center px-4 md:px-0">
          <div className="w-full md:w-2/4">
            <span>
              <Logo></Logo>
            </span>
            <h1 className="flex flex-col gap-2">
              <span className="text-2xl dark:text-white">
                Gestiona equipos para
              </span>
              <span className="text-4xl dark:text-white">{hText}</span>
            </h1>
            <Link to="/auth/login?ref=join">
              <Button className="mt-4" tabIndex={-1}>
                Unete gratis
              </Button>
            </Link>
          </div>
          <div className="hidden md:block w-2/4"></div>
        </header>
      </main>
    </>
  )
}
