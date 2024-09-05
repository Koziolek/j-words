import { act, fireEvent, render, screen } from '@testing-library/react';
import LabeledInputComponent from './LabeledInputComponent';
import { getById } from '../../setupTests';
import { userEvent } from '@testing-library/user-event';

describe('Labeled input tests', () => {
  test('Should be rendered with all params', async () => {
    const action = jest.fn();
    const onEnter = jest.fn();
    const dom = await act(() => {
      return render(
        <LabeledInputComponent
          action={action}
          id="iden"
          text="label text"
          type="text"
          value="val"
          placeholder="placeholder"
          onEnter={onEnter}
        />
      );
    });
    const input = getById(dom.container, 'iden');
    expect(input).not.toBeNull();
    expect(input.value).toEqual('val');
    expect(input.type).toEqual('text');
    expect(input.placeholder).toEqual('placeholder');
    expect(screen.getByText(/label text/i)).toBeInTheDocument();
  });

  test('Should handle on change', async () => {
    const action = jest.fn();
    const onEnter = jest.fn();
    const dom = await act(() => {
      return render(
        <LabeledInputComponent
          action={action}
          id="iden"
          text="label text"
          type="text"
          value="val"
          placeholder="placeholder"
          onEnter={onEnter}
        />
      );
    });
    const input = getById(dom.container, 'iden');
    expect(input).not.toBeNull();
    fireEvent.change(input, { target: { value: 'new val' } });
    expect(action).toHaveBeenCalledTimes(1);
  });

  test('Should handle on submit', async () => {
    const action = jest.fn();
    const onEnter = jest.fn();
    const dom = await act(() => {
      return render(
        <LabeledInputComponent
          action={action}
          id="iden"
          text="label text"
          type="text"
          value="val"
          placeholder="placeholder"
          onEnter={onEnter}
        />
      );
    });
    const input = getById(dom.container, 'iden');
    expect(input).not.toBeNull();
    input.focus();
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
    fireEvent.keyUp(input, { key: 'Enter', keyCode: 13 });
    expect(onEnter).toHaveBeenCalledTimes(1);
  });
});
