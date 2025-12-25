import React, { useEffect, useState } from 'react';
import { getAllReasons } from '../utils/api';
import '../styles/ReasonsWhy.css';

const ReasonsWhy = () => {
    const [reasons, setReasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [flippedCards, setFlippedCards] = useState({});
    const [showConfetti, setShowConfetti] = useState(false);
    const [celebrationMilestone, setCelebrationMilestone] = useState(null);
    const [heartBursts, setHeartBursts] = useState({});

    useEffect(() => {
        fetchReasons();
    }, []);

    const fetchReasons = async () => {
        try {
            const data = await getAllReasons();
            setReasons(data);
        } catch (error) {
            console.error('Error fetching reasons:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleFlip = (id) => {
        const wasFlipped = flippedCards[id];
        
        setFlippedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }));

        // Only show effects when flipping to reveal (not when flipping back)
        if (!wasFlipped) {
            // Trigger heart burst
            setHeartBursts(prev => ({ ...prev, [id]: true }));
            setTimeout(() => {
                setHeartBursts(prev => ({ ...prev, [id]: false }));
            }, 1000);

            // Check for milestones
            const flippedCount = Object.values(flippedCards).filter(Boolean).length + 1;
            if ([25, 50, 75, 100].includes(flippedCount)) {
                setCelebrationMilestone(flippedCount);
                setShowConfetti(true);
                setTimeout(() => {
                    setShowConfetti(false);
                    setCelebrationMilestone(null);
                }, 3000);
            }
        }
    };

    const flippedCount = Object.values(flippedCards).filter(Boolean).length;

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="reasons-why">
            {/* Confetti Animation */}
            {showConfetti && (
                <div className="confetti-container">
                    {[...Array(100)].map((_, i) => (
                        <div
                            key={i}
                            className="confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 0.5}s`,
                                animationDuration: `${2 + Math.random() * 1}s`,
                                backgroundColor: ['#6B2C3E', '#8B4558', '#A65D72', '#FFD4D4', '#FFC9C9', '#FFE5E5'][Math.floor(Math.random() * 6)]
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Milestone Celebration */}
            {celebrationMilestone && (
                <div className="milestone-celebration">
                    <h2 className="milestone-text">🎉 {celebrationMilestone} Reasons Revealed! 🎉</h2>
                </div>
            )}

            <div className="reasons-header">
                <h1 className="reasons-title">100 Reasons Why I Love You</h1>
                <p className="reasons-subtitle">Click each card to reveal a reason</p>
                <p className="reasons-count">{flippedCount} of {reasons.length} reasons revealed</p>
            </div>

            {reasons.length === 0 ? (
                <div className="empty-state">
                    <p>The reasons are being written with love...</p>
                </div>
            ) : (
                <div className="reasons-grid">
                    {reasons.map((reason, index) => (
                        <div
                            key={reason._id}
                            className={`reason-card ${flippedCards[reason._id] ? 'flipped' : ''}`}
                            onClick={() => toggleFlip(reason._id)}
                        >
                            {/* Heart Burst Effect */}
                            {heartBursts[reason._id] && (
                                <div className="heart-burst">
                                    {[...Array(8)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="burst-heart"
                                            style={{
                                                '--angle': `${i * 45}deg`
                                            }}
                                        >
                                            ♥
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="card-inner">
                                <div className={`card-front card-color-${index % 6}`}>
                                    <div className="card-number">{reason.number}</div>
                                    <div className="card-icon">♥</div>
                                    <p className="card-hint">Click to reveal</p>
                                </div>
                                <div className={`card-back card-color-${index % 6}`}>
                                    <div className="sparkles">
                                        <span className="sparkle">✨</span>
                                        <span className="sparkle">✨</span>
                                        <span className="sparkle">✨</span>
                                    </div>
                                    <p className="reason-text">{reason.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReasonsWhy;