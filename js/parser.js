/**
 * parser.js
 * Extracts Instagram usernames from pasted text files.
 * Supports two formats:
 *   1. Markdown links: [username](https://www.instagram.com/username/)
 *   2. Plain text: alternating username / display name lines
 */

const Parser = (() => {
  const MD_PATTERN = /\(https:\/\/www\.instagram\.com\/([^/)]+)\/?/;
  const UN_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9._]{2,29}$/;

  function isMarkdownFormat(lines) {
    return lines.some(l => /\[.+\]\(https:\/\/www\.instagram\.com\//.test(l));
  }

  function fromMarkdown(lines) {
    const set = new Set();
    lines.forEach(l => {
      const m = l.match(MD_PATTERN);
      if (m) set.add(m[1].toLowerCase());
    });
    return set;
  }

  function fromPlainText(lines) {
    const set = new Set();
    lines.forEach(l => {
      if (UN_PATTERN.test(l)) set.add(l.toLowerCase());
    });
    return set;
  }

  function extract(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (isMarkdownFormat(lines)) return fromMarkdown(lines);
    return fromPlainText(lines);
  }

  return { extract };
})();
