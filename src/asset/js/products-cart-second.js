import {loadSection} from './add-sections.js'
import {cartVisible} from './shop.js'
import { productsToCart } from './products-cart.js'

import { checkUserLoggedIn } from './check-user-logged-in.js'
import {removeCartProduct} from './product-cart-remove.js';
//add cart 
function initCart() {
    const cartUrl = './cart.html',
        cartPlaceholder = document.querySelector('#cart-placeholder'),
        cartError = 'Cart loading error:'
    if (cartPlaceholder) {
        loadSection(cartUrl, cartPlaceholder, cartError)
            .then(() => {
                cartVisible()
            })
            .then(() => {
                productsToCart()
            })
            .then(() => {
                const cartWrapper = document.querySelector('.cart__wrapper')
                cartWrapper.addEventListener('click', (e) => {
                    removeCartProduct(e, checkUserLoggedIn)
                })
            })
            .catch((error) => {
                console.error('Error initializing cart:', error)
            })
    }
}
initCart()