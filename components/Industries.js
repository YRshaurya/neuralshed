'use client';

import { useState } from 'react';

const tabData = [
    {
        id: 'education',
        title: 'Education',
        heading: 'Engaging learning',
        description: [
            'The use of robots is rapidly becoming more commonplace all around us – in our workplaces, our homes, and even in our schools.',
            'The use of robots and simulation technologies have proven themselves to be worthy components of available educational resources.',
            'These technologies use in the education environment have shown their value in everyday learning and in the specialized education of students with disabilities.'
        ],
        image: './images/education-feature.jpg'
    },
    {
        id: 'healthcare',
        title: 'Healthcare',
        heading: 'Robots in Healthcare',
        description: [
            'Robots are becoming a part of life. It is making our life very easy as well as comfortable.',
            'Robotics in healthcare is taking place of humans as humans are trusting the robots for taking the food from one place to the other or for engaging the patients in some mental and physical exercise.',
            'The potential for robots in healthcare is vast. Just like in our every-day lives, they are increasingly a part of our healthcare eco-system.'
        ],
        image: './images/healthcare-feature.jpg'
    },
    {
        id: 'hospitality',
        title: 'Hospitality',
        heading: 'Service robots',
        description: [
            'Restaurant robots, robot waiters or hotel robots have gained lots of attention during the past two years due to the impact of COVID.',
            'Hospitality business owners can rely on restaurant and hotel robot to lend a helping hand as the service industry continues to see the labor shortage which has contributed to several issues such as longer wait times, lower service quality.',
            'The goal of robot food runners is to help elevate the service quality and ensure a better guest engagement.'
        ],
        image: './images/hospitality-feature.jpg'
    },
    {
        id: 'corporate',
        title: 'Corporate',
        heading: 'Robots as ambassadors',
        description: [
            'The first impression is everything, specially in business. Intelligent robots are able to perform multiple job responsibilities and reduce labor, such as welcoming guests, fun interaction, event promotion, and inquiries navigation, etc.',
            'Smart robots leave undoubtedly a positive first impression and a brand new experience to customers.'
        ],
        image: './images/corporate-feature.jpg'
    },
    {
        id: 'retail',
        title: 'Retail',
        heading: 'In-store transformation',
        description: [
            'With robots in stores, retailers already are at the beginning of the transformation.',
            'The robots free up workers from routine tasks and giving humans more time for customer interaction and elevate customer experience.',
            'But retail robots help also to collect valuable data about customers buying patterns.',
            'Such detailed data is incredibly valuable in retail, where understanding and anticipating consumer demand is essential.'
        ],
        image: './images/retail-feature.jpg'
    }
];

export default function Industries() {
    const [activeTab, setActiveTab] = useState('education');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <section id="industries" className="industries-section">
            <div className="container">
                <div className="tab-container">
                    <div className="tab-list" role="tablist">
                        {tabData.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => handleTabClick(tab.id)}
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                aria-controls={`${tab.id}-content`}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>
                    <div className="tab-content">
                        {tabData.map((tab) => (
                            <div 
                                key={tab.id}
                                className={`industry-content ${activeTab === tab.id ? 'active' : ''}`}
                                id={`${tab.id}-content`}
                                role="tabpanel"
                                aria-labelledby={tab.id}
                                style={{ display: activeTab === tab.id ? 'block' : 'none' }}
                            >
                                <div className="content-wrapper">
                                    <div className="content-text">
                                        <h3>How can we help you?</h3>
                                        <h2>{tab.heading}</h2>
                                        {tab.description.map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                        <a href="#" className="learn-more">
                                            Learn more <i className="fas fa-arrow-right"></i>
                                        </a>
                                    </div>
                                    <div className="feature-image">
                                        <img src={tab.image} alt={`${tab.title} robotics`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 