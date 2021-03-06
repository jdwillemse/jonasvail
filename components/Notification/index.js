import css from './styles.module.scss'

export default function Notification({ preview }) {
  return preview ? (
    <div className={css.wrap}>
      <div className="py-2 text-center text-sm">
        <div>
          This is page is a preview. <a href="/api/exit-preview">Click here</a>{' '}
          to exit preview mode.
        </div>
      </div>
    </div>
  ) : null
}
