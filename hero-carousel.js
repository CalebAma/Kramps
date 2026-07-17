function heroCarousel() {
    const categories = (window.PROJECT_GALLERY && window.PROJECT_GALLERY.categories) || [];
    const images = categories
        .filter((c) => c.images.length)
        .map((c) => ({ src: c.images[0], alt: c.title }));

    return {
        images,
        current: 0,
        timer: null,

        init() {
            if (this.images.length <= 1) return;
            this.timer = setInterval(() => {
                this.current = (this.current + 1) % this.images.length;
            }, 4000);
        },

        destroy() {
            if (this.timer) clearInterval(this.timer);
        },
    };
}
