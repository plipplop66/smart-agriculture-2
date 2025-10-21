import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaUniversity } from 'react-icons/fa';
import './About.css';

const About = () => {
  // Sample team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'Frontend Developer',
      bio: 'Computer Science student specializing in React and modern web technologies.',
      image: 'team1.svg',
      social: {
        email: 'rahul.sharma@example.com',
        linkedin: 'https://linkedin.com/in/rahulsharma',
        github: 'https://github.com/rahulsharma'
      }
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Backend Developer',
      bio: 'Java enthusiast with experience in Spring Boot and database management.',
      image: 'team2.svg',
      social: {
        email: 'priya.patel@example.com',
        linkedin: 'https://linkedin.com/in/priyapatel',
        github: 'https://github.com/priyapatel'
      }
    },
    {
      id: 3,
      name: 'Amit Kumar',
      role: 'UI/UX Designer',
      bio: 'Design student passionate about creating intuitive and accessible user interfaces.',
      image: 'team3.svg',
      social: {
        email: 'amit.kumar@example.com',
        linkedin: 'https://linkedin.com/in/amitkumar',
        github: 'https://github.com/amitkumar'
      }
    }
  ];

  return (
    <div className="about-container">
      <div className="about-header">
        <div className="college-logo">
          <FaUniversity className="college-icon" />
        </div>
        <h1 className="about-title">Smart Agriculture Project</h1>
        <p className="about-subtitle">A Final Year Project by Computer Science Department</p>
      </div>

      <div className="about-section">
        <h2>Project Overview</h2>
        <p>
          The Smart Agriculture platform is designed to help farmers leverage technology for improved crop management, 
          resource optimization, and sustainable farming practices. Our solution integrates real-time sensor data, 
          weather forecasts, and agricultural expertise to provide actionable insights for modern farming.
        </p>
        <div className="project-features">
          <div className="feature">
            <h3>Real-time Monitoring</h3>
            <p>Track soil moisture, temperature, and humidity with IoT sensors</p>
          </div>
          <div className="feature">
            <h3>Smart Irrigation</h3>
            <p>Optimize water usage based on soil conditions and weather forecasts</p>
          </div>
          <div className="feature">
            <h3>Pest Management</h3>
            <p>Get timely recommendations for pest control based on crop type</p>
          </div>
          <div className="feature">
            <h3>Agricultural Resources</h3>
            <p>Access farming tips, government schemes, and expert consultation</p>
          </div>
        </div>
      </div>

      <div className="technologies-section">
        <h2>Technologies Used</h2>
        <div className="tech-stack">
          <div className="tech">
            <h3>Frontend</h3>
            <ul>
              <li>React.js</li>
              <li>Bootstrap</li>
              <li>Chart.js</li>
              <li>React Icons</li>
            </ul>
          </div>
          <div className="tech">
            <h3>Backend</h3>
            <ul>
              <li>Java</li>
              <li>Spring Boot</li>
              <li>RESTful APIs</li>
              <li>JWT Authentication</li>
            </ul>
          </div>
          <div className="tech">
            <h3>Database</h3>
            <ul>
              <li>MySQL</li>
              <li>JPA/Hibernate</li>
            </ul>
          </div>
          <div className="tech">
            <h3>IoT Integration</h3>
            <ul>
              <li>Arduino</li>
              <li>Soil Moisture Sensors</li>
              <li>Temperature Sensors</li>
              <li>Weather API Integration</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="acknowledgements">
        <h2>Acknowledgements</h2>
        <p>
          We would like to thank our project guide, Prof. Rajesh Verma, for his valuable guidance and support throughout 
          the development of this project. We also extend our gratitude to the Department of Computer Science for providing 
          the resources and infrastructure needed for this project.
        </p>
      </div>

      <footer className="about-footer">
        <p>&copy; 2023 Smart Agriculture Project | Computer Science Department</p>
        <p>All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default About;