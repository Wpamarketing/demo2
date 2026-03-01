document.addEventListener("DOMContentLoaded", () => {
    // -- GSAP Setup --
    gsap.registerPlugin(ScrollTrigger);

    // -- Header Scroll --
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // -- Accordion Logic --
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            // Close all
            accordionButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
            
            // Toggle current
            if (!isExpanded) {
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // -- Hero Animations --
    const heroTl = gsap.timeline();
    heroTl.to('.reveal-text', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2
    })
    .to('.reveal-fade', {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.6");

    // -- Scroll Reveal Animations (Framer Motion style) --
    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });
    });

    // -- Horizontal Scroll Gallery --
    const galleryWrapper = document.querySelector('.scroll-container-wrapper');
    const horizontalContainer = document.querySelector('.horizontal-scroll-container');
    const bentoTrack = document.querySelector('.bento-track');

    function getScrollAmount() {
        let trackWidth = bentoTrack.scrollWidth;
        let diff = (trackWidth - window.innerWidth + 200); 
        return diff > 0 ? -diff : 0;
    }

    // Only apply horizontal scroll if the track is wider than the viewport
    if (getScrollAmount() !== 0) {
        const tween = gsap.to(bentoTrack, {
            x: getScrollAmount,
            ease: "none"
        });

        ScrollTrigger.create({
            trigger: galleryWrapper,
            start: "top top",
            end: () => `+=${Math.abs(getScrollAmount())}`,
            pin: true,
            animation: tween,
            scrub: 1,
            invalidateOnRefresh: true
        });
    }

    // -- Petal Canvas Animation --
    initPetals();
});

// -- Petal Particles System --
function initPetals() {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let petals = [];
    const petalCount = window.innerWidth < 768 ? 20 : 45;

    // Colors: Marigold (orange/yellow), Rose (pink/red)
    const colors = [
        'rgba(255, 165, 0, 0.7)',   // Marigold Orange
        'rgba(255, 215, 0, 0.7)',   // Marigold Yellow
        'rgba(230, 27, 114, 0.6)',  // Rani Pink
        'rgba(183, 110, 121, 0.6)'  // Rose Gold Pink
    ];

    class Petal {
        constructor() {
            this.reset();
            // initialize with random Y so they aren't all at the top initially
            this.y = Math.random() * height; 
        }

        reset() {
            this.x = Math.random() * width;
            this.y = -20;
            this.w = Math.random() * 8 + 6;
            this.h = Math.random() * 12 + 10;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speed = Math.random() * 1.5 + 0.5;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 2;
            this.swing = Math.random() * 2;
            this.swingSpeed = Math.random() * 0.02 + 0.01;
            this.angle = Math.random() * Math.PI * 2;
        }

        update() {
            this.y += this.speed;
            this.angle += this.swingSpeed;
            this.x += Math.sin(this.angle) * this.swing;
            this.rotation += this.rotationSpeed;

            if (this.y > height + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            
            ctx.fillStyle = this.color;
            ctx.beginPath();
            
            // Draw a petal shape (ellipse-ish)
            ctx.ellipse(0, 0, this.w / 2, this.h / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
    }

    for (let i = 0; i < petalCount; i++) {
        petals.push(new Petal());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    animate();
}
