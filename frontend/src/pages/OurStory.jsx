import React, { useEffect, useState } from 'react';
import { getAllStories } from '../utils/api';
import '../styles/OurStory.css';

const OurStory = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeStory, setActiveStory] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [displayedText, setDisplayedText] = useState({});

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            const data = await getAllStories();
            setStories(data);
        } catch (error) {
            console.error('Error fetching stories:', error);
        } finally {
            setLoading(false);
        }
    };

    // Typewriter effect for story description
    useEffect(() => {
        if (activeStory !== null && stories[activeStory]) {
            const story = stories[activeStory];
            const text = story.description;
            let currentIndex = 0;

            const interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayedText(prev => ({
                        ...prev,
                        [story._id]: text.substring(0, currentIndex)
                    }));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 30); // Speed of typing

            return () => clearInterval(interval);
        }
    }, [activeStory, stories]);

    // Trigger confetti when story changes
    const handleStoryClick = (index) => {
        if (activeStory !== index) {
            setShowConfetti(true);
            setActiveStory(index);
            
            setTimeout(() => {
                setShowConfetti(false);
            }, 2000);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="our-story">
            {/* Confetti Animation */}
            {showConfetti && (
                <div className="confetti-container">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 0.5}s`,
                                animationDuration: `${2 + Math.random() * 1}s`,
                                backgroundColor: ['#6B2C3E', '#8B4558', '#A65D72', '#FFD4D4', '#FFC9C9'][Math.floor(Math.random() * 5)]
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="story-header">
                <h1 className="story-title">Our Story</h1>
                <p className="story-subtitle">The beautiful journey of us</p>
            </div>

            {stories.length === 0 ? (
                <div className="empty-state">
                    <p>No stories yet. We'll add our memories soon!</p>
                </div>
            ) : (
                <div className="timeline">
                    {stories.map((story, index) => (
                        <div
                            key={story._id}
                            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                            onClick={() => handleStoryClick(index)}
                        >
                            <div className={`timeline-content sticky-note ${activeStory === index ? 'active' : ''}`}>
                                <div className="sticky-note-pin"></div>
                                <div className="timeline-date">{story.date}</div>
                                <h3 className="timeline-title">{story.title}</h3>
                                <p className="timeline-description">
                                    {activeStory === index
                                        ? displayedText[story._id] || ''
                                        : story.description}
                                </p>
                                {activeStory === index && displayedText[story._id]?.length < story.description.length && (
                                    <span className="typing-cursor">|</span>
                                )}
                            </div>
                            <div className="timeline-dot"></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OurStory;