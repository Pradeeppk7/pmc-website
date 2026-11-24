# Compact Semantic Footer Design

## Goal

Refine the existing site footer without changing its content or introducing new
navigation.

## Approved Scope

The footer contains exactly these three parts:

1. PMC brand link to `#top`
2. Product Management Club and Illinois Institute of Technology name text
3. Back to Top link to `#top`

The footer will not include copyright text or additional navigation links.

## Structure

The existing `<footer class="site-footer">` remains the footer landmark. Use
direct semantic elements for the brand link, organization text, and Back to Top
link. The organization text will remain visible and will use the existing text
styling class.

The brand link will retain an accessible label such as `PMC home`. The Back to
Top link will retain readable link text and an arrow icon marked as
`aria-hidden="true"` if the arrow is decorative.

## Layout

### Desktop

- Keep the footer aligned inside the existing `1088px` max-width container.
- Place the brand at the left, organization text at the center, and Back to Top
  at the right.
- Preserve the existing border, vertical padding, monospace name treatment, and
  editorial color palette.

### Mobile

- Keep the footer within the existing `21px` page margin.
- Preserve a compact wrap: the brand and Back to Top remain on the first row,
  and the organization text moves to the next row at full width.
- Prevent text overlap and preserve a readable gap between items.

## Accessibility

- Preserve the footer landmark and link destinations.
- Ensure keyboard focus remains visible through the existing global focus styles.
- Do not add redundant accessible text for decorative marks.
- Reuse the existing skip-to-top and anchor behavior without JavaScript.

## CSS

The implementation should retain the existing `.site-footer`,
`.site-footer > span`, and `.back-top` selectors. Layout changes should use
the current flex pattern unless a specific conflict requires grid. Mobile
behavior belongs in the existing `@media (max-width:700px)` rule.

## Validation

- The desktop footer preserves three aligned areas.
- The mobile footer wraps without overlap or horizontal overflow.
- Brand and Back to Top links work and remain keyboard accessible.
- The page keeps the existing plain HTML/CSS/JavaScript structure and no build
  step is required.
