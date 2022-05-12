import { Link } from '@remix-run/react'
import { Button } from 'flowbite-react'

export function MeetPost(): JSX.Element {
  return (
    <div className=" bg-white dark:bg-gray-800 text-center pt-4">
      <h1 className="text-4xl mb-4 dark:text-white">Gracias por participar</h1>
      <Link to="/?ref=meet-end" className="mx-auto inline-block">
        <Button tabIndex={-1}>Ir a incio</Button>
      </Link>
    </div>
  )
}
