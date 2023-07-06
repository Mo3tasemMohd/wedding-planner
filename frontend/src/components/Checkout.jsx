import React, { useState } from 'react';
import { BASE_URL } from '../config/dataService';

export function Checkout(props) {
    let { pack_id } = props
    let { checkout } = props
    console.log(pack_id)
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/package/${pack_id}/checkout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                // Add any additional data you need to pass to the backend here
            }),
        });
        const data = await response.json();
        if (response.ok) {
            // Redirect the user to the Stripe checkout page
            window.location.href = data.url;
            // Save the session ID for later use
            localStorage.setItem('sessionId', data.session_id);
        } else {
            setError(data.error);
        }
    };

    // Add an event listener to listen for the Stripe checkout session completed event
    window.addEventListener('popstate', async () => {
        // Retrieve the session ID from localStorage
        const sessionId = localStorage.getItem('sessionId');
        // Retrieve the checkout session object from the Stripe API
        const session = await fetch(`${BASE_URL}/stripe/session/${sessionId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const sessionData = await session.json();
        // Check if the transaction was successful
        if (sessionData.status === 'completed') {
            // Show a pop-up message
            let token = localStorage.getItem('token')
            sessionData = null
            let response = await fetch(`http://127.0.0.1:8000/package/${pack_id}/empty-package/`,
                {
                    "method": `DELETE`,
                    "headers": {
                        'Authorization': "Bearer " + token,
                        'Content-Type': 'application/json'
                    }
                }
            )
            alert('Transaction completed successfully!');
            // Redirect the user to the home page
            window.location.href = '/';
        } else {
            // Redirect the user to the home page
            sessionData = null

            window.location.href = '/';
        }
    });

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <button type="submit">
                    Checkout
                </button>
            </form>
            {error && <p>{error}</p>}
        </section>
    );
}