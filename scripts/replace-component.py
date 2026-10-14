#!/usr/bin/env python3
"""Replace the MediaBlock component function with a loop-based render."""

import os

filepath = os.path.join(os.path.dirname(__file__), '..', 'components', 'MediaBlock', 'index.js')

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the start of the component function
start = content.index("\nconst MediaBlock = ")

# Find "export default MediaBlock" at the end
export_str = "\nexport default MediaBlock"
export_idx = content.rindex(export_str)
end = export_idx + len(export_str)

print(f'Replacing from char {start} to {end}')
print(f'  Line {content[:start].count(chr(10))+1} to {content[:end].count(chr(10))+1}')

new_component = '''
const ALIGN_MAP = { bottom: 'end', top: 'start', center: 'center' }

const MediaBlock = () => {
  return (
    <section className={styles['fluid-engine-wrap']}>
      {mediaBlockList.items.map((item) => (
        <React.Fragment key={item.sys.id}>
          {item.text && (
            <div className={styles['fluid-engine-grid']}>
              <div className={styles['media-block-text']}>
                <Markdown>{item.text}</Markdown>
              </div>
            </div>
          )}

          {item.imagesCollection?.items.length > 0 && (
            <div className={styles['fluid-engine-grid']}>
              {item.imagesCollection.items.map((image) => (
                <div
                  key={image.sys.id}
                  className={styles['media-block-image']}
                  style={{
                    '--from-col': image.fromColumn,
                    '--to-col': image.toColumn,
                    ...(image.verticalAlignment && {
                      alignSelf: ALIGN_MAP[image.verticalAlignment] || image.verticalAlignment,
                    }),
                  }}
                >
                  <img
                    className={styles.image}
                    src={image.mediaItem.url}
                    width={image.mediaItem.width}
                    height={image.mediaItem.height}
                    alt={image.mediaItem.description || ''}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          )}

          {item.video && (
            <div className={styles['fluid-engine-grid']}>
              <div className={styles['media-block-video']}>
                <Video url={item.video} />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </section>
  )
}

export default MediaBlock'''

content = content[:start] + new_component + content[end:]

# Also clean up unused imports
content = content.replace("import classnames from 'classnames'\n", '')
content = content.replace("import css from './styles.module.scss'\n", '')
content = content.replace("import { ModalContext } from '../../context/ModalProvider'\n", '')
content = content.replace("import clsx from 'clsx'\n", '')
content = content.replace("import React, { useCallback, useContext } from 'react'", "import React from 'react'")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done. Component replaced with loop-based render.')
