
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

    // WhatsApp floating button
    if (!document.getElementById('whatsapp-float')) {
        const wa = document.createElement('a');
        wa.id = 'whatsapp-float';
        wa.href = 'https://wa.me/233549022917';
        wa.target = '_blank';
        wa.rel = 'noopener noreferrer';
        wa.setAttribute('aria-label', 'Chat on WhatsApp');
        wa.className = 'fixed bottom-6 right-6 z-[90] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300';
        wa.innerHTML = '<i class="fab fa-whatsapp text-3xl"></i>';
        document.body.appendChild(wa);
    }

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
