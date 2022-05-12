import {
  MicrophoneIcon,
  CameraIcon,
  CogIcon,
  PhoneIcon
} from '@heroicons/react/outline'
import classNames from 'classnames'
import { Logo } from '~/components/logo'

interface MeetButtonProps {
  icon: JSX.Element
  active: boolean
  toogle?: (status: boolean) => void
  large?: boolean
}

export function MeetButton({
  icon,
  active,
  toogle,
  large
}: MeetButtonProps): JSX.Element {
  const classDefault =
    'text-white focus:outline-none font-medium rounded-full text-sm p-2.5'

  return (
    <button
      onClick={() => {
        if (toogle) {
          toogle(!active)
        }
      }}
      className={classNames(classDefault, {
        'bg-red-600': !active,
        'bg-gray-800': active,
        'p-2.5': !large,
        'px-5 py-2.5': large
      })}
    >
      {icon}
    </button>
  )
}

export function MeetNavbar(): JSX.Element {
  return (
    <nav className="bg-gray-700 px-4 py-2 rounded-lg relative flex justify-between items-center">
      <Logo />
      <div className="flex gap-2.5">
        <MeetButton icon={<CameraIcon className="w-5 h-5" />} active={true} />
        <MeetButton
          icon={<MicrophoneIcon className="w-5 h-5" />}
          active={true}
        />
        <MeetButton icon={<CogIcon className="w-5 h-5" />} active={true} />
        <MeetButton
          icon={
            <PhoneIcon className="w-5 h-5 rotate-130 [transform:rotate(133deg)]" />
          }
          active={false}
          large
        />
      </div>
      <div></div>
    </nav>
  )
}
