import tabs from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import { openModal } from './modules/modal';

const modalTimerId = setTimeout( () => openModal('.modal', modalTimerId), 50000);

tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
calc();
cards();
forms('form', '.modal', modalTimerId);
modal('[data-modal]', '.modal', modalTimerId);
timer('.timer', '2023-09-06');
slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slide',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer_slider-inner',
});
