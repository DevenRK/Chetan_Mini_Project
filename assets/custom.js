
        // Initialize AOS animation
        AOS.init({
            duration: 800,
            once: true
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function () {
            const navbar = document.getElementById('mainNav');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Counter animation function
        function animateCounter(elementId, finalValue, duration, suffix = '') {
            let startTime = null;
            const element = document.getElementById(elementId);
            const isThousands = finalValue >= 1000;

            function updateCounter(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);

                let currentValue;
                if (isThousands) {
                    currentValue = Math.floor(progress * finalValue / 1000);
                    element.textContent = currentValue + suffix + 'K+';
                } else {
                    currentValue = Math.floor(progress * finalValue);
                    element.textContent = currentValue + suffix + '+';
                }

                if (progress < 1) {
                    window.requestAnimationFrame(updateCounter);
                }
            }

            window.requestAnimationFrame(updateCounter);
        }

        // Start animation when the element is in viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        // Initialize counters when they come into view
        function initCounters() {
            const counterSection = document.querySelector('.counter-section');
            if (isElementInViewport(counterSection)) {
                // Start counter animations with different durations for visual interest
                animateCounter('project-counter', 100, 2000);
                animateCounter('blog-counter', 50, 1500);
                animateCounter('course-counter', 10, 1000);
                animateCounter('student-counter', 5, 2500, 'K');

                // Remove scroll listener once counters are initialized
                window.removeEventListener('scroll', initCounters);
            }
        }

        // Add entrance animations to cards
        function animateCards() {
            const cards = document.querySelectorAll('.counter-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 150);
            });
        }
        

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function () {
            // Set initial opacity for animation
            document.querySelectorAll('.counter-card').forEach(card => {
                card.style.opacity = '0';
            });

            // Start animations
            setTimeout(animateCards, 300);

            // Initialize counters
            initCounters();

            // Add scroll listener for counter animation
            window.addEventListener('scroll', initCounters);
        });