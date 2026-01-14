document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide icons
    lucide.createIcons();

    // --- Navbar Scroll Effects ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
                navbar.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.backdropFilter = 'blur(12px)';
                navbar.style.backgroundColor = 'transparent';
                navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // --- Phone Carousel Screenshots ---
    const phoneScreens = {
        left: [
            'screenshots/welcome-cosmic-split-nebula-en.webp',
            'screenshots/welcome-midnight-hero-nebula-en.webp',
            'screenshots/welcome-cosmicDark-card-geometric-en.webp',
            'screenshots/welcome-nature-particles-illustration-en.webp',
            'screenshots/welcome-ocean-classic-geometric-en.webp',
            'screenshots/welcome-royal-card-orbs-en.webp'
        ],
        center: [
            'screenshots/login-midnight-hero-galactic-en.webp',
            'screenshots/login-midnight-classicForm-nebula-en.webp',
            'screenshots/login-midnight-orbs-centeredCard-en.webp',
            'screenshots/login-cosmicDark-centerdCard-galactic-en.webp',
            'screenshots/login-royal-classic-nebula-en.webp',
            'screenshots/login-minimal-heroAuth-geometric-fr.webp'
        ],
        right: [
            'screenshots/register-sunset-heroAuth-geometric-zh.webp',
            'screenshots/register-orbs-midnight-card-en.webp',
            'screenshots/register-sunsetDark-hero-grid-en.webp',
            'screenshots/register-natureDark-centeredDark-geometric-hi.webp',
            'screenshots/register-royalDark-classicForm-galactic-ar.webp'
        ]
    };

    // --- FULL GALLERY LOGIC ---
    const allScreenshots = [
        'screenshots/welcome-cosmic-split-nebula-en.webp',
        'screenshots/welcome-midnight-hero-nebula-en.webp',
        'screenshots/welcome-nature-particles-illustration-en.webp',
        'screenshots/welcome-royal-card-orbs-en.webp',
        'screenshots/welcome-cosmicDark-card-geometric-en.webp',
        'screenshots/welcome-cosmicDark-galactic-bottomCTA-en.webp',
        'screenshots/welcome-minimal-mesh-minimal-en.webp',
        'screenshots/welcome-ocean-classic-geometric-en.webp',
        'screenshots/welcome-sunset-gride-bottomcta-en.webp',


        'screenshots/login-midnight-hero-galactic-en.webp',
        'screenshots/login-midnight-classicForm-nebula-en.webp',
        'screenshots/login-midnight-geometry-bottomsheet-en.webp',
        'screenshots/login-midnight-mesh-minimal-en.webp',
        'screenshots/login-midnight-orbs-centeredCard-en.webp',
        'screenshots/login-midnight-split-grid-en.webp',
        'screenshots/login-midnight-stepbystep-particles-en.webp',
        'screenshots/login-cosmicDark-centerdCard-galactic-en.webp',
        'screenshots/login-minimal-heroAuth-geometric-fr.webp',
        'screenshots/login-oceanDark-bottomSheet-galactic-ar.webp',
        'screenshots/login-royal-classic-nebula-en.webp',
        'screenshots/login-sunsetDark-centeredCard-galactic-ar.webp',

        'screenshots/register-sunset-heroAuth-geometric-zh.webp',
        'screenshots/register-orbs-midnight-card-en.webp',
        'screenshots/register-sunsetDark-hero-grid-en.webp',
        'screenshots/register-natureDark-centeredDark-geometric-hi.webp',
        'screenshots/register-royalDark-classicForm-galactic-ar.webp',

        'screenshots/config1.webp',
        'screenshots/config2.webp',
        'screenshots/config3.webp',
        'screenshots/config4.webp',
        'screenshots/config5.webp',
        'screenshots/config6.webp',

        'screenshots/account exists error showing.webp',
        'screenshots/error showing.webp',
        'screenshots/forgot password.webp'
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const lightboxPrevBtn = document.getElementById('lightbox-prev');
    const lightboxNextBtn = document.getElementById('lightbox-next');

    let currentGalleryImages = [];
    let currentImageIndex = 0;

    // Helper to format filename into title
    function formatTitle(path) {
        const filename = path.split('/').pop().replace('.webp', '').replace('.png', '');
        return filename.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    // --- Filter Logic Helper ---
    function shouldShowImage(path, filter) {
        if (filter === 'all') return true;
        if (filter === 'welcome') return path.toLowerCase().includes('welcome');
        if (filter === 'login') return path.toLowerCase().includes('login');
        if (filter === 'register') return path.toLowerCase().includes('register');
        if (filter === 'themes') {
            // Show all main screens, exclude config/errors
            return !path.toLowerCase().includes('config') &&
                !path.toLowerCase().includes('error') &&
                !path.toLowerCase().includes('forgot');
        }
        if (filter === 'rtl') {
            // Check for Arabic/RTL indicators in filename
            return path.toLowerCase().includes('-ar.') || path.toLowerCase().includes('-he.');
        }
        return false;
    }

    // Render Gallery
    function renderGallery(filter = 'all') {
        if (!galleryGrid) return;

        // Clear current grid
        galleryGrid.innerHTML = '';
        currentGalleryImages = [];

        // Filter images
        const filteredImages = allScreenshots.filter(src => shouldShowImage(src, filter));

        // Update Counter
        const counterElement = document.getElementById('gallery-counter');
        if (counterElement) {
            counterElement.textContent = filteredImages.length;
        }

        // Store for lightbox nav
        currentGalleryImages = filteredImages;

        if (filteredImages.length === 0) {
            galleryGrid.innerHTML = '<div class="col-span-full text-center text-gray-500 py-12">No images found for this category.</div>';
            return;
        }

        filteredImages.forEach((src, index) => {
            const container = document.createElement('div');
            container.className = 'break-inside-avoid mb-4 rounded-xl overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gray-900 border border-white/10';
            container.onclick = () => openLightbox(index);

            const img = document.createElement('img');
            img.src = src;
            img.alt = formatTitle(src);
            img.loading = 'lazy';
            img.className = 'w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500';

            const overlay = document.createElement('div');
            overlay.className = 'absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4';

            const caption = document.createElement('span');
            caption.className = 'text-white text-sm font-medium truncate w-full';
            caption.textContent = formatTitle(src);

            overlay.appendChild(caption);
            container.appendChild(img);
            container.appendChild(overlay);
            galleryGrid.appendChild(container);

            // Staggered fade in
            container.style.opacity = '0';
            container.style.animation = `fadeIn 0.5s ease forwards ${index * 0.05}s`;
        });
    }

    // Initial render
    renderGallery('all');

    // Filter Logic - Event Listeners
    document.querySelectorAll('.gallery-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.gallery-tab').forEach(t => {
                t.classList.remove('active', 'bg-white', 'text-black');
                t.classList.add('glass');
            });
            tab.classList.remove('glass');
            tab.classList.add('active', 'bg-white', 'text-black');

            // Filter
            renderGallery(tab.dataset.filter);
        });
    });

    // --- Lightbox Functions ---
    function openLightbox(index) {
        if (!lightbox) return;
        currentImageIndex = index;
        updateLightboxContent();
        lightbox.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            lightbox.classList.remove('opacity-0');
        }, 10);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.add('opacity-0');
        setTimeout(() => {
            lightbox.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const src = currentGalleryImages[currentImageIndex];
        lightboxImg.src = src;
        lightboxCaption.textContent = formatTitle(src);

        // Update nav buttons visibility
        if (lightboxPrevBtn) lightboxPrevBtn.style.opacity = currentImageIndex === 0 ? '0.5' : '1';
        if (lightboxNextBtn) lightboxNextBtn.style.opacity = currentImageIndex === currentGalleryImages.length - 1 ? '0.5' : '1';
    }

    function nextImage() {
        if (currentImageIndex < currentGalleryImages.length - 1) {
            currentImageIndex++;
            updateLightboxContent();
        } else {
            // Optional: Loop back to start
            currentImageIndex = 0;
            updateLightboxContent();
        }
    }

    function prevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateLightboxContent();
        } else {
            // Optional: Loop to end
            currentImageIndex = currentGalleryImages.length - 1;
            updateLightboxContent();
        }
    }

    // Lightbox Event Listeners
    if (lightbox) {
        if (closeBtn) closeBtn.onclick = closeLightbox;
        if (lightboxNextBtn) lightboxNextBtn.onclick = (e) => { e.stopPropagation(); nextImage(); };
        if (lightboxPrevBtn) lightboxPrevBtn.onclick = (e) => { e.stopPropagation(); prevImage(); };

        // Close on background click
        lightbox.onclick = (e) => {
            if (e.target === lightbox || e.target.classList.contains('flex')) {
                closeLightbox();
            }
        };

        // Keyboard Nav
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('hidden')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });

        // Swipe Support (Mobile)
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const threshold = 50;
            if (touchEndX < touchStartX - threshold) nextImage(); // Swipe Left -> Next
            if (touchEndX > touchStartX + threshold) prevImage(); // Swipe Right -> Prev
        }
    }

    let currentIndex = { left: 0, center: 0, right: 0 };

    const phoneLeftImg = document.getElementById('phone-left-img');
    const phoneCenterImg = document.getElementById('phone-center-img');
    const phoneRightImg = document.getElementById('phone-right-img');

    function crossfadePhone(imgElement, screens, key) {
        if (!imgElement || !screens.length) return;

        imgElement.style.opacity = '0';
        imgElement.style.transform = 'scale(0.95)';

        setTimeout(() => {
            currentIndex[key] = (currentIndex[key] + 1) % screens.length;
            imgElement.src = screens[currentIndex[key]];
            imgElement.style.opacity = '1';
            imgElement.style.transform = 'scale(1)';
        }, 400);
    }

    // Staggered carousel timing
    if (phoneCenterImg) {
        setInterval(() => crossfadePhone(phoneCenterImg, phoneScreens.center, 'center'), 3000);
    }
    if (phoneLeftImg) {
        setTimeout(() => {
            setInterval(() => crossfadePhone(phoneLeftImg, phoneScreens.left, 'left'), 3500);
        }, 1000);
    }
    if (phoneRightImg) {
        setTimeout(() => {
            setInterval(() => crossfadePhone(phoneRightImg, phoneScreens.right, 'right'), 4000);
        }, 2000);
    }

    // --- 3D Tilt Effect on Phone Showcase ---
    const phoneShowcase = document.getElementById('phone-showcase');
    const phoneCenter = document.getElementById('phone-center');

    if (phoneShowcase && phoneCenter) {
        phoneShowcase.addEventListener('mousemove', (e) => {
            const rect = phoneShowcase.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            phoneCenter.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        phoneShowcase.addEventListener('mouseleave', () => {
            phoneCenter.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    }

    // --- Flying Particles ---
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        const particles = particlesContainer.querySelectorAll('.particle');
        particles.forEach((particle, i) => {
            const size = Math.random() * 6 + 2;
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(168,85,247,0.8) 0%, transparent 70%);
                border-radius: 50%;
                left: ${left}%;
                bottom: -10%;
                animation: floatUp ${duration}s linear infinite;
                animation-delay: ${delay}s;
            `;
        });
    }

    // --- Count-Up Animation for Combo Counter ---
    const comboCounter = document.getElementById('combo-counter');
    let comboTriggered = false;

    const animateComboCounter = () => {
        if (!comboCounter) return;
        const target = 117649;
        const duration = 2500;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            comboCounter.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                comboCounter.textContent = target.toLocaleString();
            }
        };

        requestAnimationFrame(updateCount);
    };

    // Observe combo counter
    if (comboCounter) {
        const comboObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !comboTriggered) {
                    comboTriggered = true;
                    animateComboCounter();
                }
            });
        }, { threshold: 0.5 });
        comboObserver.observe(comboCounter);
    }



    // --- Gallery Tab Filtering ---


    // --- Smooth Scroll for Anchor Links ---
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

    // --- Parallax on scroll ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // --- ENHANCED SCROLL ANIMATIONS (Apple-like) ---

    // Detect mobile for lighter animations
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fade-up, scale-in, blur-in animations
    const fadeUpElements = document.querySelectorAll('.fade-up, .scale-in, .blur-in');

    if (!prefersReducedMotion) {
        const fadeUpObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: isMobile ? 0.05 : 0.1,
            rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
        });

        fadeUpElements.forEach(el => fadeUpObserver.observe(el));
    } else {
        // If reduced motion, make everything visible immediately
        fadeUpElements.forEach(el => el.classList.add('visible'));
    }

    // Stagger children animations
    const staggerElements = document.querySelectorAll('.stagger-children');

    if (!prefersReducedMotion) {
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        staggerElements.forEach(el => staggerObserver.observe(el));
    } else {
        staggerElements.forEach(el => el.classList.add('visible'));
    }

    // --- STICKY CTA BAR ---
    const stickyCta = document.getElementById('sticky-cta');
    const heroSection = document.getElementById('hero');

    if (stickyCta && heroSection) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // Hero is out of view - show sticky CTA
                    stickyCta.classList.add('visible');
                } else {
                    // Hero is in view - hide sticky CTA
                    stickyCta.classList.remove('visible');
                }
            });
        }, { threshold: 0 });

        ctaObserver.observe(heroSection);
    }

    // --- Legacy reveal support (backwards compatible) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

});

// Setup Tab Switcher
function switchSetupTab(index) {
    // 1. Update Code Blocks
    document.querySelectorAll('.setup-code-block').forEach(el => el.classList.add('hidden'));
    document.getElementById(`setup-code-${index}`).classList.remove('hidden');

    // 2. Update Filename
    const filenames = ['pubspec.yaml', 'lib/router.dart', 'lib/main.dart'];
    const filenameEl = document.getElementById('code-filename');
    if (filenameEl) filenameEl.textContent = filenames[index];
}

// Copy to Clipboard Function
function copyCodeSnippet() {
    // Find visible code block
    const visibleBlock = document.querySelector('.setup-code-block:not(.hidden)');
    if (!visibleBlock) return;

    // Get text content
    const textToCopy = visibleBlock.textContent;

    // Copy to clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Feedback
        const btnText = document.getElementById('copy-btn-text');
        if (btnText) {
            const originalText = btnText.textContent;
            btnText.textContent = "Copied! 🎉";
            setTimeout(() => {
                btnText.textContent = originalText;
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}
