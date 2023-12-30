import 'isomorphic-fetch';
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { LoginProvider  } from '../context/LoginContext';
import Register from '../pages/Register'; 

const backend = "http://localhost:8000" 

describe('Register fail', () => {
    // test('Email address empty', async () => {
    //     render(
    //       <BrowserRouter>
    //         <LoginProvider>
    //           <Register />
    //         </LoginProvider>
    //       </BrowserRouter>
    //     );
    
    //     userEvent.click(screen.getByRole('button', { name: /register/i }));
    
    //     await waitFor(() => {
    //         const emailError = screen.getByText(/Email is required/i);

    //         expect(emailError).toBeInTheDocument();
      
    //     });
    //   });
}); 