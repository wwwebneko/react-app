import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import SetProfileModal from ".";

jest.mock('../../context/ActiveProfile', () => ({
  useActiveProfileContext: () => ({
    setActiveProfile: jest.fn()
  })
}))

describe('Profile Modal', () => {
  afterEach(cleanup);

  it('should render default value', () => {
    render(<SetProfileModal onModalClose={() => { }} />);
    const button = screen.getByRole('button', { name: 'Add profile' });
    fireEvent.click(button);
    const label = screen.getAllByLabelText('name');
    screen.debug(label);
  })
})
