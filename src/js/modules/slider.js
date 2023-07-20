function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider

    const slider = document.querySelector(container);
    const slidesWrapper = slider.querySelector(wrapper);
    const slidesField = slider.querySelector(field);
    const slides = slider.querySelectorAll(slide);
    const next = document.querySelector(nextArrow);
    const prev = document.querySelector(prevArrow);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => {
    //         item.style.display = 'none';
    //     });
    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slideIndex < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // showSlides(slideIndex);

    // next.addEventListener('click', () => {
    //     showSlides(slideIndex = slideIndex + 1);
    // });

    // prev.addEventListener('click', () => {
    //     showSlides(slideIndex = slideIndex - 1);
    // });

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        slideIndex < 10 ? current.textContent = `0${slideIndex}` : current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    })

    slider.style.position = 'relative';

    const dots = document.createElement('ol');
    const dotsArr = [];
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if (i === 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsArr.push(dot);
    }

    function checkCurrentSlideNumber() {
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function checkCurrentSlidetDot() {
        dotsArr.forEach(dot => dot.style.opacity = '0.5');
        dotsArr[slideIndex - 1].style.opacity = 1;
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else { 
            slideIndex++;
        }

        checkCurrentSlideNumber();

        checkCurrentSlidetDot();
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else { 
            slideIndex--;
        }

        checkCurrentSlideNumber();

        checkCurrentSlidetDot();
    });

    dotsArr.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            slideIndex = +slideTo;
            checkCurrentSlideNumber();

            offset = deleteNotDigits(width) * (slideTo - 1)
            slidesField.style.transform = `translateX(-${offset}px)`;

            checkCurrentSlidetDot();
        });
    });
}

export default slider;