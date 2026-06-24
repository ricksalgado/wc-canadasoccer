import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './contact';

describe('Contact Page', () => {
  it('updates form state when inputs change', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/NAME/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/EMAIL ADDRESS/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/MESSAGE/i) as HTMLTextAreaElement;

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(messageInput, 'Hello World');

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(messageInput.value).toBe('Hello World');
  });

  it('submits the form successfully', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/NAME/i);
    const emailInput = screen.getByLabelText(/EMAIL ADDRESS/i);
    const messageInput = screen.getByLabelText(/MESSAGE/i);
    const submitBtn = screen.getByRole('button', { name: /SUBMIT MESSAGE/i });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(messageInput, 'Hello World');

    await userEvent.click(submitBtn);

    expect(screen.getByText(/SENDING/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/THANK YOU/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
