import { UserIcon } from '@heroicons/react/outline'

export function AvatarIcon({ alt }: { alt: string }): JSX.Element {
  return (
    <span
      role="img"
      className="w-10 h-10 flex justify-center items-center bg-slate-200 rounded-full"
      title={alt}
    >
      <UserIcon className="w-5 h-5" />
    </span>
  )
}
