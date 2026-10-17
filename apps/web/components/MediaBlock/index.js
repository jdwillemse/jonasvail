import { Fragment } from 'react'
import { PortableText } from '@portabletext/react'

import Picture from '@/components/Picture'
import styles from './styles.module.css'
import Video from '../Video'

const ALIGN_MAP = { bottom: 'end', top: 'start', center: 'center' }

// Content columns are numbered 1 to 24 (negative counts from the end). The
// page grid has a gutter column on each side, so shift by one grid line.
const toGridLine = (column) => (column < 0 ? column - 1 : column + 1)

const MediaBlock = ({ blocks = [] }) => {
  return (
    <section className={styles.wrap}>
      {blocks.map((block) => (
        <Fragment key={block.sys.id}>
          {block.text && (
            <div className={styles.row}>
              <div className={styles.text}>
                <PortableText value={block.text} />
              </div>
            </div>
          )}

          {block.rows.map((row, i) => (
            <div key={i} className={styles.row}>
              {row.map((item) => (
                <div
                  key={item.image?.sys.id ?? item.video}
                  className={styles.item}
                  style={{
                    '--from-col': toGridLine(item.from),
                    '--to-col': toGridLine(item.to),
                    alignSelf: ALIGN_MAP[item.align],
                  }}
                >
                  {item.video ? (
                    <Video url={item.video} thumbnail={item.thumbnail} />
                  ) : (
                    <Picture
                      image={item.image.formats}
                      alt={item.image.description || ''}
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </Fragment>
      ))}
    </section>
  )
}

export default MediaBlock
