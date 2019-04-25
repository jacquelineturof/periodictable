const elements = document.querySelectorAll('.element');
const container_ol = document.querySelector('.container__overlay');

elements.forEach( (element, index) => {
    element.addEventListener("click", async (e) => {
        // grey out page before displaying modal
        container_ol.classList.remove('hidden');
        // Send text to append to modal
        const element = elements[index];
        const elementAtomicNumber = element.childNodes[1].innerText;
        // const elementSymbol = element.childNodes[3].innerText;
        // const elementAtomicWeight = element.childNodes[5].innerText;
        const elementBackgroundColor = element.classList[1];
        const modal = createModal();
        // add to DOM
        container_ol.appendChild(modal);

        // show spinner until we have data
        showSpinner(modal);
        // make data call
        // once data call finished
        // remove spinne
        const data = await getData(elementAtomicNumber, modal);
        // add data
        createBlock(modal, data, elementBackgroundColor);

    });
});

// create element block
// atomic number, symbol, atomic weight, bonding states
const createBlock = (modal, data, bgClass) => {
    // This container is for later dev
    // so we can create other elements on the div
    const card = document.createElement('div');
    const front_side = document.createElement('div');
    
    // data_container.classList.add('card');
    // card__side card__side--front
    card.classList.add('card');

    front_side.classList.add('element__block', bgClass, 
        'card__side', 'card__side--front');
    
    // create new div back side
    const back_side = document.createElement('div');
    back_side.classList.add('card__side', 'card__side--back', 'card__side--back-1', bgClass);
    
    // Build the card
    card.appendChild(front_side);
    card.appendChild(back_side);
    modal.appendChild(card);
    

    // oxidation states
    
    const oxidationStates = data.oxidationStates.toString().split(',');
    const oxidationStatesList = document.createElement('ul');
    oxidationStatesList.classList.add('element__data--oxidation-states');
    front_side.appendChild(oxidationStatesList);
    oxidationStates.forEach((oxidationState, index) => {
        const oxidationStateLi = createDataLi(index, oxidationStates, oxidationStatesList);
        oxidationStateLi.classList.add('element__data--oxidation-state');
    });

    const dataListFront = document.createElement('ul');
    dataListFront.classList.add('element__data');
    front_side.appendChild(dataListFront);
    
    // atomic number
    createDataLi('atomicNumber', data, dataListFront);
    
    // symbol
    createDataLi('symbol', data, dataListFront);

    // atomic weight
    createDataLi('atomicMass', data, dataListFront);

    const dataListBack = document.createElement('ul');
    dataListBack.classList.add('element__data');
    back_side.appendChild(dataListBack);

    // electronic Configuration
    createDataLi('electronicConfiguration', data, dataListBack);

    // bonding type
    createDataLi('bondingType', data, dataListBack);
    
    // Full Name
    createDataLi('name', data, dataListBack);
};

// Creates data li element
// propertyName: string 
// data: obj
// dataList: ul
const createDataLi = (propertyName, data, dataList) => {
    const newDataElement = document.createElement('li');
    newDataElement.innerText = data[propertyName];
    dataList.appendChild(newDataElement);

    // return li so we can add a new css class if needed
    return newDataElement;
};

const createModal = () => {
    const modal = document.createElement('div');
    const icon = createCloseIcon(modal);

    modal.appendChild(icon);
    modal.classList.add('modal');

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

const showSpinner = (modal) => {
    // append spinner to modal
    const spinner = document.createElement('i');
    
    spinner.classList.add('fas', 'fa-atom', 'spinner1');
    
    modal.appendChild(spinner);
};

const getData = (atomicNumber, modal) => {
    const spinner = document.querySelector('.spinner1');
    return $.get(`https://neelpatel05.pythonanywhere.com/element/atomicnumber?atomicnumber=${atomicNumber}`)
        .done(function(data) {
            modal.removeChild(spinner);
            return data;
        });
};

// const createModal = async (elementSymbol, elementAtomicNumber, 
//                      elementAtomicWeight, elementBackgroundColor) => {
//     // create modal
//     const modal = document.createElement('div');
//     const icon = createCloseIcon(modal);   
//     const symbolSpan = createTextNode(elementSymbol);
//     const atomicNumberSpan = createTextNode(elementAtomicNumber);
//     const atomicWeightSpan = createTextNode(elementAtomicWeight);
//     const elementDiv = createElementBlock();
//     const dataDiv = document.createElement('div');

//     // Create Modal, append to Dom,
//     // show spinner until we load data
//     // then load data div
//     modal.classList.add('modal');

//     // Get data
//     // Display spinner while getting data
//     // show data once it's loaded...
//     // My comments are so useless...
//     const data = await getData(elementAtomicNumber);

    
//     dataDiv.classList.add('element__data');

//     elementDiv.appendChild(icon);
//     elementDiv.appendChild(dataDiv);
    
//     dataDiv.appendChild(atomicNumberSpan);
//     dataDiv.appendChild(symbolSpan);
//     dataDiv.appendChild(atomicWeightSpan);
    
//     elementDiv.classList.add(elementBackgroundColor); // add appropiate background color from e.target
//     modal.appendChild(elementDiv);

//     return modal;
// };

// const createCloseIcon = (modal) => {
//     const icon = document.createElement('i');
//     icon.classList.add('fas', 'fa-times',  'modal__icon');
//     icon.addEventListener("click", () => {
//         // remove modal and overlay from dom
//         container_ol.removeChild(modal);
//         container_ol.classList.add('hidden');
//     });
    
//     return icon;
// };

// const createTextNode = (elementSymbol) => {
//     const textSpan = document.createElement('span');
//     textSpan.classList.add('modal__heading');
//     const text = document.createTextNode(elementSymbol);
//     textSpan.appendChild(text);

//     return textSpan;
// };

// const createElementBlock = () => {
//     const elementDiv = document.createElement('div');
//     elementDiv.classList.add('element__block')
    
//     return elementDiv;
// };



// const showSpinner = () => {
//     const spinnerModal = document.createElement('div');
//     const spinner = document.createElement('i');
    
//     // Display overlay
//     container_ol.classList.remove('hidden');

//     spinnerModal.classList.add('modal__spinner');
//     spinner.classList.add('fas', 'fa-atom', 'spinner1');

//     // append modal to the overlay
//     spinnerModal.appendChild(spinner);
//     container_ol.appendChild(spinnerModal);
// };

// const removeSpinner = () => {
//     const spinnerModal = document.querySelector('.modal__spinner');
//     spinnerModal.removeChild(spinner);
//     container_ol.removeChild(spinnerModal);
//     container_ol.classList.add('hidden');
// };

// const displayData = () => {

// };
