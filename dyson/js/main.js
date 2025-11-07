const moreButton = document.querySelector('.stock__button-more');
const hiddenList = document.querySelector('.stock__list--hidden');

moreButton.addEventListener('click', () => {
    if (hiddenList.style.display === 'flex') {
        hiddenList.style.display = 'none';
        moreButton.textContent = 'Показать еще';
    } else {
        hiddenList.style.display = 'flex';
        moreButton.textContent = 'Свернуть';
    }
});

// плюс/минус
const cardButtons = document.querySelectorAll('.stock__cards-buttons');
cardButtons.forEach(block => {
    const minus = block.querySelector('.stock__cards-minus svg path');
    const minusButton = block.querySelector('.stock__cards-minus');
    const plus = block.querySelector('.stock__cards-plus svg path');
    const amount = block.querySelector('.stock__cards-amount');

    function updateMinusColor() {
        minus.setAttribute('stroke', parseInt(amount.textContent) > 1 ? '#111111' : '#ababab');
    }

    minusButton.addEventListener('click', () => {
        let value = parseInt(amount.textContent);
        if (value > 1) {
            amount.textContent = value - 1;
            updateMinusColor();
        }
    });

    block.querySelector('.stock__cards-plus').addEventListener('click', () => {
        amount.textContent = parseInt(amount.textContent) + 1;
        updateMinusColor();
    });

    updateMinusColor();
});

// добавить в корзину

const headerBin = document.querySelector('.header__bin');
const addButtons = document.querySelectorAll('.stock__cards-button-bin');

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        const amountEl = button.closest('.stock__cards-buttons').querySelector('.stock__cards-amount');
        const amount = parseInt(amountEl.textContent);

        let countEl = headerBin.querySelector('.header__bin-count');
        if (!countEl) {
            countEl = document.createElement('span');
            countEl.classList.add('header__bin-count');
            countEl.textContent = amount;
            headerBin.appendChild(countEl);
        } else {
            countEl.textContent = parseInt(countEl.textContent) + amount;
        }
    });
});


//  сортируем карточки 
const sortWrapper = document.querySelector('.stock__button-wrapper');

if (sortWrapper) {
    const sortButton = sortWrapper.querySelector('.stock__button-popular');
    const sortDropdownItems = sortWrapper.querySelectorAll('.stock__dropdown li');
    const checkIcon = `
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4.5L6.5 10L15.5 1" stroke="#C5358C" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;

    const cardsList = document.querySelector('.stock__cards-list');
    const cards = Array.from(cardsList.children);

    sortButton.addEventListener('click', (e) => {
        e.stopPropagation();
        sortWrapper.classList.toggle('active');
    });

    sortDropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            // Сбрасываем старую активность
            sortDropdownItems.forEach(el => {
                el.classList.remove('active');
                el.querySelector('.checkmark')?.remove();
            });

            // Добавляем активный пункт
            item.classList.add('active');
            item.insertAdjacentHTML('beforeend', `<span class="checkmark">${checkIcon}</span>`);

            // ✅ Обновляем текст кнопки (только текст, SVG остаётся!)
            const text = item.textContent.trim();
            const svg = sortButton.querySelector('svg'); // сохраняем SVG
            sortButton.textContent = text; // очищаем и вставляем только текст
            sortButton.appendChild(svg); // возвращаем SVG на место

            // 🔢 Сортировка карточек
            let sortedCards = [...cards];
            if (text === "Сначала дешёвые") {
                sortedCards.sort((a, b) => Number(a.dataset.price.replace(/\s/g, '')) - Number(b.dataset.price.replace(/\s/g, '')));
            } else if (text === "Сначала дорогие") {
                sortedCards.sort((a, b) => Number(b.dataset.price.replace(/\s/g, '')) - Number(a.dataset.price.replace(/\s/g, '')));
            } else if (text === "Новинки" || text === "Высокий рейтинг") {
                sortedCards.sort((a, b) => Number(b.dataset.rating) - Number(a.dataset.rating));
            }

            sortedCards.forEach(card => cardsList.appendChild(card));
            sortWrapper.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!sortWrapper.contains(e.target)) {
            sortWrapper.classList.remove('active');
        }
    });
}

// свайпер

const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span> из <span class="' + totalClass + '"></span>';
        }
    }
    
});

// отзывы

const showBtn = document.querySelector('.review__button--show-more');
const hideBtn = document.querySelector('.review__button--hide');
const hiddenWrapper = document.querySelector('.review__photos-hidden-wrapper');

showBtn.addEventListener('click', () => {
    hiddenWrapper.style.maxHeight = hiddenWrapper.scrollHeight + "px";
    showBtn.style.display = 'none';
    hideBtn.style.display = 'inline-block';
});

hideBtn.addEventListener('click', () => {
    hiddenWrapper.style.maxHeight = "0";
    hideBtn.style.display = 'none';
    showBtn.style.display = 'inline-block';
});

const moreBtn = document.querySelector('.reviews__more');
const moreText = moreBtn.querySelector('.reviews__more-text');
const hiddenReviews = document.querySelectorAll('.reviews__item--hidden');
let isExpanded = false;

const transitionDuration = 300;

moreBtn.addEventListener('click', () => {
    if (!isExpanded) {
        hiddenReviews.forEach(item => {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = 1, 50);
        });
        moreText.textContent = 'Свернуть';
    } else {
        hiddenReviews.forEach(item => {
            item.style.opacity = 0;
            setTimeout(() => item.style.display = 'none', transitionDuration);
        });
        moreText.textContent = 'Показать еще';
    }
    isExpanded = !isExpanded;
});

// аккордеон

const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const btn = item.querySelector('.faq__question');

    btn.addEventListener('click', () => {
        faqItems.forEach(i => {
            if (i !== item) i.classList.remove('open');
        });

        item.classList.toggle('open');
    });
});

// новости

const newsMoreBtn = document.querySelector('.news__more');
const newsMoreText = newsMoreBtn.querySelector('.news__more-text');
const hiddenNews = document.querySelectorAll('.news__item--hidden');
let newsExpanded = false;

const newsTransitionDuration = 300;

newsMoreBtn.addEventListener('click', () => {
    if (!newsExpanded) {
        hiddenNews.forEach(item => {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = 1, 50);
        });
        newsMoreText.textContent = 'Свернуть';
    } else {
        hiddenNews.forEach(item => {
            item.style.opacity = 0;
            setTimeout(() => item.style.display = 'none', newsTransitionDuration);
        });
        newsMoreText.textContent = 'Показать еще';
    }
    newsExpanded = !newsExpanded;
});

// контакты

const contactInputs = document.querySelectorAll('.contact__input');

contactInputs.forEach(input => {
    const originalPlaceholder = input.placeholder;
    const focusPlaceholder = input.dataset.placeholder;

    input.addEventListener('focus', () => {
        input.placeholder = focusPlaceholder;
    });

    input.addEventListener('blur', () => {
        input.placeholder = originalPlaceholder;
    });
});

// бургер

const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__list');
const body = document.body;

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('lock'); 
});
const menuLinks = document.querySelectorAll('.header__link');

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('lock');
    });
});

document.addEventListener('click', (e) => {
    const clickInsideMenu = menu.contains(e.target);
    const clickOnBurger = burger.contains(e.target);
    if (!clickInsideMenu && !clickOnBurger && menu.classList.contains('active')) {
        burger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('lock');
    }
});


