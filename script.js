
// Navbar mobile toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
});

// Smooth scroll for navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }
        // Close mobile menu after click
        if (window.innerWidth < 700) {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
        }
    });
});

// Highlight nav on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('main section');
    let scrollPos = window.scrollY + 120;
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    sections.forEach(section => {
        if (scrollPos > section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                if (link.getAttribute('href').substring(1) === section.id) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Fade-in effect for sections and cards on scroll
const fadeSections = document.querySelectorAll('.section');
const fadeCards = document.querySelectorAll('.card');
const fadeInOnScroll = () => {
    fadeSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            section.classList.add('fade-in');
        }
    });
    fadeCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) {
            card.style.opacity = 0.95;
            card.style.transform = 'translateY(0)';
        }
    });
};
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Animate nav toggle icon
const navToggle = document.getElementById('navToggle');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
    });
}
