import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage";

function TestComponent () {
  const [value, setValue] = useLocalStorage('key', 'default');

  return (
    <p>
      <span>{typeof value === 'object' ? value.key : value}</span>
      <button onClick={() => setValue('value')}>set primitive value</button>
      <button aria-label='test' onClick={() => setValue({key: 'complex value'})}>set complex value</button>
    </p>
  )
}

describe('useLocalStorage', () => {
  afterEach(cleanup);
  afterEach(() => localStorage.removeItem('key'));

  it.skip('should render default value', () => {
    render(<TestComponent />)
    expect(screen.getByText('default')).toBeInTheDocument();
  })

  it.skip('should save default value to local storage', () => {
    render(<TestComponent />);
    expect(localStorage.getItem('key')).toEqual(JSON.stringify('default'));
  })

  it.skip('should set primitive value on setValue', () => {
    render(<TestComponent />);
    const button = screen.getByText('set primitive value');
    fireEvent.click(button);
    expect(screen.getByText('value')).toBeInTheDocument();
  })

  it.skip('should set complex value on setValue', () => {
    render(<TestComponent />);
    const button = screen.getByText('set complex value');
    fireEvent.click(button);
    expect(screen.getByText('complex', {exact: false})).toBeInTheDocument();
  })

  it.skip('should update local storage correspondingly ', () => {
    render(<TestComponent />);
    const button = screen.getByText('set primitive value');
    expect(localStorage.getItem('key')).toEqual(JSON.stringify('default'));
    fireEvent.click(button);
    expect(localStorage.getItem('key')).toEqual(JSON.stringify('value'));
  })
})
