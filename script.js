document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // Mobile Navigation Toggle
    // -------------------------------------------------------------
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileNavToggle.classList.toggle('open');
            
            // Toggle hamburger bars to 'X' shape
            const bars = mobileNavToggle.querySelectorAll('.bar');
            if (mobileNavToggle.classList.contains('open')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileNavToggle.classList.remove('open');
                const bars = mobileNavToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // -------------------------------------------------------------
    // Navbar Scroll Shadow & Active State
    // -------------------------------------------------------------
    const header = document.querySelector('.navbar-header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header Shadow
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlight on Scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // -------------------------------------------------------------
    // Scroll-driven Animation for Skill Progress Bars
    // -------------------------------------------------------------
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    
    // Store original widths and set to 0% initially
    const barWidths = [];
    progressBars.forEach((bar, index) => {
        barWidths[index] = bar.style.width;
        bar.style.width = '0%';
    });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Fill up the bars
                    progressBars.forEach((bar, index) => {
                        bar.style.width = barWidths[index];
                    });
                    // Unobserve after animating once
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(skillsSection);
    }

    // -------------------------------------------------------------
    // Project Category Filtering
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');

                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'flex';
                    // Trigger fade in animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    // Hide after animation finishes
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Add transition styling for project cards filter transitions
    projectCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
    });

    // -------------------------------------------------------------
    // Contact Form Submission & Speech Bubble Interaction
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const contactBubble = document.querySelector('.contact-bubble');

    if (contactForm && contactBubble) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const name = nameInput ? nameInput.value.trim() : '';

            // Cute loading animation on submit button
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... ✉';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Change CTA back
                submitBtn.innerHTML = 'Sent! ✨';
                
                // Update speech bubble text with custom thank you message
                contactBubble.innerHTML = `
                    <p style="font-weight: 700;">Hi ${name}! <span class="heart-icon">♡</span></p>
                    <p>Got your message! You are amazing. <span class="smile-icon">☺</span></p>
                `;

                // Soft bouncing visual effect on the bubble
                contactBubble.style.transform = 'scale(1.1) rotate(5deg)';
                setTimeout(() => {
                    contactBubble.style.transform = 'none';
                }, 500);

                // Reset form
                contactForm.reset();

                // Reset button state
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnHtml;
                    submitBtn.disabled = false;
                }, 3000);

            }, 1200);
        });
    }

    // -------------------------------------------------------------
    // Mock CV Download Action
    // -------------------------------------------------------------
    const downloadCvBtn = document.getElementById('downloadCv');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a temporary nice overlay popup alert
            const alertBox = document.createElement('div');
            alertBox.style.position = 'fixed';
            alertBox.style.bottom = '30px';
            alertBox.style.right = '30px';
            alertBox.style.backgroundColor = '#fff';
            alertBox.style.color = '#3d3d3d';
            alertBox.style.padding = '18px 24px';
            alertBox.style.borderRadius = '20px';
            alertBox.style.border = '2.5px solid #3d3d3d';
            alertBox.style.boxShadow = '4px 4px 0 #ff7d90';
            alertBox.style.fontFamily = 'Fredoka, sans-serif';
            alertBox.style.fontWeight = '600';
            alertBox.style.zIndex = '999';
            alertBox.style.display = 'flex';
            alertBox.style.alignItems = 'center';
            alertBox.style.gap = '10px';
            alertBox.style.transform = 'translateY(100px)';
            alertBox.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

            alertBox.innerHTML = '<span>📄 Downloading CV... Thank you for checking! ♡</span>';
            document.body.appendChild(alertBox);

            // Animate in
            setTimeout(() => {
                alertBox.style.transform = 'translateY(0)';
            }, 100);

            // Animate out
            setTimeout(() => {
                alertBox.style.transform = 'translateY(150px)';
                setTimeout(() => {
                    alertBox.remove();
                }, 500);
            }, 4000);
        });
    }
});
