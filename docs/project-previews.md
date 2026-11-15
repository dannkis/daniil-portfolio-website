# Project previews

## Single-page interaction

All projects stay within the portfolio screen. Selecting a project morphs the preview, description and available links using the existing focus state and image carousel. There are no project detail routes or separate gallery components.

`portfolio/content/projects.json` is the single source for descriptions, images and links. Its optional `links.download`, `links.release`, `links.repository` and `links.website` fields appear directly in the About panel. Download points to an installer; Release points to external release notes. Empty repository URLs remain private and render a coming-soon placeholder.

Maciano, COS and Trackstud download from https://github.com/dannkis/mac-app-releases. That repository contains documentation and app binaries only. The five development repositories remain private. Codex Meter’s source repository is also private; its links show “Coming soon” until a public download is available.

Keke has no portable build yet. Macflix public distribution awaits the corresponding VLC sources and license texts required by its existing third-party notices. Both show “Coming soon”; no private release links are exposed. Installation details, requirements, preview limitations and checksums are on the public GitHub release pages.

## Imagery

All 30 project images use a consistent 16:9 canvas. The five new app compositions were rendered for this format; older images use matching background padding to preserve complete screen content.

- Maciano: two native app captures, Electric voice and Dream mode.
- Keke: three native captures of quick actions, conversation and settings in an isolated temporary home without real chat history.
- Consume OS / COS: three existing smoke-test captures, dark and light home and visual trail. The trail is from a later development branch, not the 0.2.0 release.
- Macflix: three documentation captures using a staged demo library. Artwork and metadata are from TMDB.
- Trackstud: three native captures with built-in sample tasks in an isolated temporary home. The demo interface differs from the 0.10.0 release.

Presentation frames crop native title bars where needed without recreating application UI. Raw captures, temporary app copies, personal settings, study files and chat history are not committed.

## Verification

Run `npm ci` and `npm run build` from `portfolio`. The site uses static export. Lint changed files with ESLint. Full-site lint has existing `react-hooks/set-state-in-effect` errors in unchanged magnifier/carousel effects.
