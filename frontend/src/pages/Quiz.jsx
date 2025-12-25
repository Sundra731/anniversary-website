import React, { useState, useEffect } from 'react';
import { submitQuizAnswers, getAllQuizAnswers } from '../utils/api';
import '../styles/Quiz.css';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [savedAnswers, setSavedAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const questions = [
        {
            id: 1,
            question: "What's your favorite memory of us together?",
            type: "text",
            placeholder: "Tell me about that special moment..."
        },
        {
            id: 2,
            question: "Do you see us together in the next 10 years? Explain your answer.",
            type: "text",
            placeholder: "Share your thoughts..."
        },
        {
            id: 3,
            question: "Are you genuinely happy with me kevvyy? Be honest.",
            type: "text",
            placeholder: "I want to know..."
        },
        {
            id: 4,
            question: "Why do you think we do not make a good team?",
            type: "text",
            placeholder: "Your honest opinion..."
        },
        {
            id: 5,
            question: "What is it that I can do to make this relationship better on your part? Or what can I improve on or change? Usiseme hakuna please.",
            type: "text",
            placeholder: "Sema hakuna ushangae..."
        },
        {
            id: 6,
            question: "What activity would you like us to do together like so much in our second season(year)?",
            type: "text",
            placeholder: "Think usiseme hakuna..."
        },
        {
            id: 7,
            question: "What's your favorite thing we do together?",
            type: "text",
            placeholder: "I love when we..."
        },
        {
            id: 8,
            question: "What's one dream you want us to achieve together?",
            type: "text",
            placeholder: "Dream big with me..."
        },
        {
            id: 9,
            question: "On a scale of 1-10, how much do you love my cooking?",
            type: "text",
            placeholder: "Be honest..."
        },
        {
            id: 10,
            question: "What makes you feel most loved by me?",
            type: "text",
            placeholder: "Tell me what matters most..."
        }
    ];

    useEffect(() => {
        fetchAnswers();
    }, []);

    const fetchAnswers = async () => {
        try {
            const data = await getAllQuizAnswers();
            setSavedAnswers(data);
        } catch (error) {
            console.error('Error fetching answers:', error);
        }
    };

    const handleAnswerChange = (value) => {
        setAnswers({
            ...answers,
            [currentQuestion]: value
        });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const answersArray = questions.map((q, index) => ({
                question: q.question,
                answer: answers[index] || '',
                questionType: q.type
            }));

            await submitQuizAnswers(answersArray);
            setSubmitted(true);
            setShowConfetti(true);
            setShowPopup(true);
            
            setTimeout(() => {
                setShowConfetti(false);
            }, 4000);

            await fetchAnswers();
        } catch (error) {
            console.error('Error submitting quiz:', error);
        } finally {
            setLoading(false);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const currentQ = questions[currentQuestion];
    const isAnswered = answers[currentQuestion];

    if (showResults) {
        return (
            <div className="quiz">
                <div className="quiz-container results-view">
                    <button 
                        className="back-to-quiz-btn"
                        onClick={() => setShowResults(false)}
                    >
                        ← Back to Quiz
                    </button>
                    
                    <h1 className="quiz-title">Quiz Results 💕</h1>
                    <p className="results-subtitle">Here's what you answered:</p>

                    {savedAnswers.length === 0 ? (
                        <div className="no-results">
                            <p>No answers yet! Take the quiz first! 🎯</p>
                        </div>
                    ) : (
                        <div className="results-grid">
                            {savedAnswers.map((answer, index) => (
                                <div key={answer._id} className="result-card">
                                    <div className="result-number">Q{Math.floor(index / 10) * 10 + (index % 10) + 1}</div>
                                    <h3 className="result-question">{answer.question}</h3>
                                    <p className="result-answer">{answer.answer}</p>
                                    <span className="result-date">
                                        {new Date(answer.answeredAt).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="quiz">
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

            {/* Sweet Pop-up Message */}
            {showPopup && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-heart">💗</div>
                        <h2 className="popup-title">You're Absolutely Amazing!</h2>
                        <p className="popup-message">
                            Thank you so much for everything❤️. 
                            You're amazing and you mean everything to me.
                            I love you so so so much Hubby!
                        </p>
                        <p className="popup-message-highlight">
                            Happy One Year Anniversary baby! 💕✨
                        </p>
                        <div className="popup-buttons">
                            <button className="popup-btn primary" onClick={closePopup}>
                                Close 💖
                            </button>
                            <button 
                                className="popup-btn secondary" 
                                onClick={() => {
                                    closePopup();
                                    setShowResults(true);
                                }}
                            >
                                View Answers
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="quiz-container">
                {!submitted ? (
                    <>
                        <div className="quiz-header">
                            <h1 className="quiz-title">Our Little Quiz 💕</h1>
                            <p className="quiz-subtitle">Answer these fun questions about us!</p>
                            
                            {savedAnswers.length > 0 && (
                                <button 
                                    className="view-results-btn"
                                    onClick={() => setShowResults(true)}
                                >
                                    View Past Answers 👀
                                </button>
                            )}
                        </div>

                        {/* Progress Bar */}
                        <div className="progress-container">
                            <div className="progress-bar-fill">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="progress-text">
                                Question {currentQuestion + 1} of {questions.length}
                            </p>
                        </div>

                        {/* Question Card */}
                        <div className="question-card">
                            <div className="question-number">#{currentQuestion + 1}</div>
                            <h2 className="question-text">{currentQ.question}</h2>

                            {currentQ.type === 'text' ? (
                                <textarea
                                    className="text-answer"
                                    placeholder={currentQ.placeholder}
                                    value={answers[currentQuestion] || ''}
                                    onChange={(e) => handleAnswerChange(e.target.value)}
                                    rows={4}
                                />
                            ) : (
                                <div className="choice-options">
                                    {currentQ.options.map((option, index) => (
                                        <button
                                            key={index}
                                            className={`choice-btn ${answers[currentQuestion] === option ? 'selected' : ''}`}
                                            onClick={() => handleAnswerChange(option)}
                                        >
                                            <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="quiz-navigation">
                            <button
                                className="nav-btn prev-btn"
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0}
                            >
                                ← Previous
                            </button>

                            {currentQuestion === questions.length - 1 ? (
                                <button
                                    className="nav-btn submit-btn"
                                    onClick={handleSubmit}
                                    disabled={!isAnswered || loading}
                                >
                                    {loading ? 'Submitting...' : 'Submit Quiz 💕'}
                                </button>
                            ) : (
                                <button
                                    className="nav-btn next-btn"
                                    onClick={handleNext}
                                    disabled={!isAnswered}
                                >
                                    Next →
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="success-message">
                        <div className="success-icon">🎉</div>
                        <h2 className="success-title">Quiz Submitted!</h2>
                        <p className="success-text">
                            Your answers have been saved. Click below to take the quiz again or view your responses!
                        </p>
                        <div className="success-buttons">
                            <button 
                                className="retake-btn"
                                onClick={() => {
                                    setSubmitted(false);
                                    setCurrentQuestion(0);
                                    setAnswers({});
                                }}
                            >
                                Take Quiz Again
                            </button>
                            <button 
                                className="view-results-btn"
                                onClick={() => setShowResults(true)}
                            >
                                View Your Answers
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;