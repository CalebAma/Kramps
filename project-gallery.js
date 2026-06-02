function projectGallery() {
    const categories = (window.PROJECT_GALLERY && window.PROJECT_GALLERY.categories) || [];

    return {
        filter: 'all',
        categories,
        lightboxOpen: false,
        lightboxIndex: 0,
        lightboxSrc: '',
        lightboxTitle: '',

        filteredCategories() {
            if (this.filter === 'all') return this.categories;
            return this.categories.filter((c) => c.id === this.filter);
        },

        visibleImages() {
            const list = [];
            for (const cat of this.filteredCategories()) {
                for (const src of cat.images) {
                    list.push({ src, title: cat.title });
                }
            }
            return list;
        },

        openLightbox(cat, imageIndex) {
            const images = this.visibleImages();
            if (!images.length) return;

            let flatIndex = 0;
            for (const c of this.filteredCategories()) {
                if (c.id === cat.id) {
                    flatIndex += imageIndex;
                    break;
                }
                flatIndex += c.images.length;
            }

            this.lightboxIndex = flatIndex;
            this.showLightboxImage();
            this.lightboxOpen = true;
            document.body.style.overflow = 'hidden';
        },

        showLightboxImage() {
            const images = this.visibleImages();
            if (!images.length) return;

            const item = images[this.lightboxIndex];
            this.lightboxSrc = item.src;
            this.lightboxTitle = item.title;
        },

        nextImage() {
            const images = this.visibleImages();
            if (!images.length) return;
            this.lightboxIndex = (this.lightboxIndex + 1) % images.length;
            this.showLightboxImage();
        },

        prevImage() {
            const images = this.visibleImages();
            if (!images.length) return;
            this.lightboxIndex = (this.lightboxIndex - 1 + images.length) % images.length;
            this.showLightboxImage();
        },

        closeLightbox() {
            this.lightboxOpen = false;
            document.body.style.overflow = '';
        },

        lightboxCounter() {
            const images = this.visibleImages();
            if (!images.length) return '';
            return `${this.lightboxIndex + 1} / ${images.length}`;
        },
    };
}
