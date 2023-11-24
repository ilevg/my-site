import { checkUserLoggedIn } from './check-user-logged-in.js';
import {cartState, getProductsForCart} from './get-products-for-cart.js';

export function productsToCart() {
    const cartContainer = document.querySelector('.cart__tbody'),
        cartTableTitle = cartContainer.querySelector('.cart__table__title'),
        cartSubtext = cartContainer.querySelector('.cart__subtext'),
        cartButton = document.querySelector('.cart__button'),
        cartTotal = cartContainer.querySelector('.cart__total'),
        cartTotalPrice = cartContainer.querySelector('.cart__total-price') || document.querySelector('.checkout__price');
    
    const productsList = document.querySelectorAll('.products');

    document.body.addEventListener('click', async (event) => {
        const button = event.target.closest('.frame__shop-button') || event.target.closest('.frame__shop-button-left');
        if (button) {
            await addToCart(button);
        } else {
            console.log('click');
        }
    });

    const addToCart = async (button) => {
        const isUserLoggedIn = await checkUserLoggedIn();
        let userId = isUserLoggedIn.id;
        const productInfo = getProductInfo(button, userId);

        // Если пользователь зарегистрирован, отправляем данные на сервер
        const cartHTML = `
            <tr>
                <td>
                    <img class="cart__product-img" src="${productInfo.image}" alt="${productInfo.name}">
                </td>
                <td>
                    <ul>
                        <li>${productInfo.name}</li>
                        <li>${productInfo.description}</li>
                        <li>${productInfo.size}</li>
                    </ul>
                </td>
                <td>€${productInfo.price}</td>
                <td>
                    <img class="cart__delete-icon" src="/img/delete-icon.png" alt="delete">
                </td>
            </tr>`;

        if (isUserLoggedIn) {
            sendToServer(productInfo).then(res => {
                if (res.status) {
                    updateCart(cartHTML, productInfo.price);
                    button.innerHTML = 'Added!';
                    button.classList.add('added');
                }
            });
        } else {
            // Если пользователь не зарегистрирован, сохраняем в локальное хранилище
            let localStorageResult = addToLocalStorage(productInfo);
            if (localStorageResult) {
                updateCart(cartHTML, productInfo.price);
                button.innerHTML = 'Added!';
                button.classList.add('added');
            }
        }
    };

    const getProductInfo = (button, userId) => {
        const productInfo = button.closest('.products'),
            productId = productInfo.getAttribute('data-id'),
            productName = productInfo.querySelector('.products-name').innerText,
            productImg = document.querySelector(`[data-image="${productName}"]`) || productInfo.querySelector('.collection-img.products-img');
        
        let productImgUrl;
        if (productInfo) {
            let styles = getComputedStyle(productImg);
            productImgUrl = styles.backgroundImage;
            if (productImgUrl == 'none') {
                let srcImg = productImg.getAttribute('src');
                productImgUrl = srcImg;
            } else {
                let urlMatch = productImgUrl.match(/url\(["']?(.*?)["']?\)/);
                if (urlMatch && urlMatch[1]) {
                    productImgUrl = urlMatch[1];
                }
            }
            let productInfoArr = {
                userId: userId,
                productId: productId,
                image: productImgUrl,
                name: productName,
                price: productInfo.querySelector('.products-price').innerText,
                description: productInfo.querySelector('.products-description').innerText,
                size: productInfo.querySelector('.products-size').innerText,
            };
            return productInfoArr;
        } else {
            console.error('Product info not found');
            return null;
        }
    };
    
    const addToLocalStorage = (productInfo) => {
        let localStorArr = JSON.parse(localStorage.getItem('localStorArr')) || [];
        if (!localStorArr.some(item => item.productId === productInfo.productId)) {
            localStorArr.push(productInfo);
            localStorage.setItem('localStorArr', JSON.stringify(localStorArr));
            return true;
        } else {
            return false;
        }
    };

    const sendToServer = async (productInfo) => {
        return fetch('/server/cart_products_to_db.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productInfo),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const updateCart = (cartHTML, productPrice) => {
        cartTableTitle.style.visibility = 'visible';
        cartTotal.style.visibility = 'visible';
        cartButton.style.visibility = 'visible';
        cartSubtext.style.display = 'none';
        cartTotal.insertAdjacentHTML('beforebegin', cartHTML);
        cartState.totalPriceValue += parseInt(productPrice);
        cartTotalPrice.innerHTML = '€' + cartState.totalPriceValue;
    };

    // update products in cart
    getProductsForCart(
        cartTableTitle, 
        cartTotal, 
        cartButton, 
        cartSubtext, 
        cartTotalPrice, 
        checkUserLoggedIn, 
        productsList);
}
