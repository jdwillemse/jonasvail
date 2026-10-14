#!/usr/bin/env python3
"""Replace the mediaBlockList data in MediaBlock/index.js with Contentful-structured imagesCollection format."""

import os

filepath = os.path.join(os.path.dirname(__file__), '..', 'components', 'MediaBlock', 'index.js')

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the start and end of mediaBlockList object
start = content.index('const mediaBlockList = {')
# Brace-counting to find matching close brace, skipping strings
i = content.index('{', start)
depth = 0
in_string = False
string_char = None
j = i
while j < len(content):
    c = content[j]
    if in_string:
        if c == '\\':
            j += 2  # skip escaped char
            continue
        if c == string_char:
            in_string = False
    else:
        if c in ("'", '"', '`'):
            in_string = True
            string_char = c
        elif c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                end = j + 1
                break
    j += 1

print(f'Replacing chars {start} to {end} (lines {content[:start].count(chr(10))+1} to {content[:end].count(chr(10))+1})')

new_data = '''const mediaBlockList = {
  items: [
    // FREEDM Recruitment \u2014 intro text + first image row
    {
      sys: { id: '23AuxUdBHybpfOOnUix1UW' },
      text: '## FREEDM Recruitment\\n\\nWe commissioned then up-and-coming FREEDM artist Abel Macias to illustrate a recruitment booklet to inspire other artists and creatives to join the FREEDM movement. We distributed the recruitment piece in stores and events in London, New York, and San Francisco. ',
      video: null,
      imagesCollection: {
        items: [
          {
            sys: { id: 'nuF9tBC8TM0D450LMlnwN' },
            fromColumn: 1,
            toColumn: 16,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '6R1Rhrzi3vZykgG6woEY3C' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/6R1Rhrzi3vZykgG6woEY3C/0a5d29a21098594e4b5c20b0afcb7d41/freedm-Abel_Page__Page_01.jpg',
              width: 860,
              height: 1220,
              description: null,
            },
          },
          {
            sys: { id: '5geGmsdBPgxIIcJPDrdVfN' },
            fromColumn: 18,
            toColumn: -1,
            verticalAlignment: 'bottom',
            mediaItem: {
              sys: { id: '5NVn0l8wiKcSKcyY63qf8K' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/5NVn0l8wiKcSKcyY63qf8K/068337c6073fd3b2b753675fd6c01b6a/freedm-Abel_Page__Page_03.jpg',
              width: 614,
              height: 435,
              description: null,
            },
          },
        ],
      },
    },
    // Abel booklet \u2014 row 2
    {
      sys: { id: '2abelRow2' },
      text: null,
      video: null,
      imagesCollection: {
        items: [
          {
            sys: { id: '3abelImg04' },
            fromColumn: 1,
            toColumn: 11,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '65nK475n4Z22dsFhyyMKYW' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/65nK475n4Z22dsFhyyMKYW/bee5a315ec3393eb49a435f3fdff7b7f/freedm-Abel_Page__Page_04.jpg',
              width: 614,
              height: 435,
              description: null,
            },
          },
          {
            sys: { id: '4abelImg06' },
            fromColumn: 14,
            toColumn: -1,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '7McPdIgYrpqoVbEEjLy4yh' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/7McPdIgYrpqoVbEEjLy4yh/d5cf6bec75ab173300fc3ac16035eea9/freedm-Abel_Page__Page_06.jpg',
              width: 1732,
              height: 1221,
              description: null,
            },
          },
        ],
      },
    },
    // Abel booklet \u2014 full-width spread
    {
      sys: { id: '78yr0PRcxVByl2U4KWe6W5' },
      text: null,
      video: null,
      imagesCollection: {
        items: [
          {
            sys: { id: '5abelImg11' },
            fromColumn: 1,
            toColumn: -1,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '1bHcYIbUqACb0jsvzKi9Gm' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/1bHcYIbUqACb0jsvzKi9Gm/c614c821c952f489d48235977bd3d83c/freedm-Abel_Page__Page_11.jpg',
              width: 1723,
              height: 1221,
              description: null,
            },
          },
        ],
      },
    },
    // Abel booklet \u2014 row 4
    {
      sys: { id: '6abelRow4' },
      text: null,
      video: null,
      imagesCollection: {
        items: [
          {
            sys: { id: '7abelImg07' },
            fromColumn: 1,
            toColumn: 20,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '4fFZZFA54V98gEoEiThsff' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/4fFZZFA54V98gEoEiThsff/e62d406f392acc9d1efddcefab15a2ff/freedm-Abel_Page__Page_07.jpg',
              width: 1723,
              height: 1221,
              description: null,
            },
          },
          {
            sys: { id: '8abelImg08' },
            fromColumn: 21,
            toColumn: -1,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: 'ZwQmTfKChhMXiigRnAIdp' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/ZwQmTfKChhMXiigRnAIdp/a4ccf8fc0d5312491a6571dd731a3bdd/freedm-Abel_Page__Page_08.jpg',
              width: 1723,
              height: 1221,
              description: null,
            },
          },
        ],
      },
    },
    // Abel booklet \u2014 row 5
    {
      sys: { id: '9abelRow5' },
      text: null,
      video: null,
      imagesCollection: {
        items: [
          {
            sys: { id: '10abelImg09' },
            fromColumn: 1,
            toColumn: 12,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '2ZSTf9m3m6lO3BIjgEcKMT' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/2ZSTf9m3m6lO3BIjgEcKMT/60bf78d5154dc8b75bbadf7df902fcdd/freedm-Abel_Page__Page_09.jpg',
              width: 1723,
              height: 1221,
              description: null,
            },
          },
          {
            sys: { id: '11abelImg10' },
            fromColumn: 14,
            toColumn: -1,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '7KMlPzDewRjcWzQHKPdTvi' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/7KMlPzDewRjcWzQHKPdTvi/8ce3efb6350137392d47d1e1d84fa2a4/freedm-Abel_Page__Page_10.jpg',
              width: 1723,
              height: 1221,
              description: null,
            },
          },
        ],
      },
    },
    // Abel booklet \u2014 three-column row
    {
      sys: { id: '7G0XUjARB8NDVyW1YchbZU' },
      text: null,
      video: null,
      imagesCollection: {
        items: [
          {
            sys: { id: '12abelImg12' },
            fromColumn: 1,
            toColumn: 9,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '7CVTKdSpDL0quYsP1LR28H' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/7CVTKdSpDL0quYsP1LR28H/72c0aa8441a54649d546a8c073bb43c1/freedm-Abel_Page__Page_12.jpg',
              width: 1723,
              height: 1221,
              description: null,
            },
          },
          {
            sys: { id: '13abelImg13' },
            fromColumn: 10,
            toColumn: 18,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: 'x2kzKFVR9epn7pcYPgAIN' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/x2kzKFVR9epn7pcYPgAIN/01325f769c344e6721238b4edd2c5a8f/freedm-Abel_Page__Page_13.jpg',
              width: 614,
              height: 435,
              description: null,
            },
          },
          {
            sys: { id: '14abelImg02' },
            fromColumn: 19,
            toColumn: -1,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '4Ltqeo0PX8t2sh0j7GxnVl' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/4Ltqeo0PX8t2sh0j7GxnVl/45dbb703b077c14cfdaa12010f6c516d/freedm-Abel_Page__Page_02.jpg',
              width: 614,
              height: 435,
              description: null,
            },
          },
        ],
      },
    },
    // Mural \u2014 text + video
    {
      sys: { id: '4H8nEDlAMeLSvnx72fclvz' },
      text: 'We also commissioned Abel to paint a FREEDM mural in the flagship Dr. Martens store in Covent Garden, and hosted an event with bands and DJs to unveil the mural and give people the opportunity to interact with Abel, the brand, and the shoes all at the same time.',
      video: 'https://youtu.be/rhMahf9tsac',
      imagesCollection: { items: [] },
    },
    // FREEDM Zine \u2014 intro text + first image row
    {
      sys: { id: '7H3vpch8lMWzV3zYUZvfLV' },
      text: '## FREEDM Zine\\n\\nWe published a zine featuring the work of four different FREEDM artists and distributed it in New York, San Francisco, and London.',
      video: null,
      imagesCollection: {
        items: [
          {
            sys: { id: '15zineImg01' },
            fromColumn: 1,
            toColumn: 10,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '5gX2EBXUqc2HYWB0dan2mY' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/5gX2EBXUqc2HYWB0dan2mY/1a333f8e38ea9e9098dc2b66fb576cb0/freedm-Magazine_Page__Page_01.jpg',
              width: 804,
              height: 1152,
              description: null,
            },
          },
          {
            sys: { id: '16zineImg10' },
            fromColumn: 12,
            toColumn: -1,
            verticalAlignment: 'bottom',
            mediaItem: {
              sys: { id: '1mFbgSEj4HnfpiyeQPCJy0' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/1mFbgSEj4HnfpiyeQPCJy0/0243d2f880ef1d2737b49e642cd32762/freedm-Magazine_Page__Page_10.jpg',
              width: 1584,
              height: 1152,
              description: null,
            },
          },
        ],
      },
    },
    // Zine \u2014 row 2
    {
      sys: { id: '17zineRow2' },
      text: null,
      video: null,
      imagesCollection: {
        items: [
          {
            sys: { id: '18zineImg11' },
            fromColumn: 1,
            toColumn: 12,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '1OlEctRffY6I3AuCcH8bIx' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/1OlEctRffY6I3AuCcH8bIx/8a3b55591698bc3b39f8504398f87fb7/freedm-Magazine_Page__Page_11.jpg',
              width: 1584,
              height: 1152,
              description: null,
            },
          },
          {
            sys: { id: '19zineImg03' },
            fromColumn: 14,
            toColumn: -1,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '6tfyv5bLnN3a9DMuK743VE' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/6tfyv5bLnN3a9DMuK743VE/40de0f8d29852e68f6b19955baaff54e/freedm-Magazine_Page__Page_03.jpg',
              width: 1584,
              height: 1152,
              description: null,
            },
          },
        ],
      },
    },
    // Zine \u2014 full-width spread
    {
      sys: { id: '20zineRow3' },
      text: null,
      video: null,
      imagesCollection: {
        items: [
          {
            sys: { id: '21zineImg04' },
            fromColumn: 1,
            toColumn: -1,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '7FlJeIDqbnmWVRFU7Bqatk' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/7FlJeIDqbnmWVRFU7Bqatk/856600e8a825d90362daca5283a7d08e/freedm-Magazine_Page__Page_04.jpg',
              width: 1584,
              height: 1152,
              description: null,
            },
          },
        ],
      },
    },
    // Zine \u2014 row 4
    {
      sys: { id: '22zineRow4' },
      text: null,
      video: null,
      imagesCollection: {
        items: [
          {
            sys: { id: '23zineImg12' },
            fromColumn: 1,
            toColumn: 14,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '3inLOuur2KxmM1iRbKGTFr' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/3inLOuur2KxmM1iRbKGTFr/a36ab99d7dc0310a3b1936b76c8a32be/freedm-Magazine_Page__Page_12.jpg',
              width: 4400,
              height: 3200,
              description: null,
            },
          },
          {
            sys: { id: '24zineImg02' },
            fromColumn: 16,
            toColumn: -1,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: 'q2mxHXVKQeHDxvyELqazP' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/q2mxHXVKQeHDxvyELqazP/2e88d5938914253e1068ba799ae56990/freedm-Magazine_Page__Page_02.jpg',
              width: 4400,
              height: 3200,
              description: null,
            },
          },
        ],
      },
    },
    // Zine \u2014 row 5
    {
      sys: { id: '25zineRow5' },
      text: null,
      video: null,
      imagesCollection: {
        items: [
          {
            sys: { id: '26zineImg08' },
            fromColumn: 1,
            toColumn: 12,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '66BbFwJSHWn9jsyoSeD8Sf' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/66BbFwJSHWn9jsyoSeD8Sf/6946aeb8832ba50af3825d7a52dbd329/freedm-Magazine_Page__Page_08.jpg',
              width: 1584,
              height: 1152,
              description: null,
            },
          },
          {
            sys: { id: '27zineImg09' },
            fromColumn: 14,
            toColumn: -1,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '57c8FNYUJ0o0TdImNi9Jl3' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/57c8FNYUJ0o0TdImNi9Jl3/bab79b482a91d98bb57fa025a410b5e1/freedm-Magazine_Page__Page_09.jpg',
              width: 1606,
              height: 1168,
              description: null,
            },
          },
        ],
      },
    },
    // Zine \u2014 full-width closing spread
    {
      sys: { id: '28zineRow6' },
      text: null,
      video: null,
      imagesCollection: {
        items: [
          {
            sys: { id: '29zineImg05' },
            fromColumn: 1,
            toColumn: -1,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: 'zpRsn3Wra3S6lVPFM2SvO' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/zpRsn3Wra3S6lVPFM2SvO/76f7271627d17e5c8fc406db552fdf5d/freedm-Magazine_Page__Page_05.jpg',
              width: 4400,
              height: 3200,
              description: null,
            },
          },
        ],
      },
    },
    // Noise Pop \u2014 text + poster
    {
      sys: { id: '6o0g1lACtocv4O7eYac7iy' },
      text: '## Noise Pop\\nWe partnered with acclaimed San Francisco music festival [Noise Pop](https://noisepop.com/about) to create a FREEDM opening event. We showcased the work of 22 FREEDM artists at the event, which included a number of indie bands, work and invitation by Shepard Fairy, and a partnership with Dave Egger\u2019s foundation [826 Valencia](https://826valencia.org/).',
      video: null,
      imagesCollection: {
        items: [
          {
            sys: { id: '30noisepop' },
            fromColumn: 3,
            toColumn: -3,
            verticalAlignment: null,
            mediaItem: {
              sys: { id: '1kvWqreGqHQDWQQ0vrnbSf' },
              url: 'https://images.ctfassets.net/jnzxx8eydhfs/1kvWqreGqHQDWQQ0vrnbSf/9f14053bf81b809192afbf4380a675e5/freedm-Shepard_Tapes_vip.gif',
              width: 640,
              height: 990,
              description: 'FREEDM Night at Noise Pop Festival poster',
            },
          },
        ],
      },
    },
    // Artist films \u2014 text only
    {
      sys: { id: 'hKuMGIEzKqGD3LxaPf5iL' },
      text: '## FREEDM Artist films\\nWe created a series of online films profiling a number of FREEDM artists from the UK and US.',
      video: null,
      imagesCollection: { items: [] },
    },
    // Billboards \u2014 text only
    {
      sys: { id: 'NcIxNgyyl3urrgIlCTjTP' },
      text: '## FREEDM Billboards\\nWe ran a contest to choose 5 different FREEDM artists whose work we reproduced as outdoor billboards in Brooklyn and San Francisco.',
      video: null,
      imagesCollection: { items: [] },
    },
  ],
}'''

content = content[:start] + new_data + content[end:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done. Replaced mediaBlockList data.')
