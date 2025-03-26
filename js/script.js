import RoboticArm3D from './robotArm3D.js';

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navRight = document.querySelector('.nav-right');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navRight.style.display = navRight.style.display === 'flex' ? 'none' : 'flex';
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 992) {
                navLinks.style.display = 'none';
                navRight.style.display = 'none';
            }
        }
    });
});

// Responsive Image Loading
const loadResponsiveImages = () => {
    const deviceFrame = document.querySelector('.device-frame');
    const robotBase = document.querySelector('.robot-base');
    
    if (window.innerWidth <= 768) {
        deviceFrame.style.width = '100%';
        robotBase.style.width = '100%';
    } else {
        deviceFrame.style.width = '80%';
        robotBase.style.width = '100%';
    }
};

window.addEventListener('load', loadResponsiveImages);
window.addEventListener('resize', loadResponsiveImages);

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Tab switching functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get all tab buttons and content sections
    const tabButtons = document.querySelectorAll('.tab-btn');
    const contentSections = document.querySelectorAll('.industry-content');
    const industryImage = document.querySelector('.feature-image');

    // Image sources for each tab
    const tabImages = {
        'education': 'education.jpg',
        'healthcare': 'healthcare.jpg',
        'hospitality': 'hospitality.jpg',
        'corporate': 'corporate.jpg',
        'retail': 'retail.jpg'
    };

    // Function to switch tabs
    function switchTab(targetId) {
        // Remove active class from all tabs and content
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === targetId) {
                btn.classList.add('active');
            }
        });

        // Hide all content sections first
        contentSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        // Show the target content section
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.style.display = 'block';
            // Force a reflow
            targetContent.offsetHeight;
            targetContent.classList.add('active');
        }

        // Update the image if it exists for this tab
        if (industryImage && tabImages[targetId]) {
            industryImage.style.opacity = '0';
            setTimeout(() => {
                industryImage.src = tabImages[targetId];
                industryImage.style.opacity = '1';
            }, 300);
        }
    }

    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-tab');
            switchTab(targetId);
        });
    });

    // Set initial active tab
    const initialTab = tabButtons[0]?.getAttribute('data-tab');
    if (initialTab) {
        switchTab(initialTab);
    }
});

// Industry Tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabIndicator = document.querySelector('.tab-indicator');
    const industryContents = document.querySelectorAll('.industry-content');

    function updateTabIndicator(activeTab) {
        const tabWidth = activeTab.offsetWidth;
        const tabLeft = activeTab.offsetLeft;
        tabIndicator.style.width = `${tabWidth}px`;
        tabIndicator.style.left = `${tabLeft}px`;
    }

    function switchTab(e) {
        const clickedTab = e.target;
        const tabId = clickedTab.dataset.tab;

        // Update active states
        tabBtns.forEach(btn => btn.classList.remove('active'));
        clickedTab.classList.add('active');

        // Update tab indicator
        updateTabIndicator(clickedTab);

        // Show corresponding content
        industryContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
            }
        });
    }

    // Initialize tab indicator
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        updateTabIndicator(activeTab);
    }

    // Add click handlers
    tabBtns.forEach(btn => {
        btn.addEventListener('click', switchTab);
    });
});

// Interface Tabs
const interfaceTabs = document.querySelectorAll('.nav-tabs .tab');
const robotStatus = document.querySelector('.robot-status');
let robotArm = null;

// Initialize the robotic arm
function initRoboticArm() {
    if (robotArm) {
        robotArm.dispose();
    }
    robotStatus.style.opacity = '1';
    robotArm = new RoboticArm3D(robotStatus);
}

// Wait for DOM and resources to load
window.addEventListener('load', () => {
    initRoboticArm();
    
    // Initialize with robotic arm tab
    const roboticArmTab = document.querySelector('[data-tab="robotic-arm"]');
    if (roboticArmTab) {
        roboticArmTab.click();
    }
});

interfaceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        interfaceTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Update the robot status display based on the selected tab
        const tabType = tab.getAttribute('data-tab');
        updateRobotStatus(tabType);
    });
});

function updateRobotStatus(type) {
    if (!robotArm) return;
    
    let color;
    switch(type) {
        case 'robotic-arm':
            color = '#40c057';
            break;
        case 'drones':
            color = '#ff6b6b';
            break;
        case 'auv':
            color = '#4dabf7';
            break;
        case 'bionic-arms':
            color = '#fab005';
            break;
        case 'autonomous':
            color = '#be4bdb';
            break;
    }
    
    // Update the 3D arm color
    robotArm.setColor(color);
    
    // Update the status line
    const line = robotStatus.querySelector('.status-line');
    if (line) {
        line.style.background = `linear-gradient(90deg, transparent, ${color}, transparent)`;
    }
} 