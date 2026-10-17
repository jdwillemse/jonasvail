# jonasvail.com

A Turborepo monorepo with two apps:

- `apps/web`: the site, a static [Eleventy](https://www.11ty.dev/) build deployed on Vercel with `apps/web` as its root directory
- `apps/studio`: the Sanity Studio, deployed to jonasvail.sanity.studio with `pnpm --filter studio deploy`

Run `pnpm dev` to start both, or `pnpm --filter web dev` for the site alone.
The site's dev server runs at http://localhost:8080 and rebuilds on save.

## How the site is built

Eleventy fetches all content from Sanity at build time and writes plain HTML
to `apps/web/_site`. Each page ships one small script, about 5 KB gzipped,
and no framework.

- **Pages**: the templates in [apps/web/pages](apps/web/pages) render the
  React components in [apps/web/components](apps/web/components) to static
  HTML. React only runs during the build, never in the browser.
- **Styles**: components keep their CSS modules. Lightning CSS compiles them
  during the build, and every page inlines the result in a `<style>` tag.
  [apps/web/lib/hooks.js](apps/web/lib/hooks.js) lets Node load the JSX and
  CSS imports.
- **Browser JavaScript**: the menu, link effects, hero wobble and YouTube
  consent live in each component's `client.js`.
  [apps/web/client.js](apps/web/client.js) bundles them with esbuild into
  `/js/client-<hash>.js`.
- **Images**: [Eleventy Image](https://www.11ty.dev/docs/plugins/image/)
  resizes Sanity images and YouTube thumbnails to AVIF and WebP, served from
  `/img/`. Encoded images are kept in `apps/web/.cache`, so a rebuild only
  encodes new ones. A build without that cache takes about 30 seconds longer.
- **Redirects and caching**: [apps/web/vercel.json](apps/web/vercel.json)
  holds the old URL redirects. It also caches `/js`, `/img` and `/fonts` for a
  year. If a font file changes, rename it.

Run the tests with `pnpm test`. They use Bun and Testing Library.

## Content

All content and images live in the Sanity project `3hjgtb6q`, dataset
`production`. The site reads it with GROQ queries in
[apps/web/lib/api.js](apps/web/lib/api.js).

Because the site is static, publishing a change rebuilds it. A Sanity webhook
posts to `/api/revalidate`. That function checks the webhook's signature,
then calls a Vercel deploy hook, which rebuilds and redeploys the site in
about a minute.

To set this up:

1. In Vercel, under Settings, then Git, create a deploy hook for the `main`
   branch.
2. Add its URL to the Vercel environment variables as `VERCEL_DEPLOY_HOOK_URL`.
3. In Sanity, under API, then Webhooks, add a webhook:
   - URL: `https://<live domain>/api/revalidate`
   - Trigger on create, update and delete, for all documents
   - Projection: `{_type}`
   - Secret: the value of `SANITY_REVALIDATE_SECRET`, which Vercel also needs

After a schema change, run `pnpm typegen` to update
`apps/studio/sanity.types.ts`.

## Secret management

The encrypted environment files live in `apps/web`. Run these commands there.

Use the official SOPS and age CLIs directly; no custom scripts are needed.
Install them with Homebrew (`brew install sops age`).

1. Create an age identity outside the repository with `age-keygen -o "$HOME/.config/sops/age/keys.txt"`
   after creating its parent directory. Restrict the directory to permissions
   0700 and the key to 0600. Back up the private key securely; never commit it.
2. Put the **public** recipient printed by age-keygen into [.sops.yaml](.sops.yaml),
   replacing `REPLACE_WITH_YOUR_AGE_PUBLIC_RECIPIENT`. Set
   `export SOPS_AGE_KEY_FILE="$HOME/.config/sops/age/keys.txt"` in your shell.
   On macOS, SOPS otherwise looks in the user's Library/Application Support
   directory rather than the location above. Add the export to your shell
   profile if you want it available in future terminal sessions.
3. Encrypt with `sops encrypt --input-type binary --output-type json --filename-override .env.enc.json --output .env.enc.json .env`.
   Repeat for the local override using the same command with `.env.local` and
   `.env.local.enc.json`. Binary input protects the entire file, including comments.
4. Decrypt for local builds with `sops decrypt --input-type json --output-type binary --output .env .env.enc.json`.
   Repeat for the local override. Decryption overwrites the destination, so back
   up local changes first and restrict plaintext files to permissions 0600.
5. Commit only encrypted files and the public SOPS configuration. Plaintext
   environment files and private age keys are ignored by Git. Re-encrypt after
   changing secrets; normal development commands remain unchanged.

Vercel still needs secrets in its environment-variable settings; it does not
automatically decrypt SOPS files. Rotate any credentials previously committed
in plaintext, including the hardcoded Contentful export tokens: SOPS cannot
remove exposed credentials from Git history.

### Contentful export

The [export script](scripts/export-contentful.mjs) requires
`CONTENTFUL_ACCESS_TOKEN` (Content Delivery API) and
`CONTENTFUL_MANAGEMENT_TOKEN` (Content Management API). Set both in your shell
environment or in the ignored local environment file, using
[.env.local.example](.env.local.example) as a template. Never commit token values.

With Node.js 25, run `node --env-file=.env.local scripts/export-contentful.mjs`
to load the local environment file, or `node scripts/export-contentful.mjs` if
the variables are already exported. The script fails before making requests or
writing files if either token is missing or blank.
