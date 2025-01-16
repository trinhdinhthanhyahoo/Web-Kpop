function initGallery() {
    const galleryImages = document.querySelectorAll('.gallery-section img');
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    document.body.appendChild(modal);

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.innerHTML = `
                <span class="close-modal">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            `;
            modal.style.display = 'flex';
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target.className === 'gallery-modal' || e.target.className === 'close-modal') {
            modal.style.display = 'none';
        }
    });

    modal.style.backgroundColor = 'rgba(16, 0, 43, 0.95)';
    modal.style.backdropFilter = 'blur(5px)';

    const modalImg = modal.querySelector('img');
    if (modalImg) {
        modalImg.style.opacity = '0';
        modalImg.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            modalImg.style.opacity = '1';
        }, 100);
    }
} 