import type { Preview } from '@storybook/react-vite';
import '../src/tokens.css';
import './preview.css';

// Every component is designed for a phone held in one hand, so the canvas is
// phone-shaped by default. Light and dark are the real OS themes: the tokens
// switch on `prefers-color-scheme`, and the toolbar toggle emulates it.
const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'todo' },
    backgrounds: { disable: true },
  },
  globalTypes: {
    theme: {
      description: 'Colour scheme',
      toolbar: { icon: 'mirror', items: ['light', 'dark'], dynamicTitle: true },
    },
    scale: {
      description: 'Text scale (the app allows up to 1.6×)',
      toolbar: { icon: 'zoom', items: ['1', '1.3', '1.6'], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'light', scale: '1' },
  decorators: [
    (Story, { globals }) => {
      document.documentElement.dataset.theme = globals.theme;
      document.documentElement.style.setProperty('--scale', globals.scale);
      return <Story />;
    },
  ],
};

export default preview;
