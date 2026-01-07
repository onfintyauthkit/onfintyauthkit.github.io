document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Animations ---
    const heroImage = document.getElementById('hero-main-image');
    if (heroImage) {
        // Array of screenshots for the rotating slideshow
        const heroScreens = [
            'screenshots/cosmic.webp',
            'screenshots/login.png',
            'screenshots/create acc.png',
            'screenshots/sunset.webp'
        ];
        let currentImageIndex = 0;

        setInterval(() => {
            // Fade out
            heroImage.style.opacity = '0';

            setTimeout(() => {
                // Change source
                currentImageIndex = (currentImageIndex + 1) % heroScreens.length;
                heroImage.src = heroScreens[currentImageIndex];

                // Fade in
                heroImage.style.opacity = '1';
            }, 500); // Wait for fade out

        }, 3500); // Rotate every 3.5s
    }

    // --- 3D Tilt Effect on Hero ---
    const heroTiltContainer = document.getElementById('hero-tilt-container');
    const heroSection = document.getElementById('hero-visuals');

    if (heroTiltContainer && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation amount (max 15 degrees)
            const rotateX = ((y - centerY) / centerY) * -10; // Vertical tilt
            const rotateY = ((x - centerX) / centerX) * 10;   // Horizontal tilt

            // Apply transform
            heroTiltContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Reset on mouse leave
        heroSection.addEventListener('mouseleave', () => {
            heroTiltContainer.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    }

    // --- Slider Navigation ---
    const slider = document.getElementById('slider-container');
    const prevBtn = document.getElementById('slide-prev');
    const nextBtn = document.getElementById('slide-next');

    if (slider && prevBtn && nextBtn) {
        const scrollAmount = 400; // Width of card + gap

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        // Optional: Update button states
        slider.addEventListener('scroll', () => {
            // Logic to disable buttons if at ends could go here
            // distinct visual effect if needed
        });
    }
});
