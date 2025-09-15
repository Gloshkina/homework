// const burger = document.querySelector('.burger-icon');
// const navLinks = document.querySelectorAll('.nav__link');

// function toggleMenu() {
//     if (document.documentElement.clientWidth > 900) return;

//     document.body.classList.toggle('body--opened-menu');
// }

// if (burger) {
//     burger.addEventListener('click', toggleMenu);
// }

// navLinks.forEach(link => {
//     link.addEventListener('click', toggleMenu);
// });

(function() {

    document.addEventListener('click', burgerInit)

    function burgerInit(e) {

        const burgerIcon = e.target.closest('.burger-icon')
        const burgerNavLink = e.target.closest('.nav__link')


        if (!burgerIcon && !burgerNavLink) return
        if (document.documentElement.clientWidth > 900px) return

        if (!document.body.classList.contains('body--opened-menu')) {
            document.body.classList.add('body--opened-menu')
        } else {
            document.body.classList.remove('body--opened-menu')
        }

    }
})()