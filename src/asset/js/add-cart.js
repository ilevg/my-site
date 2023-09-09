import loadSections from './add-sections.js';

const url = '../../../src/html/shop/cart.html';
const errMessage = 'Error loading cart:';

function afterSectionLoaded() {
    cartVisible();
}
loadSections(url, errMessage, afterSectionLoaded)

// function for cart visible
function cartVisible() {
    const cartContainer = document.querySelector('.cart__container')
    const cart = document.querySelector('.cart')
    const cartButton = document.querySelector('.cart__logo')

    window.addEventListener('click', function(e) {
        let target = e.target;
        if(target == cartButton) {
            cartContainer.style.right =  '0';
            cart.style.right =  '0';
            document.body.style.overflow = 'hidden'
            document.body.style.marginRight = '8px'
        } else if (target == cartContainer ){
            cartContainer.style.right =  '';
            cart.style.right =  '';
            document.body.style.overflow = ''
            document.body.style.marginRight = '0'
        } 
    })
}
