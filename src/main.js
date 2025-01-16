// Khởi tạo các biến và hàm chung
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initGallery();
    initScrollReveal();
});

// Xử lý scroll và hiệu ứng menu
function initNavigation() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Xử lý scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Xử lý smooth scroll cho menu
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.hash !== '') {
                e.preventDefault();
                const hash = this.hash;
                const targetElement = document.querySelector(hash);

                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    slides[0].classList.add('active');

    setInterval(() => {
        slides[currentSlide].classList.remove('active');

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add('active');
    }, 3000);
});

document.addEventListener('DOMContentLoaded', function () {
    const musicPlayer = document.getElementById('music-player');
    const audioPlayer = document.getElementById('audio-player');
    const albumThumbnail = document.getElementById('album-thumbnail');
    const trackTitle = document.getElementById('track-title');
    const closeBtn = document.getElementById('close-player');

    // Danh sách nhạc
    const songs = {
        'drama': {
            title: 'Drama',
            src: 'src/assets/music/drama.mp3',
            thumbnail: 'src/assets/music/drama.jpg'
        },
        'savage': {
            title: 'Savage',
            src: 'src/assets/music/savage.mp3',
            thumbnail: 'src/assets/music/savage.jpg'

        },
        'girls': {
            title: 'Girls',
            src: 'src/assets/music/girls.mp3',
            thumbnail: 'src/assets/music/girl.jpg'

        },
        'wiplash': {
            title: 'Wiplash',
            src: 'src/assets/music/whiplash.mp3',
            thumbnail: 'src/assets/music/whiplash.jpg'

        }
    };


    document.querySelectorAll('.listen-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const albumCard = this.closest('.album-card');
            const albumTitle = albumCard.querySelector('h3').textContent.toLowerCase();
            const song = songs[albumTitle.replace(/\s+/g, '')];

            if (song) {
                audioPlayer.src = song.src;
                albumThumbnail.src = song.thumbnail;
                trackTitle.textContent = song.title;
                musicPlayer.classList.remove('hidden');
                musicPlayer.classList.add('active');
                audioPlayer.play();
            }
        });
    });

    closeBtn.addEventListener('click', function () {
        audioPlayer.pause();
        musicPlayer.classList.remove('active');
        setTimeout(() => {
            musicPlayer.classList.add('hidden');
        }, 300);
    });
});

// Thêm hàm reveal elements
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    const memberCards = document.querySelectorAll('.member-card');
    const albumCards = document.querySelectorAll('.album-card');

    const revealElement = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    };

    const options = {
        threshold: 0.15,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(revealElement, options);

    sections.forEach(section => {
        section.classList.add('reveal-section');
        observer.observe(section);
    });

    // Xử lý cards theo vị trí trong grid
    memberCards.forEach((card, index) => {
        card.classList.add('reveal-card');
        // Với grid 4 cột, index 0,1 sẽ từ trái, 2,3 sẽ từ phải
        if (index % 4 < 2) {
            card.classList.add('reveal-left');
        } else {
            card.classList.add('reveal-right');
        }
        card.style.transitionDelay = `${(index % 2) * 0.1}s`;
        observer.observe(card);
    });

    albumCards.forEach((card, index) => {
        card.classList.add('reveal-card');
        if (index % 4 < 2) {
            card.classList.add('reveal-left');
        } else {
            card.classList.add('reveal-right');
        }
        card.style.transitionDelay = `${(index % 2) * 0.1}s`;
        observer.observe(card);
    });
} 