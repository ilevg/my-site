import {setupEventHandlers} from './3d-scroll.js'
import {productsToCart} from './products-cart.js'
import {removeCartProduct} from './product-cart-remove.js';
import { checkUserLoggedIn } from './check-user-logged-in.js'

//add cart 
import {loadSection} from './add-sections.js'
import {cartVisible} from './shop.js'

//import shop img
import '../../asset/img/shop-img/delete-icon.webp'
import '../../asset/img/shop-img/picture-1.webp'
import '../../asset/img/shop-img/picture-2.webp'
import '../../asset/img/shop-img/picture-3.webp'

const cartUrl = './cart.html',
    cartPlaceholder = document.querySelector('#cart-placeholder'),
    cartError = 'Cart loading error:'
if (cartPlaceholder) {
    loadSection(cartUrl, cartPlaceholder, cartError)
        .then(() => {
            cartVisible()
        })
        .catch((error) => {
            console.error('Error initializing cart:', error)
        })
}
//add products to shop.html
function displayProducts(products) {
    const container = document.querySelector('.content')
    const lastChild = container.lastElementChild
    for( let i = 0; i < Math.min(products.length, 3); i++) {
        const product = products[i]
        const productsHtml = `
            <div class="frame">
                <div class="frame__content">
                    <div data-image="${product.product_name}"class=" products-img frame__media frame__media_${i % 2 === 0 ? 'right' : 'left'}" style="background-image:url(${product.image_url})">
                    </div>
                </div>
            </div>
            <div class="frame frame_bg ">
                <div data-id="${product.id}" class="products frame__content text-${i % 2 === 0 ? 'left' : 'right'}">
                    <h3 class="products-name">${product.product_name}</h3>
                    <ul>
                        <li class="frame__shop-price products-price">${product.price}</li>
                        <li class="products-description">${product.description}</li>
                        <li class="products-size">Size: ${product.size}cm</li>
                    </ul>
                    <button class="frame__shop-button ${i % 2 === 0 ? 'frame__shop-button-left' : ''} ${product.ordered? product.ordered : ''}" type="button" aria-label="Add to cart">Add to cart</button>
                </div>
            </div>
        `
        lastChild.insertAdjacentHTML('beforebegin', productsHtml)
    }
}
function getProducts() {
    fetch('/server/get_products.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(products => {
            displayProducts(products)
            setupEventHandlers()
        })
        .then(() => {
            const productsButtonOrdered = document.querySelectorAll('.ordered')
            if(productsButtonOrdered) {
                productsButtonOrdered.forEach((button) => {
                    button.setAttribute('disabled', true)
                    button.textContent = 'Was booked'
                })
            }
        })
        .then(() => productsToCart())
        .then(() => {
            const cartWrapper = document.querySelector('.cart__wrapper')
            cartWrapper.addEventListener('click', (e) => {
                removeCartProduct(e, checkUserLoggedIn)
            })
        })
        .catch(error => console.error('Error fetching products: ', error))
}
getProducts()
// Scroll for setupEventHandlers
window.scrollTo(0, 10)
