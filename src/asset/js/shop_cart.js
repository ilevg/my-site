import '../css/modules-scss/header.scss';
import '../css/modules-scss/cart.scss';
import '../css/modules-scss/reset.css';


import '../../libs/particles/particles.js'

import {loadSection} from './add-sections.js';

import {headerFunction} from './add-header.js';



// //import individual style for page
import {importPageStyles} from './import-page-styles.js';
// add header
const urlHeader = './header.html', 
      placeholderHeader = document.querySelector('#header-placeholder'), 
      errorHeader = 'Header loading error:'
if(placeholderHeader){
    loadSection(urlHeader, placeholderHeader, errorHeader, headerFunction)

}

// add cart 
const cartUrl = './cart.html', 
      cartPlaceholder = document.querySelector('#cart-placeholder'),
      cartError = 'Cart loading error:'
if(cartPlaceholder){
    loadSection(cartUrl, cartPlaceholder, cartError, cartVisible)
}


// add footer
const urlFooter = './footer.html', 
      placeholderFooter = document.querySelector('#footer-placeholder'), 
      errorFooter = 'Footer loading error:'
if(placeholderFooter){
    loadSection(urlFooter, placeholderFooter, errorFooter)
}
import '../css/modules-scss/footer.scss';

// function for cart visible
export function cartVisible() {
    const cartSection = document.querySelector('.cart')
    const cartContainer = document.querySelector('.cart__content')
    const cart = document.querySelector('.cart__wrapper')
    const cartButton = document.querySelector('.cart__icon-img')
    

    cartSection.addEventListener('click', function(e) {
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
