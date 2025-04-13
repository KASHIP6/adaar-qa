document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoSlideInterval;

    function updateSlider(instant = false) {
        if (instant) {
            sliderWrapper.style.transition = 'none';
        } else {
            sliderWrapper.style.transition = 'transform 0.5s ease';
        }
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            const actualIndex = index;
            dot.classList.toggle('bg-white', actualIndex === (currentSlide % slideCount));
            dot.classList.toggle('bg-white/50', actualIndex !== (currentSlide % slideCount));
        });
    }

    function nextSlide() {
        currentSlide++;
        updateSlider();
        if (currentSlide % slideCount === 0) {
            setTimeout(() => {
                currentSlide = 0;
                updateSlider(true);
            }, 500);
        }
    }

    function prevSlide() {
        if (currentSlide === 0) {
            currentSlide = slideCount;
            updateSlider(true);
            setTimeout(() => {
                currentSlide--;
                updateSlider();
            }, 0);
        } else {
            currentSlide--;
            updateSlider();
        }
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners for slider controls
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        nextButton.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
                stopAutoSlide();
                startAutoSlide();
            });
        });

        // Start auto-sliding
        startAutoSlide();

        // Pause auto-sliding when hovering over slider
        sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
        sliderWrapper.addEventListener('mouseleave', startAutoSlide);
    }

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('py-2');
            header.classList.remove('py-4');
        } else {
            header.classList.add('py-4');
            header.classList.remove('py-2');
        }
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenuButton.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
            } else {
                mobileMenuButton.innerHTML = '<i class="ri-close-line ri-lg"></i>';
            }
        });
    }

    // Accordion functionality
    window.toggleAccordion = function(id) {
        const content = document.getElementById(id);
        const icon = document.getElementById(`${id}-icon`);
        const allContents = document.querySelectorAll('[id^="schools"], [id^="colleges"], [id^="malls"], [id^="hospitals"], [id^="corporates"], [id^="industrial"]');
        const allIcons = document.querySelectorAll('[id$="-icon"]');

        // Close all other sections
        allContents.forEach(item => {
            if (item.id !== id) {
                item.classList.add('hidden');
            }
        });

        // Reset all icons
        allIcons.forEach(icon => {
            icon.style.transform = 'rotate(0deg)';
        });

        // Toggle current section
        content.classList.toggle('hidden');
        if (!content.classList.contains('hidden')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    };

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
                }
            }
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.add('opacity-0', 'invisible');
                backToTopButton.classList.remove('opacity-100', 'visible');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Cursor trail effect
    const cursorTrail = document.querySelector('.cursor-trail');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice && cursorTrail) {
        cursorTrail.classList.remove('hidden');
        document.addEventListener('mousemove', function(e) {
            cursorTrail.style.left = e.clientX + 'px';
            cursorTrail.style.top = e.clientY + 'px';
        });
        document.addEventListener('mousedown', function() {
            cursorTrail.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorTrail.style.opacity = '0.9';
        });
        document.addEventListener('mouseup', function() {
            cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorTrail.style.opacity = '0.7';
        });
    }

    // Add scroll event listener for navbar
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('glassmorphic');
        } else {
            nav.classList.remove('glassmorphic');
        }
    });

    // Add click event listeners for particle effects
    document.querySelectorAll('.particle-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            createParticle(x, y);
        });
    });
});

// Navigation toggle
function toggleNav() {
    const nav = document.getElementById('mobile-menu');
    nav.classList.toggle('hidden');
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Accordion toggle
function toggleAccordion(id) {
    const content = document.getElementById(id);
    const allContents = document.querySelectorAll('.accordion-content');
    const allIcons = document.querySelectorAll('.accordion-icon');
    
    allContents.forEach(item => {
        if (item !== content) {
            item.classList.add('hidden');
        }
    });
    
    allIcons.forEach(icon => {
        if (icon.dataset.target !== id) {
            icon.classList.remove('rotate-180');
        }
    });
    
    content.classList.toggle('hidden');
    document.querySelector(`[data-target="${id}"]`).classList.toggle('rotate-180');
}

// Particle animation
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    document.body.appendChild(particle);
    
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    const destinationX = x + (Math.random() - 0.5) * 200;
    const destinationY = y - 200;
    const rotation = Math.random() * 520;
    const delay = Math.random() * 200;
    
    particle.animate([
        {
            transform: `translate(0, 0) rotate(0deg)`,
            opacity: 1
        },
        {
            transform: `translate(${destinationX - x}px, ${destinationY - y}px) rotate(${rotation}deg)`,
            opacity: 0
        }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: delay
    });
    
    setTimeout(() => {
        particle.remove();
    }, 1200);
}

// Form validation
function validateForm(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const phone = form.querySelector('#phone').value;
    
    if (!name || !email || !phone) {
        alert('Please fill in all required fields');
        return false;
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!phone.match(/^\d{10}$/)) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }
    
    // If validation passes, you can submit the form
    form.submit();
    return true;
} 