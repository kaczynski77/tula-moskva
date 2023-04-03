let mainNavRevealed = false;
let scheduleRevealed = false;
let scheduleCardOneRevealed = false;
let scheduleCardTwoRevealed = false;
let scheduleBottomTextRevealed = false;
let footerRevealed = false;

//scroll to top before the animations
//
if (window.pageYOffset > 0) {
    window.scroll(0, 0);
}

const routeDropdown = () => {
    const routeSelected = document.querySelector(`.route__selected`);
    const routeList = document.querySelector(`.route__list`);
    const routeListItems = document.querySelectorAll(`.route__list-item`);
    //click
    routeSelected.addEventListener(`click`, () => {
        routeList.classList.toggle(`active`);
    });
    //click on list item
    routeListItems.forEach((item) => {
        item.addEventListener(`click`, () => {
            routeSelected.innerHTML = item.innerHTML;
            routeList.classList.remove(`active`);
        });
    });
};

routeDropdown();

const mainNavHandler = () => {
    const mainNav = document.querySelector(`.main__nav`);
    //foreach main nav item add event listener
    const footerTop = document.querySelector(`.footer__top`);
    const footerTitle = document.querySelector(`.footer__top-title`);
    let footer = document.querySelector(`.footer`);
    const navArray = [];

    let allNavBus = document.querySelectorAll(`[data-block="bus"]`);
    let allNavTickets = document.querySelectorAll(`[data-block="tickets"]`);
    let allNavSchedule = document.querySelectorAll(`[data-block="schedule"]`);

    allNavBus.forEach((item) => {
        if (!item.classList.contains(`main__block`)) navArray.push(item);
    });
    allNavTickets.forEach((item) => {
        if (!item.classList.contains(`main__block`)) navArray.push(item);
    });
    allNavSchedule.forEach((item) => {
        if (!item.classList.contains(`main__block`)) navArray.push(item);
    });

    navArray.forEach((item) => {
        item.addEventListener(`click`, (e) => {
            item.click();
            e.preventDefault();
            //remove active class from all nav items
            mainNav.querySelectorAll(`.main__nav-link`).forEach((item) => {
                item.classList.remove(`active`);
            });
            //add active class to clicked nav item
            item.classList.add(`active`);
            //show block
            let allBlock = document.querySelectorAll(`.main__block`);
            allBlock.forEach((item) => {
                if (!item.classList.contains(`hidden`)) {
                    item.classList.add(`hidden`);
                }
            });

            let block = document.querySelector(
                `.main__block--${item.dataset.block}`
            );

            //scroll to main nav
            mainNav.querySelector(`[data-block=${item.dataset.block}]`).click();

            if (item.dataset.block === `schedule`) {
                footerTop.style.display = `block`;
                footerTitle.innerHTML = `ЗАКАЖИТЕ АВТОБУС ДЛЯ ПОЕЗДКИ ПО РОССИИ СО СКИДКОЙ 10%`;
                if (!scheduleRevealed) {
                    item.click();
                    animateScheduleLeft();
                    animateScheduleRight();
                    scheduleRevealed = true;
                }
            } else {
                scheduleRevealed = false;
            }
            if (item.dataset.block === `tickets`) {
                footerTop.style.display = `none`;
                footer.opacity = 1;
                animateTickets();
            }

            if (item.dataset.block === `bus`) {
                footerTop.style.display = `block`;
                footerTitle.innerHTML = `ЗАКАЖИТЕ АВТОБУС ДЛЯ ТОРЖЕСТВА, СВАДЬБЫ ИЛИ ПОЕЗДОК ПО РОССИИ`;
                footer.opacity = 1;
                animateBus();
            }
            block.classList.remove(`hidden`);
            setTimeout(() => {
                mainNav.scrollIntoView(true, {
                    behavior: `smooth`,
                });
            }, 100);
        });
    });
};

mainNavHandler();

const animateScheduleLeft = () => {
    anime({
        targets: [
            `.main__block--schedule .left-side`,
            `.main__block--schedule .main__block-title`,
        ],
        translateX: [-1000, 0],
        easing: `easeInOutQuad`,
        opacity: [0, 1],
        delay: 100,
    });
};

const animateScheduleRight = () => {
    anime({
        targets: `.main__block--schedule .right-side`,
        translateX: [1000, 0],
        easing: `easeInOutQuad`,
        opacity: [0, 1],
        delay: 100,
    });
};

const animateTickets = () => {
    let ticketTitle = document.querySelector(
        `.main__block--tickets .main__block-title`
    );

    anime({
        targets: [`.main__block--tickets .main__block-title`],
        translateX: [-1000, 0],
        easing: `easeInOutQuad`,
        opacity: [0, 1],
        delay: 100,
    });
    anime({
        targets: [`.main__block--tickets .card`],
        translateY: [50, 0],
        easing: `easeInOutQuad`,
        opacity: [0, 1],
        delay: anime.stagger(200),
    });
    anime({
        targets: [`.main__block--tickets .card, .card__icon-holder`],
        translateY: [-50, 0],
        scale: [0.1, 1],
        easing: `easeInOutQuad`,
        opacity: [0, 1],
        delay: anime.stagger(200),
    });

    anime({
        targets: [`.main__block--tickets .buy-card`],
        translateX: function (el, i) {
            if (i === 0) {
                return [-1000, 0];
            } else {
                return [1000, 0];
            }
        },
        easing: `easeInOutQuad`,
    });
};

const animateBus = () => {
    anime({
        targets: [
            `.main__block--bus .bus__info, .main__block--bus .main__block-title, .main__block--bus .main__block-subtitle`,
        ],
        translateX: [-1000, 0],
        easing: `easeInOutQuad`,
        opacity: [0, 1],
        delay: 100,
    });
    anime({
        targets: `.main__block--bus .bus__slider`,
        translateX: [1000, 0],
        easing: `easeInOutQuad`,
        opacity: [0, 1],
        delay: 100,
    });
};

const animate = () => {
    anime({
        targets: `.hero`,
        opacity: [0, 1],
        easing: `easeInOutQuad`,
        delay: 200,
    });
    setTimeout(() => {
        anime({
            targets: [
                `.hero__card, .hero__card-icon`,
                `.hero__card-title`,
                `.hero__card-text`,
            ],
            translateY: [25, 0],
            easing: `easeInOutQuad`,
            opacity: [0, 1],
            delay: anime.stagger(100), // increase delay by 100ms for each elements.
        });
        anime({
            targets: [`.hero__nav-link`, `.hero__phone`, `.hero_phone-link`],
            translateY: [-100, 0],
            easing: `easeInOutQuad`,
            opacity: [0, 1],
            delay: anime.stagger(100), // increase delay by 100ms for each elements.
        });

        anime({
            targets: [`.hero__title`, `.hero__subtitle`, `.hero .btn`],
            translateX: [-100, 0],
            easing: `easeInOutQuad`,
            opacity: [0, 1],
            delay: anime.stagger(100), // increase delay by 100ms for each elements.
        });
    }, 200);

    //for all main blocks check if visible on scroll

    const isElementInViewport = (el) => {
        //vanilla JS
        let rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
                (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    //on scroll event {
    //doc loaded
    window.onscroll = () => {
        let allBlocks = document.querySelectorAll(`.main__block`);

        let mainNav = document.querySelector(`.main__nav`);

        if (isElementInViewport(mainNav) && !mainNavRevealed) {
            anime({
                targets: [`.main__nav-link`, `.filler`],
                translateY: [100, 0],
                easing: `easeInOutQuad`,
                opacity: [0, 1],
            });
            mainNavRevealed = true;
        }

        let scheduleTitle = document.querySelector(
            `.main__block--schedule .main__block-title`
        );
        if (isElementInViewport(scheduleTitle) && !scheduleRevealed) {
            animateScheduleLeft();
            animateScheduleRight();
            scheduleRevealed = true;
        }

        let scheduleCardOne = document.querySelector(
            `.main__block--schedule .schedule-card--first`
        );
        if (isElementInViewport(scheduleCardOne) && !scheduleCardOneRevealed) {
            anime({
                targets: `.main__block--schedule .schedule-card--first`,
                translateX: [-1000, 0],
                easing: `easeInOutQuad`,
                opacity: [0, 1],
            });
            scheduleCardOneRevealed = true;
        }

        let scheduleCardTwo = document.querySelector(
            `.main__block--schedule .schedule-card--second`
        );
        if (isElementInViewport(scheduleCardTwo) && !scheduleCardTwoRevealed) {
            anime({
                targets: `.main__block--schedule .schedule-card--second`,
                translateX: [1000, 0],
                easing: `easeInOutQuad`,
                opacity: [0, 1],
            });
            scheduleCardTwoRevealed = true;
        }

        let scheduleBottomText = document.querySelector(
            `.schedule__bottom-text`
        );
        if (
            isElementInViewport(scheduleBottomText) &&
            !scheduleBottomTextRevealed
        ) {
            anime({
                targets: `.schedule__bottom-text`,
                translateY: [100, 0],
                easing: `easeInOutQuad`,
                opacity: [0, 1],
            });
            scheduleBottomTextRevealed = true;
        }

        let footer = document.querySelector(`.footer__top`);

        if (isElementInViewport(footer) && !footerRevealed) {
            anime({
                targets: `.footer`,
                translateY: [1000, 0],
                easing: `easeInOutQuad`,
                opacity: [0, 1],
            });

            anime({
                targets: [`.footer__top-title`, `.footer .btn`],
                translateX: [-1000, 0],
                easing: `easeInOutQuad`,
                opacity: [0, 1],
                delay: anime.stagger(100), // increase delay by 100ms for each elements.
            });
            setTimeout(() => {
                anime({
                    targets: [`.footer__bottom-left`, `.footer__bottom-right`],
                    translateY: [-1000, 0],
                    easing: `easeInOutQuad`,
                    opacity: [0, 1],
                    delay: anime.stagger(100), // increase delay by 100ms for each elements.
                });
                anime({
                    targets: [`.copyright`],
                    translateY: [1000, 0],
                    easing: `easeInOutQuad`,
                    opacity: [0, 1],
                    delay: anime.stagger(100), // increase delay by 100ms for each elements.
                });
            }, 100);

            footerRevealed = true;
        }
    };
};

document.addEventListener(`DOMContentLoaded`, () => {
    animate();
});

const busModal = () => {
    let modal = document.querySelector(`.modal`);
    let modalClose = document.querySelector(`.modal__close`);
    let modalOverlay = document.querySelector(`.modal-overlay`);
    let busBtn = document.querySelector(`.book-a-bus .btn`);
    let body = document.querySelector(`body`);

    busBtn.addEventListener(`click`, () => {
        modal.classList.remove(`hidden`);
        modalOverlay.classList.remove(`hidden`);
        body.classList.add(`no-scroll`);
    });

    modalClose.addEventListener(`click`, () => {
        modal.classList.add(`hidden`);
        modalOverlay.classList.add(`hidden`);
        body.classList.remove(`no-scroll`);
    });
};

busModal();


