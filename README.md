# unfollow.check

A lightweight browser-based tool to find Instagram accounts you follow that don't follow you back.

No server. No API. No scraping. Fully offline.

## How it works

1. Open your Instagram followers list in a browser, scroll to the bottom, select all and copy → paste into `followers.txt`
2. Do the same for your following list → paste into `following.txt`
3. Open `index.html` in your browser, upload both files, hit **Find non-followers**

## Features

- Supports both plain-text and markdown-link paste formats from Instagram
- Search/filter results instantly
- Pagination (30 per page) with load more
- Copy username to clipboard with one click
- Open any profile directly on Instagram
- 100% offline — your data never leaves your browser

## Project structure

```
unfollow-check/
├── index.html        # Main entry point
├── css/
│   └── style.css     # All styles
├── js/
│   ├── parser.js     # Username extraction logic
│   ├── ui.js         # DOM rendering & events
│   └── app.js        # App entry point, wires everything
└── README.md
```

## Usage

Just open `index.html` in any modern browser. No build step, no dependencies, no install.

```bash
git clone https://github.com/Alir3zag/unfollow-check.git
cd unfollow-check
open index.html   # or double-click it
```

## Getting your followers/following list

1. Go to instagram.com on desktop
2. Open your profile → click **Followers** (or **Following**)
3. Scroll all the way to the bottom so everything loads
4. Select all text on the page (`Ctrl+A`) → Copy → Paste into a `.txt` file
