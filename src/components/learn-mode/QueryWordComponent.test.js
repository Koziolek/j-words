import { act, fireEvent, render, screen } from '@testing-library/react';
import QueryWordComponent from './QueryWordComponent';
import { getById } from '../../setupTests';

const word = {
  pl: 'auto',
  words: [
    {
      pl: 'auto',
      romanji: 'kuruma',
      part: 'rzeczownik',
      hiragana: 'くるま',
      katakana: '',
      kanji: '車',
      group: '',
      pl_info: 'samochód'
    }
  ]
};

describe('Should query stuff works', () => {
  test('Default action check', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const dom = await act(() => {
      return render(<QueryWordComponent word={word} />);
    });
    expect(screen.getByText(/auto/i)).toBeInTheDocument();
    expect(screen.getByText(/samochód/i)).toBeInTheDocument();
    const input = getById(dom.container, 'answer');
    expect(input).not.toBeNull();
    fireEvent.change(input, { target: { value: 'くる' } });
    fireEvent.submit(input);
    expect(logSpy).toHaveBeenCalledWith('Incorrect! くる');
    fireEvent.change(input, { target: { value: 'くるま' } });
    fireEvent.submit(input);
    expect(logSpy).toHaveBeenCalledWith('Correct!');
  });

  test('Should be incorrect on empty answer', async () => {
    const action = jest.fn();
    const dom = await act(() => {
      return render(<QueryWordComponent word={word} action={action} />);
    });
    expect(screen.getByText(/auto/i)).toBeInTheDocument();
    expect(screen.getByText(/samochód/i)).toBeInTheDocument();
    const input = getById(dom.container, 'answer');
    expect(input).not.toBeNull();
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.submit(input);
    expect(action).toHaveBeenCalledWith(false, '');
  });

  test('Should be incorrect on bad answer', async () => {
    const action = jest.fn();
    const dom = await act(() => {
      return render(<QueryWordComponent word={word} action={action} />);
    });
    const input = getById(dom.container, 'answer');
    expect(input).not.toBeNull();
    fireEvent.change(input, { target: { value: 'そぼ' } });
    fireEvent.submit(input);
    expect(action).toHaveBeenCalledWith(false, 'そぼ');
  });

  test('Should be correct on good answer', async () => {
    const action = jest.fn();
    const dom = await act(() => {
      return render(<QueryWordComponent word={word} action={action} />);
    });
    const input = getById(dom.container, 'answer');
    expect(input).not.toBeNull();
    fireEvent.change(input, { target: { value: 'くるま' } });
    fireEvent.submit(input);
    expect(action).toHaveBeenCalledWith(true, 'くるま');
  });
});
