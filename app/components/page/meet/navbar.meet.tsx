import {
  MicrophoneIcon,
  CameraIcon,
  CogIcon,
  PhoneIcon,
  ArrowsExpandIcon
} from '@heroicons/react/outline'
import classNames from 'classnames'
import { Button } from 'flowbite-react'
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

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

export function MeetNavbar(): JSX.Element {
  return (
    <nav className="bg-gray-700 p-4 rounded-lg relative flex justify-between items-center">
      <Logo />
      <div className="flex gap-2.5 absolute left-1/2 -translate-x-1/2">
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
      <div>
        <Button
          icon={ArrowsExpandIcon}
          color="light"
          onClick={() => toggleFullScreen()}
        />
      </div>
    </nav>
  )
}
