// Script pour rendre le logo sticky et masquer les liens lors du scroll
window.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.luxe-auto-logo');
    const navLinks = document.querySelector('.nav-links');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            logo.classList.add('sticky');
            navLinks.classList.add('hide-nav');
        } else {
            logo.classList.remove('sticky');
            navLinks.classList.remove('hide-nav');
        }
        lastScroll = scrollY;
    });
});