# skeuomorphic-ui

Touch-first React primitives for small, one-handed apps: screens with sticky
headers, surface rows with a pencil, bottom sheets, chips, a segmented control.
Extracted from a shopping-list PWA; nothing in here knows what a shop is.

## Using it

The package ships **source**, not a build. The consumer's bundler (Vite is what
it is tested with) compiles the `.tsx` and CSS Modules directly, so there is no
dist to keep in sync while the look is still moving.

```sh
pnpm add github:<user>/skeuomorphic-ui#<commit-sha>
```

Pin to a commit; there are no version tags yet. Then, once, in the app's entry:

```ts
import 'skeuomorphic-ui/tokens.css';
```

and anywhere:

```tsx
import { Screen, ScreenHeader, ScreenBody, Row, Badge } from 'skeuomorphic-ui';
```

`react` and `react-dom` 19 are peer dependencies. If the consumer's test runner
is Vitest, it needs to be told to compile this package rather than load it as
plain Node modules:

```ts
test: { server: { deps: { inline: ['skeuomorphic-ui'] } } }
```

## Rules the components keep

- **Everything is `rem`.** Set `--scale` on `:root` and the whole layout
  follows; the font scale is expected to go to 1.6×. No fixed pixel heights on
  anything holding text.
- **Colour is never the only signal.** A pressed chip gets a tick as well as a
  fill; a checked box gets a mark; a destructive action gets the word.
- **Colours are raw hex in, derived at render.** `Monogram` and the row accent
  take a hex and work out the readable foreground themselves.
- **Safe areas are the header's and bar's problem.** `ScreenHeader` pads
  itself for the status bar; `BottomBar` and `Sheet` for the home indicator.
  The page body must not add its own top padding or a sticky header will sit
  below the island with content scrolling under it.
- **`touch-action: manipulation`** on every button, so a fast double tap is
  never turned into a zoom.

## Developing

```sh
pnpm install
pnpm dev      # Storybook on :6006
pnpm lint     # eslint + tsc
pnpm build    # static Storybook into storybook-static/
```

The Storybook toolbar has a light/dark toggle and a text-scale toggle; check
new work at 1.6× before calling it done.

To work on this and a consumer at once, link it instead of installing it:

```sh
cd ../the-app && pnpm link ../skeuomorphic-ui
```

and swap back to the pinned `github:` spec before releasing the consumer.

## Layout of `src/`

| File          | Exports                                                       |
| ------------- | ------------------------------------------------------------- |
| `Screen.tsx`  | `Screen`, `ScreenHeader`, `ScreenBody`, `BottomBar`, `Empty`  |
| `Row.tsx`     | `Row` (+ `.Main .Content .Action .Edit .Text .Name .Meta .Grip .Chevron .Body .Actions .Button`), `CheckRow`, `Badge`, `Monogram` |
| `Button.tsx`  | `Button`, `Chip`, `Chips`, `Segmented`                        |
| `Field.tsx`   | `Field`, `Input`, `Select`, `InlineForm`, `AddForm`           |
| `Text.tsx`    | `Hint`, `SectionTitle`, `VisuallyHidden`                      |
| `Sheet.tsx`   | `Sheet`, `InlineField`                                        |
| `Menu.tsx`    | `Menu`, `MenuAction`, `MenuFooter`                            |
| `Toast.tsx`   | `Toast`                                                       |
| `icons.tsx`   | `PencilIcon`, `MoreIcon`                                      |
| `tokens.css`  | the design tokens; import once                                |
