window.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    function handleNavBg() {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled-nav');
        } else {
            nav.classList.remove('scrolled-nav');
        }
    }
    window.addEventListener('scroll', handleNavBg);
    handleNavBg();
});