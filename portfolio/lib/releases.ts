export type AppRelease = {
  version?: string;
  platform: string;
  summary: string;
  features: string[];
  download?: string;
  github?: string;
  install?: string;
  note: string;
};

const distribution = "https://github.com/dannkis/mac-app-releases/releases";

export const appReleases: Record<string, AppRelease> = {
  maciano: {
    version: "0.1.0",
    platform: "macOS 13+ · Apple Silicon",
    summary: "Turn everyday typing into something musical.",
    features: [
      "45 mapped keys across nearly four octaves, with Mellow, Electric and Organ voices.",
      "Dream mode layers a continuous pad with pentatonic notes and hall reverb.",
      "Play in the app with Safe mode, or opt into system-wide keyboard playing.",
    ],
    download: `${distribution}/download/maciano-v0.1.0/Maciano-0.1.0-macos-arm64.zip`,
    github: `${distribution}/tag/maciano-v0.1.0`,
    install:
      "Unzip the download and move Maciano.app to Applications. Start in Safe mode; system-wide playing requires separate macOS permissions.",
    note: "A locally signed prototype, without Apple notarisation. macOS may require approval before the first launch.",
  },
  keke: {
    platform: "macOS · In development",
    summary: "A little presence. A helping hand.",
    features: [
      "A liquid desktop companion and a focused menu bar conversation panel.",
      "Local model backends, quick-action routing and optional ChatGPT / Codex integration.",
      "Configurable action approval, adaptive reasoning and on-device voice input on supported macOS versions.",
    ],
    note: "A portable download is coming soon. The current development build relies on separately installed model runtimes.",
  },
  cos: {
    version: "0.2.0",
    platform: "macOS · Apple Silicon",
    summary: "A quieter place for the open web.",
    features: [
      "One window, one tab, native window controls and a single address/search field.",
      "System, light and dark appearances, four accent colours and a choice of search engines.",
      "A development preview explores focus intentions and a visual trail for browsing sessions.",
    ],
    download: `${distribution}/download/cos-v0.2.0/COS-0.2.0-arm64-mac.zip`,
    github: `${distribution}/tag/cos-v0.2.0`,
    install:
      "Unzip the download and move COS.app to Applications. The release page also offers a DMG installer.",
    note: "An unsigned development build, without Apple notarisation. Version 0.2.0 does not include the visual trail shown in the development previews. Extensions, multiple tabs and auto-updates are not included.",
  },
  macflix: {
    version: "0.2.0",
    platform: "macOS 14+ · Apple Silicon",
    summary: "Your library. Beautifully local.",
    features: [
      "Browse local movies and series in an adaptive poster grid, with seasons and episode runtimes.",
      "Continue Watching, remaining-time labels and built-in libVLC playback.",
      "Keep your files in place and share portable JSON watch history through a location you control.",
    ],
    install:
      "Unzip the download and move Macflix.app to Applications. Add your media folders to get started. Playback is included; no separate VLC installation is needed.",
    note: "Public download coming soon while release packaging is completed. Screens use a staged demo library; no media is included. Artwork and metadata by TMDB.",
  },
  trackstud: {
    version: "0.10.0",
    platform: "macOS 13+ · Apple Silicon",
    summary: "Give your next study session a little structure.",
    features: [
      "Organise study periods and source-based task lists alongside daily goals.",
      "Keep a menu bar focus timer close by, with study-time statistics and completion notifications.",
      "Store study data locally in JSON, with automatic migration and backups for older files.",
    ],
    download: `${distribution}/download/trackstud-v0.10.0/Trackstud-v0.10.0-macOS-arm64.zip`,
    github: `${distribution}/tag/trackstud-v0.10.0`,
    install:
      "Quit any older Trackstud copy, unzip the download and move Trackstud.app to Applications. Use version 0.10.0 or newer on every Mac opening a schema-6 study file.",
    note: "An ad hoc signed build, without Apple notarisation. Screens show a local demo build with sample tasks; the released interface may differ. Personal study files are not included.",
  },
};
