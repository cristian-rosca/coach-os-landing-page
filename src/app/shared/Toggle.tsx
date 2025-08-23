import { Switch } from '@headlessui/react'
import { classNames } from '@/app/util/util'

type ToggleProps = {
    enabled: boolean
    setEnabled: (enabled: boolean) => void
    isDisabled?: boolean
}

export default function Toggle({ enabled, setEnabled, isDisabled = false }: ToggleProps) {

  return (
    <dd className="flex items-center">
      <Switch
        checked={enabled}
        onChange={!isDisabled ? setEnabled : undefined}
        className={classNames(
            enabled ? 'bg-indigo-600' : 'bg-gray-200',
          'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-3.5' : 'translate-x-0',
            'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
    </dd>
  )
}
