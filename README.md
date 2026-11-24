# Product Management Club

A one-page site for the Product Management Club at Illinois Institute of Technology, made with plain HTML, CSS, and JavaScript.

## Preview

Open `index.html` in a browser. No build step or server is needed. The page uses relative paths, so it also works from a GitHub Pages repository URL.

## Update the workshop

The workshop title, description, date, location, and agenda are written directly in `index.html` in the Events section. Edit those text elements to update the event. The navigation menu behavior is in `script.js`; visual styles are in `styles.css`.

## Day and night mode

The moon/sun button in the header switches between the light and dark themes. On a first visit the site follows the visitor's operating-system setting; once they pick a theme it is saved in `localStorage` and reused on later visits. Dark-mode colors are the `[data-theme=dark]` rules at the end of `styles.css`, and the toggle logic is at the end of `script.js`.

## Tests

Run the static checks with Node.js (no install needed):

```sh
node tests/footer.test.js && node tests/theme.test.js
```

## Publish with GitHub Pages

1. Push these files to the repository’s `main` branch.
2. In the repository on GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select **main** and the **/(root)** folder, then save.
5. Wait for GitHub Pages to publish the site. The page will be available at the repository’s Pages URL.
