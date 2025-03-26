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
window.addEventListener('scroll', () => {
    navbar.style.background = window.pageYOffset > 50 ? 'var(--nav-bg)' : 'transparent';
    navbar.style.backdropFilter = window.pageYOffset > 50 ? 'blur(10px)' : 'none';
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

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
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

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form-fields');
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');

    const validateInput = (input) => {
        const value = input.value.trim();
        let isValid = true;
        let message = '';

        switch (input.name) {
            case 'name':
                isValid = value.length >= 2;
                message = 'Name must be at least 2 characters long';
                break;
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                message = 'Please enter a valid email address';
                break;
            case 'message':
                isValid = value.length >= 10;
                message = 'Message must be at least 10 characters long';
                break;
        }

        const errorElement = input.parentElement.querySelector('.error-message') || 
                           Object.assign(document.createElement('div'), { className: 'error-message' });
        
        input.parentElement.appendChild(errorElement);
        input.classList.toggle('invalid', !isValid);
        input.classList.toggle('valid', isValid);
        errorElement.textContent = isValid ? '' : message;
        
        return isValid;
    };

    formInputs.forEach(input => input.addEventListener('blur', () => validateInput(input)));

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!Array.from(formInputs).every(validateInput)) return;

        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success notification
            const notification = Object.assign(document.createElement('div'), {
                className: 'notification success',
                textContent: 'Message sent successfully!'
            });
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
            
            // Reset form
            contactForm.reset();
            formInputs.forEach(input => {
                input.classList.remove('valid', 'invalid');
                const errorElement = input.parentElement.querySelector('.error-message');
                if (errorElement) errorElement.remove();
            });
        } catch (error) {
            const notification = Object.assign(document.createElement('div'), {
                className: 'notification error',
                textContent: 'Failed to send message. Please try again.'
            });
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send';
        }
    });
}

// Theme Toggle
const themeToggle = Object.assign(document.createElement('button'), {
    className: 'theme-toggle',
    innerHTML: '<i class="fas fa-moon"></i>',
    title: 'Toggle theme'
});
document.body.appendChild(themeToggle);

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.querySelector('i').className = `fas fa-${savedTheme === 'dark' ? 'moon' : 'sun'}`;

themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.querySelector('i').className = `fas fa-${newTheme === 'dark' ? 'moon' : 'sun'}`;
});

// Industries Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const industryContents = document.querySelectorAll('.industry-content');

    function switchTab(e) {
    const targetTab = e.target.getAttribute('data-tab');
    
    // Update active state of tab buttons
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if(btn.getAttribute('data-tab') === targetTab) {
            btn.classList.add('active');
        }
    });
    
    // Update active state of content sections
        industryContents.forEach(content => {
            content.classList.remove('active');
        if(content.id === `${targetTab}-content`) {
                content.classList.add('active');
            }
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', switchTab);
    });