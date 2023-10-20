import {setupEventHandlers} from './3d-scroll.js';

function getProducts() {
    fetch('/server/get_products.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);
            return response.json();
        })
        .then(products => displayProducts(products))
        .then(() => setupEventHandlers())
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
                    <div class="frame__media frame__media_${i % 2 === 0 ? 'right' : 'left'}" style="background-image:url(${product.image_url})"></div>
                </div>
                </div>
                <div class="frame frame_bg">
                <div class="frame__content text-${i % 2 === 0 ? 'left' : 'right'}">
                    <h3>${product.product_name}</h3>
                    <ul>
                        <li class="frame__shop-price">${product.price}</li>
                        <li>${product.description}</li>
                        <li>Size: ${product.size}cm</li>
                    </ul>
                    <button class="frame__shop-button" ${i % 2 === 0 ? 'frame__shop-button-left' : ''} type="button">Add to cart</button>
                </div>
                </div>
            </div>
        `
        lastChild.insertAdjacentHTML('beforebegin', productsHtml);
    }
}

document.addEventListener('DOMContentLoaded', getProducts)

aw