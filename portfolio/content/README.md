# Portfolio Content

Edit portfolio copy and collection data in this folder:

- `about.json` controls the About section text.
- `projects.json` controls project cards and expanded project data.
- `skills.json` controls skill cards and expanded skill data.

Rules:

- Every `id` must be unique within its file.
- Image `src` values should point to files under `public`, starting with `/`.
- Optional fields can be omitted instead of set to an empty string.
- Skill certificates can be added with `certificateImage`.

Example skill with a certificate:

```json
{
  "id": "react",
  "name": "React",
  "description": "Experience building component-driven interfaces with React.",
  "image": {
    "src": "/images/skills/react.svg",
    "alt": "Icon image of the React.js framework."
  },
  "certificateImage": {
    "src": "/images/certificates/react.png",
    "alt": "React certificate."
  }
}
```
