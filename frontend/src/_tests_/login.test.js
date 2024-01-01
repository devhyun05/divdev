import 'isomorphic-fetch';
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { LoginProvider } from '../context/LoginContext';  
import {BrowserRouter} from 'react-router-dom'; 


describe('Login success', () => {
    test('login success with correct credentials', async () => {
        render(
            <BrowserRouter>
                <LoginProvider>
                    <Login />
                </LoginProvider>
            </BrowserRouter>
        );
 
      userEvent.type(screen.getByLabelText(/email address/i), 'devhyun05@gmail.com');
      userEvent.type(screen.getByLabelText(/password/i), '@@AQZswx123'); 
      userEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await Promise.all([
        waitFor(() => {
          const emailError = screen.queryByText(/Email is required/i);
          expect(emailError).not.toBeInTheDocument();
        }),
        waitFor(() => {
          const passwordError = screen.queryByText(/Password is required/i);
          expect(passwordError).not.toBeInTheDocument();
        }),
      ]);
      
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
    

        userEvent.type(screen.getByLabelText(/email address/i), 'devhyun05@gmail.com');


        userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
        await waitFor(() => {
          const emailError = screen.getByText(/Password is required/i);
          expect(emailError).toBeInTheDocument();
        });
    }); 
}); 