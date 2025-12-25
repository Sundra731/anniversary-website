import React, { useEffect, useState } from 'react';
import '../styles/WelcomePage.css';

const WelcomePage = ({ onContinue }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="welcome-page">
            {/* Animated dancing cat */}
            <div className="dancing-cat">
                <div className="cat-body">
                    <div className="cat-head">
                        <div className="cat-ear cat-ear-left"></div>
                        <div className="cat-ear cat-ear-right"></div>
                        <div className="cat-face">
                            <div className="cat-eyes">
                                <div className="cat-eye"></div>
                                <div className="cat-eye"></div>
                            </div>
                            <div className="cat-nose"></div>
                            <div className="cat-mouth"></div>
                        </div>
                    </div>
                    <div className="cat-torso"></div>
                    <div className="cat-legs">
                        <div className="cat-leg"></div>
                        <div className="cat-leg"></div>
                    </div>
                    <div className="cat-tail"></div>
                </div>
            </div>

            {/* Floating hearts decoration */}
            <div className="floating-decorations">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="floating-decoration" style={{
                        left: `${10 + i * 15}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + Math.random() * 2}s`
                    }}>
                        ♥
                    </div>
                ))}
            </div>

            <div className={`welcome-content ${isVisible ? 'fade-in' : ''}`}>
                <h1 className="welcome-title">Welcome, My Love</h1>
                <p className="welcome-message">
                    I created this special place just for you...
                </p>
                <p className="welcome-subtitle">
                    A collection of memories, reasons, dreams, and love letters
                </p>

                <button onClick={onContinue} className="continue-btn">
                    Enter Our World
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;