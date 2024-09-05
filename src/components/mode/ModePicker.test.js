import { act, fireEvent, render, screen } from '@testing-library/react';
import ModePicker from './ModePicker';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LearnModeComponent from '../learn-mode/LearnModeComponent';

describe('Show and hide', () => {
  beforeEach(function () {
    document.body.innerHTML = '<div id="root"></div>';
  });

  test('Should show help on click', async () => {
    const dom = await act(async () => {
      return render(
        <MemoryRouter initialEntries={[`/`]}>
          <Routes>
            <Route path="/" Component={ModePicker} />
            <Route path="/nauka/:max?" Component={LearnModeComponent} />
          </Routes>
        </MemoryRouter>
      );
    });
    expect(screen.getByText(/Ile słów do nauki?/i)).toBeInTheDocument();
    const openButton = screen.getByText(/Tryb Nauki/i);
    expect(openButton).toBeInTheDocument();
    fireEvent.click(openButton);
    expect(screen.getByText(/Nauka – 15 losowych słów/i)).toBeInTheDocument();
  });
});
