// This file contains JavaScript code for interactivity on the website.

document.addEventListener('DOMContentLoaded', function() {
    // Example: Handle form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Handle form submission logic here
            alert('Form submitted!');
        });
    }

    // Example: Dynamic content update
    const dynamicContentButton = document.getElementById('dynamic-content-button');
    if (dynamicContentButton) {
        dynamicContentButton.addEventListener('click', function() {
            const contentArea = document.getElementById('content-area');
            contentArea.innerHTML = '<p>This is dynamically updated content!</p>';
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-element');
    observer.observe(section);
});

document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    tag.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add typing effect to hero section
const heroText = document.querySelector('.hero p');
const text = heroText.textContent;
heroText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

// Start typing effect when page loads
window.addEventListener('load', typeWriter);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Code Rain Background Animation
const canvas = document.getElementById('codeCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial resize
resizeCanvas();

// Handle window resize
window.addEventListener('resize', resizeCanvas);

// Programming syntax for the rain
const codeSnippets = [
    'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while',
    'return', 'class', 'import', 'export', 'async', 'await', 'try',
    'catch', 'finally', 'switch', 'case', 'break', 'continue',
    '=>', '{}', '[]', '()', ';', '=', '==', '===', '!=', '!==',
    '>', '<', '>=', '<=', '&&', '||', '!', '?', ':', '...',
    'null', 'undefined', 'true', 'false', 'this', 'super',
    'new', 'delete', 'typeof', 'instanceof', 'void', 'in',
    'of', 'yield', 'static', 'private', 'public', 'protected',
    'interface', 'type', 'enum', 'namespace', 'module',
    'require', 'console.log', 'document', 'window', 'Math',
    'Date', 'Array', 'Object', 'String', 'Number', 'Boolean',
    'Promise', 'async/await', 'fetch', 'axios', 'React',
    'useState', 'useEffect', 'useRef', 'useContext', 'useReducer',
    'useCallback', 'useMemo', 'useLayoutEffect', 'useDebugValue',
    'createContext', 'forwardRef', 'memo', 'lazy', 'Suspense',
    'ErrorBoundary', 'StrictMode', 'Fragment', 'Portal'
];

// Particle class for code rain
class CodeParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.speed = 1 + Math.random() * 2;
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        this.opacity = 0.1 + Math.random() * 0.9;
        this.fontSize = 12 + Math.random() * 8;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.font = `${this.fontSize}px 'Fira Code', monospace`;
        ctx.fillStyle = `rgba(0, 255, 0, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
    }
}

// Create particles
const particles = Array.from({ length: 150 }, () => new CodeParticle());

// Mouse interaction
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Add mouse trail effect
function drawMouseTrail() {
    ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 30, 0, Math.PI * 2);
    ctx.fill();
}

// Animation loop
function animate() {
    // Clear canvas with semi-transparent black for trail effect
    ctx.fillStyle = 'rgba(26, 26, 26, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw mouse trail
    drawMouseTrail();

    // Add some random highlights
    if (Math.random() < 0.1) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(animate);
}

// Start animation
animate();