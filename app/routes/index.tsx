import { Button } from 'flowbite-react'
import { Navbar } from '~/components/navbar'
import { useAppContext } from '~/provider/app'

export default function Index() {
  const { setTheme, theme } = useAppContext()
  return (
    <>
    <Navbar />
    <div>
      <Button onClick={() => {
        setTheme(theme === 'light' ? 'dark': 'light')
      }}>dasd</Button>
    </div>
    </>
  )
}
