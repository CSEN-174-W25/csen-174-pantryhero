import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BarcodeScanner } from './scanner';

// Mock the `useZxing` hook
jest.mock('react-zxing', () => ({
  useZxing: jest.fn(() => ({
    ref: jest.fn(),
  })),
}));

// Mock the fetch API
global.fetch = jest.fn();

describe('BarcodeScanner Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the video element and default message', () => {
    render(<BarcodeScanner />);
    const videoElement = screen.getByTestId('barcode-video'); // Use test ID for the video element
    expect(videoElement).toBeInTheDocument();
    expect(
      screen.getByText(/No product data available. Scan a barcode to get started./i)
    ).toBeInTheDocument();
  });

  it('displays product details when a valid barcode is scanned', async () => {
    const mockResponse = {
      product: {
        _keywords: ['test', 'product'],
        product_name: 'Test Product',
        product_type: 'Test Type',
        brands: 'Test Brand',
        allergens: 'None',
        status_verbose: 'Available',
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { useZxing } = require('react-zxing');
    useZxing.mockImplementation(({ onDecodeResult }) => {
      onDecodeResult({ getText: () => '123456789' });
      return { ref: jest.fn() };
    });

    render(<BarcodeScanner />);

    await waitFor(() => {
      expect(screen.getByText(/Product Details/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Type/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Brand/i)).toBeInTheDocument();
      expect(screen.getByText(/None/i)).toBeInTheDocument();
      expect(screen.getByText(/Available/i)).toBeInTheDocument();
      expect(screen.getByText(/test, product/i)).toBeInTheDocument();
    });
  });

  it('handles fetch errors gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

    const { useZxing } = require('react-zxing');
    useZxing.mockImplementation(({ onDecodeResult }) => {
      onDecodeResult({ getText: () => '123456789' });
      return { ref: jest.fn() };
    });

    render(<BarcodeScanner />);

    await waitFor(() => {
      expect(
        screen.getByText(/No product data available. Scan a barcode to get started./i)
      ).toBeInTheDocument();
    });
  });
});