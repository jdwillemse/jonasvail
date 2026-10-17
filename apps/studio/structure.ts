import type { StructureResolver } from 'sanity/structure'

// One fixed document each; the ID is the type name.
export const SINGLETONS = ['about', 'settings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('client').title('Clients'),
      S.divider(),
      ...SINGLETONS.map((type) =>
        S.documentListItem().schemaType(type).id(type)
      ),
    ])
