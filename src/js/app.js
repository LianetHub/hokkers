"use strict";

import * as devFunctions from "./modules/functions.js";

document.addEventListener("DOMContentLoaded", () => {
    devFunctions.isWebp();
    devFunctions.OS();
    devFunctions.spollers();
    devFunctions.tooltip();

    /* sliders */
    if (document.querySelector(".desc")) {
        const imageSlider = new Swiper(".image-slider", {
            speed: 800,
        });

        const descSlider = new Swiper(".desc-slider", {
            speed: 800,
            spaceBetween: 5,
            navigation: {
                nextEl: ".desc-slider__next",
                prevEl: ".desc-slider__prev",
            },
            pagination: {
                el: ".desc-slider__pagination",
                type: "fraction",
                renderFraction: function (currentClass, totalClass) {
                    return ` <span class="${currentClass}"></span> / <span class="${totalClass}"></span>
                        `;
                },
            },
        });

        descSlider.controller.control = imageSlider;
        imageSlider.controller.control = descSlider;
    }

    if (document.querySelector(".partners-slider")) {
        const partnersSlider = new Swiper(".partners-slider", {
            speed: 800,
            loop: true,

            watchSlidesProgress: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                576.98: {
                    slidesPerView: 2,
                },
                767.98: {
                    slidesPerView: 3,
                },
                991.98: {
                    slidesPerView: 4,
                },
            },
        });
    }

    if (document.querySelector(".career-slider")) {
        const careerSlider = new Swiper(".career-slider", {
            slidesPerView: 1,
            loop: true,
            effect: "fade",
            autoplayDisableOnInteraction: false,
            autoplay: {
                delay: 5000,
            },
            fadeEffect: {
                crossFade: true,
            },
            pagination: {
                el: ".career-slider__pagination",
                clickable: "true",
                type: "bullets",
                renderBullet: function (index, className) {
                    return (
                        '<span class="' +
                        className +
                        '">' +
                        "0" +
                        [index + 1] +
                        "</span>"
                    );
                },
            },
        });
    }

    if (document.querySelector(".calc-slider")) {
        const prev = document.querySelector(".calc-slider__prev");
        const next = document.querySelector(".calc-slider__next");

        const calcSlider = new Swiper(".calc-slider", {
            speed: 800,
            slidesPerView: 1,
            spaceBetween: 40,
            autoHeight: true,
            simulateTouch: false,
            allowTouchMove: false,
            effect: "flip",
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
            pagination: {
                el: ".calc-slider__pagination",
                type: "fraction",
                renderFraction: function (currentClass, totalClass) {
                    return ` <span class="${currentClass}"></span> / <span class="${totalClass}"></span>
                        `;
                },
            },
            on: {
                slideChange: function () {
                    let isChecked = false;

                    const currentSlideItems = this.slides[
                        this.activeIndex
                    ].querySelectorAll(".calc-section__item-input");

                    currentSlideItems.forEach((currentSlideItem) => {
                        if (currentSlideItem.checked) {
                            isChecked = true;
                        }
                    });

                    !isChecked ? addAttrBtn(next) : removeAttrBtn(next);

                    if (this.slides.length - 1 == this.activeIndex) {
                        next.innerHTML = "Отправить";
                        next.setAttribute("type", "submit");
                    } else {
                        next.innerHTML = "Далее";
                        next.setAttribute("type", "button");
                    }
                },
                init: function () {
                    addAttrBtn(next);
                },
            },
        });

        function addAttrBtn(btn) {
            btn.setAttribute("aria-disabled", "true");
            btn.setAttribute("disabled", "disabled");
            next.classList.add("swiper-button-disabled");
        }

        function removeAttrBtn(btn) {
            btn.setAttribute("aria-disabled", "false");
            btn.removeAttribute("disabled");
            btn.classList.remove("swiper-button-disabled");
        }

        const calcItems = document.querySelectorAll(
            ".calc-section__item-input"
        );
        calcItems.forEach((calcItem) => {
            calcItem.addEventListener("click", () => {
                removeAttrBtn(next);
            });
        });
    }
    /* sliders */

    document.querySelectorAll(".form__textarea").forEach((textarea) => {
        textarea.addEventListener("input", (e) => {
            if (e.target.value.length <= 210) {
                const msgLength = e.target.nextElementSibling;
                const msgLenghtCurrent = msgLength.querySelector(
                    ".form__message-length-current"
                );
                msgLenghtCurrent.innerHTML = e.target.value.length;
            }
        });
    });

    /* inputmask */

    document.querySelectorAll('input[type="tel"]').forEach((input) => {
        var im = new Inputmask("+7 (999) 999-99-99");
        im.mask(input);
    });
});
