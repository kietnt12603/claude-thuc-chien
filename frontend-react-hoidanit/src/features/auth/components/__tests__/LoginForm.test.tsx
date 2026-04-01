import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as useLoginHook from '../../hooks/useLogin';

// Mock the hook
vi.mock('../../hooks/useLogin', () => ({
  useLogin: vi.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('LoginForm', () => {
  it('should render email and password fields', () => {
    (useLoginHook.useLogin as any).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });

    renderWithProviders(<LoginForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument();
  });

  it('should show validation errors on invalid input', async () => {
    (useLoginHook.useLogin as any).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });

    renderWithProviders(<LoginForm onSubmit={vi.fn()} />);

    // Trigger validation
    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(screen.getByText(/email không hợp lệ/i)).toBeInTheDocument();
      expect(screen.getByText(/mật khẩu không được để trống/i)).toBeInTheDocument();
    });
  });

  it('should call login mutation on valid submission', async () => {
    const mockOnSubmit = vi.fn();
    (useLoginHook.useLogin as any).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });

    renderWithProviders(<LoginForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/mật khẩu/i), {
      target: { value: 'password123' },
    });

    // Use fireEvent.click on submit button which is standard for RHF testing
    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      const calls = mockOnSubmit.mock.calls;
      const data = calls[0][0];
      expect(data.email).toBe('test@example.com');
      expect(data.password).toBe('password123');
    });
  });
});
