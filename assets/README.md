# Assets

Source design assets — exports from Figma, portraits, logos, case-study visuals.

This is **not** the web-serving directory. Once the Next.js app is scaffolded, optimized
production assets live in `public/`. Keep the large originals here and export smaller,
web-ready versions across.

## Layout

```
assets/
├── global/              portrait, logos, icons
└── projects/
    └── <project>/       per-project exports
```

Inside a project folder, add subfolders as the work produces them:

| Folder | Holds |
| --- | --- |
| `final-design/` | Final UI references, split by viewport when it matters |
| `case-study/` | Curated storytelling visuals — hero, process, comparisons |
| `archive/` | Superseded exports kept for history, never a reference |

## Rules

1. Name files in lowercase kebab-case, descriptively. `taxrise-dashboard-desktop.png`, not `Screen 4 copy.png`.
2. An asset is production-ready only when it is explicitly approved. Raw exports are not.
3. Nothing in an `archive/` folder is a source of truth.
4. Large binaries bloat git history. If this grows past a few hundred MB, move to Git LFS.
