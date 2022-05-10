import { LogoutIcon, SunIcon } from '@heroicons/react/outline'
import { MoonIcon } from '@heroicons/react/solid'
import { Link } from '@remix-run/react'
import {
  Button,
  Navbar as NavbarContainer,
  Avatar,
  Dropdown
} from 'flowbite-react'
import { AvatarIcon } from '~/assets/avatar'
import { useAppContext } from '~/provider/app'
import { Logo } from './logo'
import classname from 'classnames'

interface NavbarProps {
  user?: {
    name: string
    username: string
    avatar: string
  }
}

function NavbarAuth({ user }: NavbarProps): JSX.Element {
  const { theme, setTheme } = useAppContext()
  return (
    <>
      <Button
        color="light"
        pill
        onClick={() => {
          setTheme(theme === 'light' ? 'dark' : 'light')
        }}
      >
        {theme === 'light' ? (
          <>
            <SunIcon className="w-5 h-5 md:mr-2 inline-flex items-center" />
            <span className="hidden md:block">Claro</span>
          </>
        ) : null}
        {theme === 'dark' ? (
          <>
            <MoonIcon className="w-5 h-5 md:mr-2 inline-flex items-center" />
            <span className="hidden md:block">Oscuro</span>
          </>
        ) : null}
      </Button>
      <Dropdown
        label={
          user && user.avatar !== '' ? (
            <Avatar
              img={user.avatar}
              alt={`${user.name}<${user.username}>`}
              rounded
            />
          ) : (
            <AvatarIcon alt={`${user?.name}<${user?.username}>`} />
          )
        }
        pill
        inline
        arrowIcon={false}
      >
        <Dropdown.Item>
          <Link to="/auth/logout" className="text-red-500">
            <LogoutIcon className="w-5 h-5 inline-block mr-2 place-content-center" />
            Cerrar Sesion
          </Link>
        </Dropdown.Item>
      </Dropdown>
    </>
  )
}

function NavbarNoAuth(): JSX.Element {
  return (
    <>
      <Link to="/auth/logup">
        <Button size="sm" color="light" tabIndex={-1}>
          Registrate
        </Button>
      </Link>
      <Link to="/auth/login">
        <Button size="sm" tabIndex={-1}>
          Iniciar Sesion
        </Button>
      </Link>
    </>
  )
}

export function Navbar({ user }: NavbarProps): JSX.Element {
  return (
    <NavbarContainer rounded={false} fluid={!!user}>
      <div
        className={classname(
          'flex flex-wrap justify-between items-center mx-auto',
          {
            container: !user,
            'w-full': user
          }
        )}
      >
        <Link
          to="/"
          className="flex items-center"
          aria-label="Lorpoda Team Inicio"
        >
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          {user ? <NavbarAuth user={user} /> : <NavbarNoAuth />}
        </div>
      </div>
    </NavbarContainer>
  )
}
