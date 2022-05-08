import classname from 'classnames'
import type { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  loadding?: boolean
  className?: string
}

export function Card({
  children,
  loadding,
  className
}: PropsWithChildren<CardProps>): JSX.Element {
  const classBase =
    'p-4 bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'

  return (
    <div className={className || ''}>
      {loadding && (
        <div className="w-full h-2 relative overflow-hidden rounded-t-lg border-x border-t border-gray-200 dark:border-gray-700 border-opacity-50">
          <motion.div
            className="absolute inset-0 rounded-t-lg h-full w-2/4 bg-blue-500"
            animate={{
              left: ['-50%', '12.5%', '100%'],
              width: ['0%', '75%', '50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          />
        </div>
      )}
      <div
        className={classname(classBase, {
          'rounded-b-lg border-t-0 select-none pointer-events-none opacity-50':
            loadding,
          'rounded-lg': !loadding
        })}
      >
        {children}
      </div>
    </div>
  )
}
