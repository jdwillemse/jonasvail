import Link from 'next/link'

import css from './styles.module.scss'

export default function Notification({ preview }) {
  return preview ? (
    <div className={css.wrap}>
      <div className="py-2 text-center text-sm">
        <div>
          This is page is a preview.{' '}
          <Link href="/api/exit-preview">
            <a>Click here</a>
          </Link>{' '}
          to exit preview mode.
        </div>
      </div>
    </div>
  ) : null
}
