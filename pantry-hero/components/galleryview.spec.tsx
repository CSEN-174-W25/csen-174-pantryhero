import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Gallery from './galleryview';

describe('Gallery Component', () => {
  it('renders error message when food data is unavailable', () => {
    const invalidData = { food: null };
    render(<Gallery food={invalidData} />);
    expect(screen.getByText(/Error: Data is unavailable/i)).toBeInTheDocument();
  });

  it('renders the correct number of food items', () => {
    const mockFoodData = {
      food: [
        { name: 'Apple', quantity: 10 },
        { name: 'Banana', quantity: 5 },
        { name: 'Orange', quantity: 8 },
      ],
    };
    render(<Gallery food={mockFoodData} />);
    const foodItems = screen.getAllByRole('heading', { level: 3 });
    expect(foodItems).toHaveLength(3);
  });

  it('displays the correct food item details', () => {
    const mockFoodData = {
      food: [
        { name: 'Apple', quantity: 10 },
      ],
    };
    render(<Gallery food={mockFoodData} />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 10')).toBeInTheDocument();
  });

  it('renders nothing if food array is empty', () => {
    const emptyFoodData = { food: [] };
    render(<Gallery food={emptyFoodData} />);
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });
});