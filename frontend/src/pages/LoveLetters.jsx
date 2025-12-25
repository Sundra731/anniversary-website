import React, { useEffect, useState } from 'react';
import { getAllLoveLetters } from '../utils/api';
import { Heart, Calendar } from 'lucide-react';
import '../styles/LoveLetters.css';

const LoveLetters = () => {
    const [letters, setLetters] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showHearts, setShowHearts] = useState(false);

    useEffect(() => {
        fetchLetters();
    }, []);

    const fetchLetters = async () => {
        try {
            const data = await getAllLoveLetters();
            setLetters(data);
            if (data.length > 0) {
                setSelectedLetter(data[0]);
            }
        } catch (error) {
            console.error('Error fetching love letters:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLetterSelect = (letter) => {
        setSelectedLetter(letter);
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 1500);
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="love-letters">
            {/* Floating hearts animation */}
            <div className="floating-decorations">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="floating-heart" style={{
                        left: `${10 + i * 12}%`,
                        animationDelay: `${i * 0.7}s`,
                        animationDuration: `${4 + Math.random() * 2}s`
                    }}>
                        ♥
                    </div>
                ))}
            </div>

            {/* Heart burst when selecting letter */}
            {showHearts && (
                <div className="heart-celebration">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="celebration-heart"
                            style={{
                                '--angle': `${i * 30}deg`,
                                animationDelay: `${i * 0.05}s`
                            }}
                        >
                            💗
                        </div>
                    ))}
                </div>
            )}

            <div className="letters-header">
                <h1 className="letters-title">Love Letters</h1>
                <p className="letters-subtitle">Words from my heart to yours</p>
            </div>

            {letters.length === 0 ? (
                <div className="empty-state">
                    <Heart size={48} className="empty-heart" />
                    <p>Love letters are being written with care...</p>
                </div>
            ) : (
                <div className="letters-container">
                    {/* Letter Selection */}
                    <div className="letters-sidebar">
                        {letters.map((letter, index) => (
                            <button
                                key={letter._id}
                                className={`letter-preview letter-preview-${index % 4} ${selectedLetter?._id === letter._id ? 'active' : ''}`}
                                onClick={() => handleLetterSelect(letter)}
                            >
                                <Heart size={20} className="preview-heart" />
                                <div className="preview-content">
                                    <h3 className="preview-title">{letter.title}</h3>
                                    {letter.date && (
                                        <span className="preview-date">
                                            <Calendar size={14} />
                                            {letter.date}
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Selected Letter Display */}
                    {selectedLetter && (
                        <div className="letter-display">
                            <div className="letter-paper">
                                {/* Decorative elements */}
                                <div className="paper-decoration top-left">✿</div>
                                <div className="paper-decoration top-right">✿</div>
                                <div className="paper-decoration bottom-left">♥</div>
                                <div className="paper-decoration bottom-right">♥</div>
                                
                                <div className="letter-header-content">
                                    <h2 className="letter-title">{selectedLetter.title}</h2>
                                    {selectedLetter.date && (
                                        <p className="letter-date">
                                            <Calendar size={16} />
                                            {selectedLetter.date}
                                        </p>
                                    )}
                                </div>
                                <div className="letter-body">
                                    <p className="letter-text">{selectedLetter.content}</p>
                                </div>
                                <div className="letter-footer">
                                    <p className="letter-signature">With all my love,</p>
                                    <p className="letter-sender">Your Love ♥</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LoveLetters;