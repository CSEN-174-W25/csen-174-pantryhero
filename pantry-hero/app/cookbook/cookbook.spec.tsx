import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddRecipePage from './page';

describe('AddRecipePage Component', () => {
    beforeEach(() => {
        // Mock the fetch function
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
            })
        ) as jest.Mock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('renders the component correctly', () => {
        render(<AddRecipePage />);
        
        // Check if the heading is rendered
        expect(screen.getByText('Add a Recipe to Your Cookbook')).toBeInTheDocument();
        
        // Check if the input field and button are rendered
        expect(screen.getByPlaceholderText('Enter recipe URL')).toBeInTheDocument();
        expect(screen.getByText('Add Recipe')).toBeInTheDocument();
    });

    it('updates the input value when typing', () => {
        render(<AddRecipePage />);
        
        const input = screen.getByPlaceholderText('Enter recipe URL') as HTMLInputElement;
        
        // Simulate typing into the input field
        fireEvent.change(input, { target: { value: 'https://example.com/recipe' } });
        
        // Check if the input value is updated
        expect(input.value).toBe('https://example.com/recipe');
    });

    it('displays a success message after form submission', async () => {
        render(<AddRecipePage />);
        
        const input = screen.getByPlaceholderText('Enter recipe URL') as HTMLInputElement;
        const button = screen.getByText('Add Recipe');
        
        // Simulate typing into the input field
        fireEvent.change(input, { target: { value: 'https://example.com/recipe' } });
        
        // Simulate form submission
        fireEvent.click(button);
        
        // Check if the success message is displayed
        expect(await screen.findByText('Recipe URL added successfully')).toBeInTheDocument();
    });
});