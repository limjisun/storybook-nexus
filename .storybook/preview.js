import React from 'react';
import '../src/devextreme.config.js';
import '../src/styles/variables.css';
import '../src/styles/global.css';
import '../src/styles/layout.css';
import '../src/styles/devextreme-custom.css';
import './storybook-custom.css';

// React를 전역에 등록 (classic JSX runtime 환경 대응)
if (typeof window !== 'undefined') {
  window.React = React;
}

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
};

export default preview;