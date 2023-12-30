import 'isomorphic-fetch';
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { LoginProvider } from '../context/LoginContext';  
import {BrowserRouter} from 'react-router-dom'; 

const backend = "http://localhost:8000" 

describe('Login success', () => {
    test('login success with correct credentials', async () => {
        
      let data = {email: 'devhyun05@gmail.com', password: '@@AQZswx123'}
      
      const response = await fetch(`${backend}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      expect(result.username).toBe('dev_hyun'); 
      });
});

describe('Login fail', () => {
    test('Did not put the email address, and the password', async () => {
        render(
            <BrowserRouter>
                <LoginProvider>
                    <Login />
                </LoginProvider>
            </BrowserRouter>
        );

        // Simulate submitting the form without entering the email
        userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
        // Wait for the error message to appear
        await waitFor(() => {
            const emailError = screen.getByText(/Email is required/i);
            const passwordError = screen.getByText(/Password is required/i);
    
            // Assert that both error messages are present
            expect([emailError, passwordError]).toEqual(expect.arrayContaining([expect.toBeInTheDocument(), expect.toBeInTheDocument()]));
        });
      });

    test('Did not put the email address', async () => {
        render(
            <BrowserRouter>
                <LoginProvider>
                    <Login />
                </LoginProvider>
            </BrowserRouter>
        );
    
        // Do not type the email address
        userEvent.type(screen.getByLabelText(/password/i), '@@AQZswx123');

        // Simulate submitting the form without entering the email
        userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
        // Wait for the error message to appear
        await waitFor(() => {
          const emailError = screen.getByText(/Email is required/i);
          expect(emailError).toBeInTheDocument();
        });
      });

    test('Did not put the password', async () => {
        render(
            <BrowserRouter>
                <LoginProvider>
                    <Login />
                </LoginProvider>
            </BrowserRouter>
        );
    
        // Do not type the email address
        userEvent.type(screen.getByLabelText(/email address/i), 'devhyun05@gmail.com');

        // Simulate submitting the form without entering the email
        userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
        // Wait for the error message to appear
        await waitFor(() => {
          const emailError = screen.getByText(/Password is required/i);
          expect(emailError).toBeInTheDocument();
        });
    }); 
}); 