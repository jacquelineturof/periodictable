const elements = document.querySelectorAll('.element');
const container_ol = document.querySelector('.container__overlay');

elements.forEach( (element, index) => {
    element.addEventListener("click", (e) => {
        
        // grey out page before displaying modal
        container_ol.classList.remove('hidden');
        // Send text to append to modal
        const element = elements[index];
        console.log(element.childNodes[1].innerText);
        const elementSymbol = element.childNodes[1].innerText;
        const elementAtomicNumber = element.childNodes[3].innerText;
        const elementAtomicWeight = element.childNodes[5].innerText;
        const elementBackgroundColor = elements[index].classList[1];
        const modal = createModal(elementSymbol, elementAtomicNumber, elementAtomicWeight, elementBackgroundColor);
        // add to DOM
        container_ol.appendChild(modal);
    });
});

const createModal = (elementSymbol, elementAtomicNumber, elementAtomicWeight, elementBackgroundColor) => {
    // create modal
    const modal = document.createElement('div');    const icon = createCloseIcon(modal);
    const symbolSpan = createTextNode(elementSymbol);
    const atomicNumberSpan = createTextNode(elementAtomicNumber);
    const atomicWeightSpan = createTextNode(elementAtomicWeight);
    const elementDiv = createElementBlock();
    const dataDiv = document.createElement('div');
    const spinner = document.createElement('div');

    modal.classList.add('modal');
    dataDiv.classList.add('element__data');
    spinner.classList.add('spinner', 'hidden');

    elementDiv.appendChild(icon);
    elementDiv.appendChild(dataDiv);
    
    dataDiv.appendChild(atomicNumberSpan);
    dataDiv.appendChild(symbolSpan);
    dataDiv.appendChild(atomicWeightSpan);
    dataDiv.appendChild(spinner);
    
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