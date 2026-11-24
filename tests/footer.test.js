const assert = require("node:assert/strict");
const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("styles.css", "utf8");

const footerMatch = html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/);
assert.ok(footerMatch, "A .site-footer landmark must exist");

const footer = footerMatch[0];
assert.match(footer, /<a class="brand" href="#top" aria-label="PMC home">/,
  "The footer brand link must have an accessible label");
assert.match(footer, /<span>PRODUCT MANAGEMENT CLUB &#183; ILLINOIS INSTITUTE OF TECHNOLOGY<\/span>/,
  "The footer must retain the compact organization name");
assert.match(footer, /<a href="#top" class="back-top">BACK TO TOP <span aria-hidden="true">&#8593;<\/span><\/a>/,
  "The Back to Top arrow must be decorative and inaccessible");

assert.match(css, /\.site-footer>.brand,\.site-footer>.back-top\{flex:1\}/,
  "The footer side areas must share equal width for a centered organization name");

const mobileRule = css.match(/@media\(max-width:700px\)\{[\s\S]*?(?=@media\(prefers-reduced-motion)/);
assert.ok(mobileRule, "A mobile footer CSS rule must exist");
assert.match(mobileRule[0], /\.site-footer\{margin:0 21px;padding:20px 0;gap:14px;flex-wrap:wrap\}/,
  "The mobile footer must preserve compact wrapping");
assert.match(mobileRule[0], /\.site-footer>span\{order:3;width:100%;font-size:8px\}/,
  "The organization name must wrap on its own mobile row");
