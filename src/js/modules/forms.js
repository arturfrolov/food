import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalSelector, modalTimerId) {
    // Forms

    const forms = document.querySelectorAll(formSelector);

    const messages = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...',
    }

    forms.forEach(item => {
        bindPostData(item);
    });


    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.setAttribute('src', messages.loading);
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });

            // const json = JSON.stringify(object);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // request.send(formData);
            // request.send(json);

            // fetch('server.php', {
            //     method: 'POST',
            //     // body: formData,
            //     body: json,
            //     headers: {
            //         'Content-type': 'application/json',
            //     },
            // })

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(messages.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(messages.failure);
            })
            .finally(() => {
                form.reset();
            })

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(messages.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(messages.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal(modalSelector, modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            closeModal(modalSelector);
        }, 5000);
    }

    fetch('http://localhost:3000/menu')
    .then(response => response.json())
    .then(data => console.log(data))
}

export default forms;