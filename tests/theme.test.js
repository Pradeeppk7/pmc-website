const assert = require("node:assert/strict");
const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
const js = fs.readFileSync("script.js", "utf8");

const head = html.match(/<head>[\s\S]*?<\/head>/)[0];
assert.ok(head.indexOf("data-theme") > -1 && head.indexOf("data-theme") < head.indexOf("styles.css"),
  "The theme must be set in <head> before the stylesheet loads to avoid a flash of the wrong theme");
assert.match(head, /prefers-color-scheme: dark/, "The default theme must follow the OS preference");

const header = html.match(/<header class="site-header">[\s\S]*?<\/header>/)[0];
assert.match(header, /<button class="theme-toggle" type="button" aria-pressed="false" aria-label="Dark mode"/,
  "The header must contain an accessible theme toggle button");
assert.match(header, /<svg class="icon-moon"[^>]*aria-hidden="true"/, "The moon icon must be decorative");
assert.match(header, /<svg class="icon-sun"[^>]*aria-hidden="true"/, "The sun icon must be decorative");

assert.match(css, /:root\[data-theme=dark\]\{--paper:[^;]+;--ink:[^;]+;--muted:[^;]+;--red:[^;]+;--line:[^;]+;color-scheme:dark\}/,
  "Dark mode must redefine every palette variable");
assert.match(css, /\.theme-toggle \.icon-sun,\[data-theme=dark\] \.theme-toggle \.icon-moon\{display:none\}/,
  "Only one theme icon may be visible at a time");

assert.match(js, /localStorage\.setItem\(THEME_KEY, next\)/, "The chosen theme must be remembered");
assert.match(js, /setAttribute\('aria-pressed'/, "The toggle must expose its state to assistive technology");
