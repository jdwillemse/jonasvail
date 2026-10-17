# Editing the site content

All text lives in this folder. Images are served from Contentful, so each one
is a full `https://images.ctfassets.net/…` address.

| File                 | What it holds                                     |
| -------------------- | ------------------------------------------------- |
| `projects/<name>.md` | One case study. The file name is its web address. |
| `about.md`           | The About page, work experience and awards        |
| `settings.md`        | Site name and description                         |
| `pages/<name>.md`    | Copy for the home and case-study list pages       |

## A page file

`hero:` is the large line at the top. Each `## Heading` starts a text section,
with the heading as its small label.

On the home page the sections appear in a fixed order: Work, About, then Side
Hustle below the case studies. Keep three sections there.

On `brand-development-and-strategy.md`, `projects:` sets the order of the case
studies. Each entry is a project's file name without `.md`.

## A project file

The part between the `---` lines holds the details:

```yaml
---
title: FREEDM
client: Dr. Martens
date: '2007-03-26'
tags:
  - brand-strategy # shows on Brand Development and Strategy
  - campaign-strategy # shows on Creative and Campaign Strategy
listImage: https://images.ctfassets.net/…/abel-page-08.jpg # picture in project lists
---
```

Below it, write the page top to bottom:

1. **Intro.** Text before the first `##` heading or image row.
2. **Sections.** Start each with a `## Heading`.
3. **Image rows.** Put images and YouTube videos between `::: row` and `:::`.

```markdown
## FREEDM Recruitment

We commissioned artist Abel Macias to illustrate a recruitment booklet.

::: row big-left
![Booklet cover](https://images.ctfassets.net/…/abel-page-01.jpg)
![](https://images.ctfassets.net/…/abel-page-03.jpg){align=bottom}
:::

::: row center
![](https://youtu.be/rhMahf9tsac)
:::
```

The text in `![…]` describes the image for people who can't see it.

## Row layouts

Write the layout name after `::: row`. Leave it out to pick one by the number of
images.

| Layout      | Images | Looks like                            |
| ----------- | ------ | ------------------------------------- |
| `full`      | 1      | Full width                            |
| `center`    | 1      | Centred, with space either side       |
| `left`      | 1      | Pushed to the left                    |
| `right`     | 1      | Pushed to the right                   |
| `pair`      | 2      | Two the same width                    |
| `big-left`  | 2      | Large on the left, small on the right |
| `big-right` | 2      | Small on the left, large on the right |
| `trio`      | 3      | Three in a row, the middle one widest |

Add these after an image to adjust it:

- `{align=top}`, `{align=center}` or `{align=bottom}` lines it up with its row.
- `{from=1 to=16}` places it exactly. The page has 24 columns. `-1` means the
  right edge, `-3` means two columns in from it.

## Adding an image

1. Upload it in Contentful under **Media**.
2. Copy its address and add it to a row as `![description](https://images.ctfassets.net/…)`.
