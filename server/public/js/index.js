const elements = document.querySelectorAll('.element');
const container_ol = document.querySelector('.container__overlay');

elements.forEach(element => {
    element.addEventListener("click", (e) => {
        
        // grey out page before displaying modal
        container_ol.classList.remove('hidden');
        // Send text to append to modal
        const elementSymbol = e.target.innerText;
        // The second class set will always be the background color.
        // element.scss
        const elementBackgroundColor = e.target.classList[1];
        
        const modal = createModal(elementSymbol, elementBackgroundColor);
        // add to DOM
        container_ol.appendChild(modal);
    });
});

const createModal = (elementSymbol, elementBackgroundColor) => {
    // create modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const icon = createCloseIcon(modal);
    const textSpan = createTextNode(elementSymbol);
    const elementDiv = createElementBlock();
    elementDiv.appendChild(textSpan);
    elementDiv.appendChild(icon);
    elementDiv.classList.add(elementBackgroundColor); // add appropiate background color from e.target
    modal.appendChild(elementDiv);
    
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

const createTextNode = (elementSymbol) => {
    const textSpan = document.createElement('span');
    textSpan.classList.add('modal__heading');
    const text = document.createTextNode(elementSymbol);
    textSpan.appendChild(text);

    return textSpan;
};

const createElementBlock = () => {
    const elementDiv = document.createElement('div');
    elementDiv.classList.add('element__block')
    return elementDiv;
};