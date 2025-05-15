import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to Stream Radar</h1>
            <p>Your one-stop destination to discover trending movies and tv shows.</p>
            <Link to="/movie-explorer">
                <button 
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Explore the Collection
                </button>
            </Link>
        </div>
    );
};

export default HomePage;