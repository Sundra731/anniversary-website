import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import '../styles/SectionNavigation.css';

const SectionNavigation = ({ currentIndex, totalSections, onNavigate }) => {
    const sections = [
        'Our Story',
        '100 Reasons Why',
        'Love Letters',
        'Our Music',
        'Quiz'
    ];

    const handlePrevious = () => {
        if (currentIndex > 0) {
        onNavigate(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < totalSections - 1) {
        onNavigate(currentIndex + 1);
        }
    };

    return (
        <>
        {/* Header at Top */}
        <div className="page-header">
            <div className="header-content">
            <h2 className="site-title">Happy Anniversary!</h2>
            <div className="progress-indicator">
                <span className="current-section">{sections[currentIndex]}</span>
                <span className="section-counter">{currentIndex + 1} of {totalSections}</span>
            </div>
            </div>
            <div className="header-dark-mode">
            <DarkModeToggle />
            </div>
        </div>

      {/* Floating Navigation Buttons */}
        <div className="floating-nav">
            <button
            className="floating-btn prev-btn"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label="Previous section"
            >
            <ChevronLeft size={28} />
            </button>

        <button
            className="floating-btn next-btn"
            onClick={handleNext}
            disabled={currentIndex === totalSections - 1}
            aria-label="Next section"
            >
            <ChevronRight size={28} />
            </button>
        </div>
        </>
    );
};

export default SectionNavigation;