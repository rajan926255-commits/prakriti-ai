import { render, screen, fireEvent } from '@testing-library/react';
import Wizard from '../../components/calculator/Wizard';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe('Calculator Wizard', () => {
  it('renders step 1 initially', () => {
    render(<Wizard />);
    expect(screen.getByText('How do you get around?')).toBeInTheDocument();
  });

  it('can navigate to next step', () => {
    render(<Wizard />);
    const nextBtn = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);
    expect(screen.getByText('Home Energy Usage')).toBeInTheDocument();
  });
});
