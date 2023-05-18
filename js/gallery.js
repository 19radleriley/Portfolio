// Include Lightbox 
import PhotoSwipeLightbox from "./photoswipe-lightbox.esm.js";
import PhotoSwipe from "./photoswipe.esm.js";

class Gallery {
    startGallery(gallerySelector, childrenSelector) {
        this.gallerySelector = gallerySelector; 
        this.setImageDimensions(childrenSelector);
        this.startPhotoswipe(gallerySelector, childrenSelector);
    }

    setImageDimensions(childrenSelector) {
        this.waitForImages(childrenSelector, () => {
            document.querySelectorAll(childrenSelector).forEach(element => {
                var img = element.querySelector("img");
                element.setAttribute("data-pswp-height", img.naturalHeight);
                element.setAttribute("data-pswp-width", img.naturalWidth);
            });
        })
    }

    // Wait for images to be added to the dom
    // Will be able to delete me later
    waitForImages(childrenSelector, callback) {
        if (document.querySelectorAll(childrenSelector).length != 0) {
            callback();
        } else {
            window.requestAnimationFrame(() => this.waitForImages(childrenSelector, callback));
        }
    }

    startPhotoswipe(gallerySelector, childrenSelector) {
        // Set the gallery's class to 'pswp-gallery'
        // Set the data-pswp-height and widths for each image (set on the anchor tag)

        document.querySelector(gallerySelector).classList.add("pswp-gallery");
        // In masonry grid wrap every image in an anchor tag DONE

        this.lightbox = new PhotoSwipeLightbox({
            gallery: gallerySelector,
            children: childrenSelector,
            pswpModule: PhotoSwipe
        });

        this.lightbox.init();
    }

    destroyGallery() {
        console.log(document.querySelector(this.gallerySelector));
        console.log(this.gallerySelector);
        this.lightbox.destroy();
        document.querySelector(this.gallerySelector).classList.remove("pswp-gallery");
    }
}
export { Gallery as default };