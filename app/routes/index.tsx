import { useEffect, useState } from 'react'
import { Logo } from '~/components/logo'
import { Navbar } from '~/components/navbar'

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

export default function Index() {
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
        <header className="container mx-auto h-96 flex items-center">
          <div className="w-2/4">
            <span>
              <Logo></Logo>
            </span>
            <h1 className="flex flex-col gap-2">
              <span className="text-2xl dark:text-white">
                Gestiona equipos para
              </span>
              <span className="text-4xl dark:text-white">{hText}</span>
            </h1>
          </div>
          <div className="w-2/4">imagen de presentacion</div>
        </header>
      </main>
    </>
  )
}
