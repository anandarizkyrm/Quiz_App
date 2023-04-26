import App from '../App';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { it, describe } from 'vitest';

describe('Rendered correctly', () => {
  it('Check If The App Render Correctly', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    screen.debug();
  });
});
