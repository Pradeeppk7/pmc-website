# Compact Semantic Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an accessible, conflict-free compact footer layout to the existing plain HTML/CSS site.

**Architecture:** Keep the existing three-part footer markup and CSS visual language, add explicit accessibility markup to the brand and decorative arrow, and refine the existing mobile flex rules so the footer never overflows.

**Tech Stack:** HTML5, CSS, Node.js built-in `assert` and `fs` for a no-dependency static verification script.

---

### Task 1: Add a failing footer verification

**Files:**
- Create: `tests/footer.test.js`

- [ ] **Step 1: Create the static footer test**

```javascript
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

const mobileRule = css.match(/@media\(max-width:700px\)\{[\s\S]*?\}\n@media\(prefers-reduced-motion/);
assert.ok(mobileRule, "A mobile footer CSS rule must exist");
assert.match(mobileRule[0], /\.site-footer\{margin:0 21px;padding:20px 0;gap:14px;flex-wrap:wrap\}/,
  "The mobile footer must preserve compact wrapping");
assert.match(mobileRule[0], /\.site-footer>span\{order:3;width:100%;font-size:8px\}/,
  "The organization name must wrap on its own mobile row");
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node tests/footer.test.js`

Expected: `AssertionError` because the footer brand lacks `aria-label` and the Back to Top arrow is not wrapped in an `aria-hidden` span.

### Task 2: Implement the footer semantics and mobile layout

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

- [ ] **Step 1: Update the footer markup**

Change the footer line in `index.html` to:

```html
<footer class="site-footer"><a class="brand" href="#top" aria-label="PMC home">PMC<span>.</span></a><span>PRODUCT MANAGEMENT CLUB &#183; ILLINOIS INSTITUTE OF TECHNOLOGY</span><a href="#top" class="back-top">BACK TO TOP <span aria-hidden="true">&#8593;</span></a></footer>
```

- [ ] **Step 2: Confirm the mobile CSS rule remains explicit**

Keep the existing rule in `styles.css`:

```css
.site-footer{margin:0 21px;padding:20px 0;gap:14px;flex-wrap:wrap}.site-footer>span{order:3;width:100%;font-size:8px}.back-top{font-size:8px}
```

No additional desktop or navigation styles are needed.

### Task 3: Verify and commit

**Files:**
- Verify: `tests/footer.test.js`
- Verify: `index.html`
- Verify: `styles.css`

- [ ] **Step 1: Run the footer test**

Run: `node tests/footer.test.js`

Expected: exit code `0` with no output.

- [ ] **Step 2: Check the HTML/CSS diff**

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 3: Commit the implementation**

```bash
git add index.html styles.css tests/footer.test.js
git commit -m "feat: refine accessible footer layout"
```
