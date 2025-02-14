"use client";
import React, {useState} from 'react';
import prisma from '@/lib/prisma';

const AddRecipePage: React.FC = () => {
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch('/api/recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({url}),
            });
            setMessage('Recipe URL added successfully');
            setUrl('');
        } catch (error) {
            setMessage('Error: ${error.message}');
        }
    };

    return (
        <div className="container">
            <h1>Add a Recipe to Your Cookbook</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter recipe URL"
                    required
                />
                <button type="submit">Add Recipe</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddRecipePage;