import { Link } from '@remix-run/react'
import { Button, Navbar as NavbarContainer } from 'flowbite-react'
import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { Logo } from './logo'

function NavbarNoAuth(): JSX.Element {
  return (
    <>
      <Link to="/auth/logup">
        <Button size="sm" color="light">
          Registrate
        </Button>
      </Link>
      <Link to="/auth/login">
        <Button size="sm">Iniciar Sesion</Button>
      </Link>
    </>
  )
}

export function Navbar(): JSX.Element {
  return (
    <NavbarContainer rounded={false}>
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link
          to="/"
          className="flex items-center"
          aria-label="Lorpoda Team Inicio"
        >
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <Button icon={QuestionMarkCircleIcon} color="light" pill size="sm" />
          <NavbarNoAuth />
        </div>
      </div>
    </NavbarContainer>
  )
}
