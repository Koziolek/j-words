import { act, fireEvent, render, screen } from '@testing-library/react';
import HelpComponent from './HelpComponent';

describe('Show and hide', () => {
  beforeEach(function () {
    document.body.innerHTML = '<div id="root"></div>';
  });

  test('Should show help on click', async () => {
    const wordService = require('../word/WordsService');
    jest.spyOn(wordService, 'numberOfWords').mockImplementation(() => Promise.resolve(10));
    const dom = await act(async () => {
      return render(<HelpComponent />);
    });
    const openButton = screen.getByText(/Pomoc/i);
    expect(openButton).toBeInTheDocument();
    fireEvent.click(openButton);
    expect(screen.getByText(/Obecnie mamy 10 nie unikalnych słów./i)).toBeInTheDocument();

    const closeButton = screen.getByText('Zamknij');
    fireEvent.click(closeButton);
    expect(await screen.queryByText(/Obecnie mamy 10 nie unikalnych słów./i)).toBeNull();
  });
});
