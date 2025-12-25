import React, { useState } from 'react';
import '../styles/LandingPage.css';
import { verifySecretCode } from '../utils/api';

const LandingPage = ({ onSuccess }) => {
    const [secretCode, setSecretCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await verifySecretCode(secretCode);
            localStorage.setItem('token', response.token);
            onSuccess();
        } catch (err) {
            setError('Invalid secret code. Try again! 💗');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="landing-page">
            {/* Floating hearts background */}
            <div className="floating-hearts">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="floating-heart" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 15}s`,
                        animationDuration: `${15 + Math.random() * 10}s`,
                        fontSize: `${1 + Math.random() * 1.5}rem`
                    }}>
                        ♥
                    </div>
                ))}
            </div>

            {/* Heart-shaped container */}
            <div className="heart-container">
                <svg className="heart-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="heartGradient" cx="50%" cy="50%">
                            <stop offset="0%" style={{stopColor: '#4A1520', stopOpacity: 1}} />
                            <stop offset="40%" style={{stopColor: '#6B2C3E', stopOpacity: 1}} />
                            <stop offset="70%" style={{stopColor: '#8B4558', stopOpacity: 1}} />
                            <stop offset="100%" style={{stopColor: '#A65D72', stopOpacity: 1}} />
                        </radialGradient>
                    </defs>
                    <path 
                        d="M100,170 C100,170 30,120 30,80 C30,50 50,35 70,35 C85,35 95,45 100,55 C105,45 115,35 130,35 C150,35 170,50 170,80 C170,120 100,170 100,170 Z"
                        fill="url(#heartGradient)"
                        className="heart-path"
                    />
                </svg>
                
                <div className="heart-content">
                    <h1 className="landing-title">Welcome</h1>
                    <p className="landing-subtitle">Enter the secret code to continue</p>
                    
                    <form onSubmit={handleSubmit} className="landing-form">
                        <div className="input-group">
                            <label htmlFor="secretCode">Secret Code</label>
                            <input
                                type="password"
                                id="secretCode"
                                value={secretCode}
                                onChange={(e) => setSecretCode(e.target.value)}
                                placeholder="Enter secret code..."
                                className="secret-input"
                                disabled={loading}
                            />
                        </div>
                        
                        {error && <p className="error-message">{error}</p>}
                        
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Verifying...' : 'Enter'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;