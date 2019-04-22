const elements = document.querySelectorAll('.element');
const container_ol = document.querySelector('.container__overlay');

elements.forEach(element => {
    element.addEventListener("click", (e) => {
        
        // grey out page before displaying modal
        container_ol.classList.remove('hidden');
        // Send text to append to modal
        const elementSymbol = e.target.innerText;
        const modal = createModal(elementSymbol);
        // add to DOM
        container_ol.appendChild(modal);
    });
});

const createModal = (elementSymbol) => {
    // create modal
    const modal = document.createElement('div');
    // const elementSymbol = e.target.innerText;
    modal.classList.add('modal');
    // modal.innerText = elementSymbol;
    const icon = createCloseIcon(modal);
    const textSpan = document.createElement('span');
    textSpan.classList.add('center-text', 'modal__heading');
    const text = document.createTextNode(elementSymbol);
    textSpan.appendChild(text);
    
    modal.appendChild(textSpan);
    modal.appendChild(icon);

    return modal;
};

const createCloseIcon = (modal) => {
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-times',  'modal__icon');
    icon.addEventListener("click", () => {
        // remove modal and overlay from dom
        container_ol.removeChild(modal);
        container_ol.classList.add('hidden');
    });
    
    return icon;
};