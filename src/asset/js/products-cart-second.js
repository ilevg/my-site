import {loadSection} from './add-sections.js'
import {cartVisible} from './shop.js'
import { productsToCart } from './products-cart.js'
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
            .catch((error) => {
                console.error('Error initializing cart:', error)
            })
    }
}
initCart()