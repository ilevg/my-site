import '../css/pages-scss/shop.scss';
import '../css/modules-scss/reset.css';

import {loadSection} from './add-sections.js';
import {cartVisible} from './shop_cart.js';

// add cart 
const cartUrl = './cart.html', 
      cartPlaceholder = document.querySelector('#cart-placeholder'),
      cartError = 'Cart loading error:'
if(cartPlaceholder){
    loadSection(cartUrl, cartPlaceholder, cartError, cartVisible)
}






