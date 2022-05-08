import { Link } from "@remix-run/react"
import { Button, Navbar as NavbarContainer } from "flowbite-react"
import { QuestionMarkCircleIcon } from '@heroicons/react/outline'

export function Navbar(): JSX.Element {
  return (
    <NavbarContainer rounded={false}>
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link
          to="/"
          className="flex items-center"
          aria-label="Google Meet Inicio"
        >
          <span role="img" className="mr-3 h-6 sm:h-9 select-none">
            title
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Button icon={QuestionMarkCircleIcon} color="light" pill />
        </div>
      </div>
    </NavbarContainer>
  )
}
