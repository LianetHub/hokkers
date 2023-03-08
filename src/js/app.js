"use strict";

// import Swiper from "swiper";
import * as devFunctions from "./modules/functions.js";
import { slide } from "./modules/slideToggle.js";

document.addEventListener("DOMContentLoaded", () => {
    devFunctions.isWebp();
    devFunctions.OS();
    devFunctions.spollers();
    devFunctions.tooltip();
    devFunctions.tabs();
    devFunctions.map();
    devFunctions.drag();
    devFunctions.select();
    devFunctions.da.init();

    const cartTypes = document.querySelectorAll(".cart-formalization__types");

    if (cartTypes) {
        cartTypes.forEach((cartType) => {
            const cartMoreItems = cartType.querySelectorAll("[data-type-more]");

            cartMoreItems.forEach((cartMoreItem) => {
                const moreItems = document.querySelectorAll(".type-more");
                const btnItems = document.querySelectorAll(
                    ".cart-formalization__types-item"
                );

                moreItems.forEach((moreItem) => {
                    slide.slideUp(moreItem);
                });

                btnItems.forEach((btnItem) => {
                    btnItem.classList.remove("active");
                });

                cartMoreItem.addEventListener("change", (e) => {
                    const target = e.target;

                    const parentItem = target.closest(
                        ".cart-formalization__types-item"
                    );
                    const moreContent = parentItem.querySelector(".type-more");

                    btnItems.forEach((btnItem) => {
                        if (
                            btnItem.classList.contains("active") &&
                            btnItem.querySelector(".type-more")
                        ) {
                            slide.slideUp(btnItem.querySelector(".type-more"));
                        }
                        btnItem.classList.remove("active");
                    });

                    parentItem.classList.add("active");

                    if (moreContent) {
                        slide.slideDown(moreContent);
                    }
                });
            });
        });
    }

    document.addEventListener("click", (e) => {
        const target = e.target;

        if (target.closest(".comments__item-btn_discussion")) {
            getDiscussion(target.closest(".comments__item-btn_discussion"));
        }

        if (target.closest("[data-modal]")) {
            const targetBtn = target.closest("[data-modal]");
            let popupName;

            if (targetBtn.tagName == "BUTTON") {
                popupName = targetBtn.dataset.modal;
            } else {
                popupName = targetBtn.getAttribute("href").replace("#", "");
            }

            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        }

        if (
            target.classList.contains("popup__close") ||
            target.classList.contains("popup__content")
        ) {
            popupClose(target.closest(".popup"));
            e.preventDefault();
        }

        if (target.classList.contains("form__file-remove")) {
            e.preventDefault();

            const formFileList = target.closest(".form__file-list");
            const formFileItems =
                formFileList.querySelectorAll(".form__file-thumb");
            const formContent = formFileList.previousElementSibling;
            const moreLoadItem = document.querySelector("[data-upload-more]");

            if (formFileItems.length == 1) {
                formContent.classList.remove("hidden");
                moreLoadItem && moreLoadItem.classList.add("hidden");
            }

            const thumb = target.closest(".form__file-thumb");
            thumb.remove();
        }
    });

    // close ESCAPE
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && document.querySelector(".popup.open")) {
            const popupActive = document.querySelector(".popup.open");
            popupClose(popupActive);
        }
    });

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
            // slideToClickedSlide: true,
            // loop: true,
            // watchSlidesProgress: true,
            // autoplay: {
            //     delay: 3000,
            //     disableOnInteraction: true,
            //     pauseOnMouseEnter: true,
            // },
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
            on: {
                init: function () {
                    this.slides.forEach((slide, idx) => {
                        slide.setAttribute("data-index", idx);
                    });
                },
                click: function (swiper, event) {
                    const target = event.target;
                    const clickedSlide = target.closest(".swiper-slide");
                    const currentIndex =
                        clickedSlide.getAttribute("data-index");

                    slideSliders(currentIndex);
                },
            },
        });

        const modalSlider = new Swiper(".modal-slider", {
            speed: 800,
            spaceBetween: 40,
            // loop: true,
            // watchSlidesProgress: true,

            // autoplay: {
            //     delay: 3000,
            //     disableOnInteraction: true,
            //     pauseOnMouseEnter: true,
            // },
            navigation: {
                nextEl: ".modal-slider__next",
                prevEl: ".modal-slider__prev",
            },
        });

        partnersSlider.controller.control = modalSlider;
        modalSlider.controller.control = partnersSlider;

        function slideSliders(index) {
            partnersSlider.slideTo(index);
            modalSlider.slideTo(index);
        }
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

                    const currentSlideItems =
                        this.slides[this.activeIndex].querySelectorAll(
                            "[data-required]"
                        );

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

        const calcItems = document.querySelectorAll("[data-required]");
        calcItems.forEach((calcItem) => {
            calcItem.addEventListener("click", () => {
                removeAttrBtn(next);
            });
        });

        const previewSlider = new Swiper(".preview-slider", {
            speed: 800,
            slidesPerView: 1,

            navigation: {
                nextEl: ".preview-slider__next",
                prevEl: ".preview-slider__prev",
            },
        });
    }

    if (document.querySelectorAll(".article-slider")) {
        document
            .querySelectorAll(".article-slider")
            .forEach((articleSlider) => {
                const prev = articleSlider.querySelector(
                    ".article-slider__prev"
                );
                const next = articleSlider.querySelector(
                    ".article-slider__next"
                );

                const sliderEl = articleSlider.querySelector(
                    ".article-slider__content"
                );

                new Swiper(sliderEl, {
                    speed: 800,
                    spaceBetween: 10,
                    grabCursor: true,
                    navigation: {
                        nextEl: next,
                        prevEl: prev,
                    },
                });
            });
    }

    if (document.querySelector(".feedback-slider")) {
        const feedbackSlider = new Swiper(".feedback-slider__content", {
            speed: 800,
            slidesPerView: 1,
            spaceBetween: 26,
            grabCursor: true,
            // loop: true,
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            navigation: {
                nextEl: ".feedback-slider__next",
                prevEl: ".feedback-slider__prev",
            },
            pagination: {
                el: ".feedback-slider__pagination",
                type: "fraction",
                renderFraction: function (currentClass, totalClass) {
                    return ` <span class="${currentClass}"></span> / <span class="${totalClass}"></span>
                        `;
                },
            },
            on: {
                slideChange: function () {
                    const currentSlideItem = this.slides[this.activeIndex];
                    const textItem = currentSlideItem
                        .querySelector(".feedback-slider__slide-desc")
                        .textContent.trim();

                    const titleItem = document.querySelector(
                        ".feedback-slider__info-title"
                    );

                    titleItem.innerHTML = textItem;
                },
            },
        });
    }

    if (document.querySelectorAll(".review-slider")) {
        document.querySelectorAll(".review-slider").forEach((reviewSlider) => {
            const prev = reviewSlider.querySelector(".review-slider__prev");
            const next = reviewSlider.querySelector(".review-slider__next");

            new Swiper(reviewSlider, {
                speed: 800,
                spaceBetween: 8,
                slidesPerView: "auto",
                grabCursor: true,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: next,
                    prevEl: prev,
                },
                on: {
                    slideChange: function () {
                        if (this.activeIndex > 0) {
                            this.$el[0].classList.add("review-slider_slided");
                        } else {
                            this.$el[0].classList.remove(
                                "review-slider_slided"
                            );
                        }

                        if (
                            this.slides[
                                this.slides.length - 1
                            ].classList.contains("swiper-slide-visible")
                        ) {
                            this.$el[0].classList.add("review-slider_ended");
                        } else {
                            this.$el[0].classList.remove("review-slider_ended");
                        }
                    },
                },
            });
        });
    }

    if (document.querySelector(".product-slider")) {
        const productSlider = new Swiper(".product-slider", {
            speed: 800,
            spaceBetween: 4,
            simulateTouch: true,
            breakpoints: {
                767.98: {
                    slidesPerView: 2,
                },
                991.98: {
                    slidesPerView: 2,
                    grid: {
                        rows: 3,
                        fill: "row",
                    },
                },
            },
        });
    }

    if (document.querySelectorAll(".logo-slider")) {
        document.querySelectorAll(".logo-slider").forEach((slider) => {
            const prev = slider.querySelector(".logo-slider__prev");
            const next = slider.querySelector(".logo-slider__next");

            const logoSlider = new Swiper(slider, {
                speed: 800,
                spaceBetween: 24,
                grabCursor: true,
                loop: true,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: next,
                    prevEl: prev,
                },
                breakpoints: {
                    576.98: {
                        slidesPerView: 2,
                    },
                    991.98: {
                        slidesPerView: 3,
                    },
                },
            });
        });
    }

    if (document.querySelectorAll(".product-care")) {
        document.querySelectorAll(".product-care").forEach((careSection) => {
            const prev = careSection.querySelector(".product-care__prev");
            const next = careSection.querySelector(".product-care__next");
            const careSlider = careSection.querySelector(".care-slider");

            new Swiper(careSlider, {
                speed: 800,
                spaceBetween: 24,
                grabCursor: true,
                simulateTouch: true,
                watchSlidesProgress: true,
                slidesPerView: "auto",
                navigation: {
                    nextEl: next,
                    prevEl: prev,
                },
                // breakpoints: {
                //     576.98: {
                //         slidesPerView: 2,
                //     },
                //     991.98: {
                //         slidesPerView: 3,
                //     },
                //     1199.98: {
                //         slidesPerView: 4,
                //     },
                // },
            });
        });
    }

    if (document.querySelector(".recommendations-slider")) {
        const recommendationsSlider = new Swiper(".recommendations-slider", {
            speed: 800,
            spaceBetween: 24,
            grabCursor: true,
            simulateTouch: true,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".recommendations__next",
                prevEl: ".recommendations__prev",
            },
            breakpoints: {
                576.98: {
                    slidesPerView: 2,
                },
                991.98: {
                    slidesPerView: 3,
                },
                1199.98: {
                    slidesPerView: 4,
                },
            },
        });
    }

    if (document.querySelector(".details-slider")) {
        const detailsSlider = new Swiper(".details-slider", {
            speed: 800,
            spaceBetween: 24,
            grabCursor: true,

            watchSlidesProgress: true,
            navigation: {
                nextEl: ".details-slider__next",
                prevEl: ".details-slider__prev",
            },
            pagination: {
                el: ".details-slider__pagination",
                type: "fraction",
                renderFraction: function (currentClass, totalClass) {
                    return ` <span class="${currentClass}"></span> / <span class="${totalClass}"></span>
                        `;
                },
            },
            breakpoints: {
                576.98: {
                    slidesPerView: 1.5,
                },
            },
        });

        const detailsBtns = document.querySelectorAll("[data-details]");
        if (detailsBtns) {
            detailsBtns.forEach((detailsBtn) => {
                detailsBtn.addEventListener("click", (e) => {
                    const target = e.target.closest("[data-details]");
                    const targetIndex = target.dataset.details;

                    detailsSlider.slideTo(targetIndex);
                });
            });
        }
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

    /* prohibition of entering numbers */
    document.querySelectorAll("input[name='name']").forEach((input) => {
        input.addEventListener("keypress", (e) => {
            if ("1234567890".indexOf(e.key) != -1) e.preventDefault();
        });
    });

    /* inputmask */
    document.querySelectorAll('input[type="tel"]').forEach((input) => {
        var im = new Inputmask("+7 (999) 999-99-99");
        im.mask(input);
    });

    function getDiscussion(target) {
        const discussionBtn = target;
        const discussionBtnText = discussionBtn.querySelector(
            ".comments__item-action"
        );
        const commentsParent = discussionBtn.parentNode;
        const discussionBlock = commentsParent.nextElementSibling;

        discussionBtn.classList.toggle("comments__item-btn_discussion-hidden");
        discussionBtn.classList.add("pending");

        if (
            discussionBtn.classList.contains(
                "comments__item-btn_discussion-hidden"
            )
        ) {
            discussionBtnText.textContent = "Показать";
        } else {
            discussionBtnText.textContent = "Скрыть";
        }

        slide.slideToggle(discussionBlock).then((res) => {
            if (res) {
                discussionBtn.classList.remove("pending");
            }
        });
    }

    function popupOpen(curentPopup) {
        if (curentPopup) {
            const popupActive = document.querySelector(".popup.open");
            if (popupActive) {
                popupClose(popupActive);
            } else {
                bodyLocking();
            }
            curentPopup.classList.add("open");
        }
    }

    function popupClose(popupActive) {
        popupActive.classList.remove("open");
        bodyLocking();
    }

    function bodyLocking() {
        let lockPaddingValue = document.body.classList.contains("lock")
            ? "0px"
            : window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px";
        document.body.style.paddingRight = lockPaddingValue;
        document.body.classList.toggle("lock");
    }
});
