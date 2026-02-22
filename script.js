
// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true, // Whether animation should happen only once - while scrolling down
        offset: 50, // Offset (in px) from the original trigger point
    });

    // Initialize Swiper for Testimonials
    if (document.querySelector('.mySwiper') && typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                },
            },
        });
    }

    // Smooth Scrolling for Anchor Links (just in case CSS doesn't catch it for some browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Inject Logo Watermark Overlay
    const watermark = document.createElement('div');
    // Ensure it's behind everything but fixed in place (z-0 is typically behind content positioned without a z-index, but pointer-events-none makes it safe either way)
    watermark.className = 'fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden';
    // Use responsive sizing: 80% width on mobile, 60% on tablet, 40% on laptop, 30% on desktop
    watermark.innerHTML = '<img src="logo.png" class="w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-auto opacity-[0.08] object-contain">';
    document.body.appendChild(watermark);

    // Basic Copy Protection / Source Hiding
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    document.addEventListener('keydown', function (e) {
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
            (e.ctrlKey && (e.key === 'U' || e.key === 'u'))) {
            e.preventDefault();
            return false;
        }
    });

    console.log("Kramps EHS Ventures scripts loaded successfully.");
});
