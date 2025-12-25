import React, { useState } from 'react';
import SectionNavigation from '../components/SectionNavigation';
import OurStory from './OurStory';
import ReasonsWhy from './ReasonsWhy';
import LoveLetters from './LoveLetters';
import Music from './Music';
import Quiz from './Quiz';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [currentSection, setCurrentSection] = useState(0);

    const sections = [
        { id: 'story', component: <OurStory /> },
        { id: 'reasons', component: <ReasonsWhy /> },
        { id: 'letters', component: <LoveLetters /> },
        { id: 'music', component: <Music /> },
        { id: 'quiz', component: <Quiz /> },
    ];

    const handleNavigate = (index) => {
        setCurrentSection(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="dashboard">
            <SectionNavigation
                currentIndex={currentSection}
                totalSections={sections.length}
                onNavigate={handleNavigate}
            />
            <main className="dashboard-content">
                {sections[currentSection].component}
            </main>
        </div>
    );
};

export default Dashboard;