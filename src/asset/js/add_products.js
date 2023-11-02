import {setupEventHandlers} from './3d-scroll.js';
import {productsToCart} from './cart-products.js';

function getProducts() {
    fetch('/server/get_products.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            displayProducts(products);
            setupEventHandlers()
        })
        .then(() => productsToCart())
        .catch(error => console.error('Error fetching products: ', error));
}
//add products to shop.html
function displayProducts(products) {
    const container = document.querySelector('.content');
    const lastChild = container.lastElementChild;
    for( let i = 0; i < Math.min(products.length, 3); i++) {
        const product = products[i];
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
                    <button class="frame__shop-button" ${i % 2 === 0 ? 'frame__shop-button-left' : ''} type="button">Add to cart</button>
                </div>
            </div>
        `
        lastChild.insertAdjacentHTML('beforebegin', productsHtml)
    }
}

document.addEventListener('DOMContentLoaded', getProducts)