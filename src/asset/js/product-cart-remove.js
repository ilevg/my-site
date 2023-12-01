import {cartState} from './get-products-for-cart.js'

export async function removeCartProduct(e, callback) {
    try {
        const isUserLoggedIn = await callback()
        const userId = isUserLoggedIn?.id
        const target = e.target.closest('.cart__delete-icon')

        if (target) {
            const buttonToCheckout = document.querySelector('.cart__button')

            const product = target.closest('tr'),
                productId = product.getAttribute('data-product'),
                productPriceEl = product.querySelector('.cart__product__price-value'),
                productPrice = parseFloat(productPriceEl.textContent.replace(/[^\d.]/g, ''))

            const totalEl = document.querySelector('.cart__total-price')
            let totalValue = parseFloat(totalEl.textContent.replace(/[^\d.]/g, ''))

            const allProducts = document.querySelectorAll('.products'),
                productIdPageSet = new Set([...allProducts].map(product => product.getAttribute('data-id')))
            if (userId) {
                await removeFromServer(productId, userId)
            } else {
                removeFromLocalStorage(productId)
            }
            // Update total value after successful server request
            cartState.totalPriceValue -= productPrice
            totalValue -= productPrice;
            totalEl.textContent = '€' + totalValue;
            // Remove the corresponding HTML element
            product.remove();
            if (productIdPageSet.has(productId)) {
                updateProductButton(productId);
            }
            if(totalEl.textContent === "€0") {
                buttonToCheckout.style.visibility = 'hidden'
            } else {
                buttonToCheckout.style.visibility = 'visible'
            }
        }
    } catch (error) {
        console.error('Error:', error)
    }
}
async function removeFromServer(productId, userId) {
    const response = await fetch('/server/remove_product_from_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId,
            userId,
        }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    await response.json()
}
function removeFromLocalStorage(productId) {
    const localStorArr = JSON.parse(localStorage.getItem('localStorArr')) || []
    const indexToRemove = localStorArr.findIndex(item => item.productId === productId)
    if (indexToRemove !== -1) {
        localStorArr.splice(indexToRemove, 1)
        localStorage.setItem('localStorArr', JSON.stringify(localStorArr))
    } else {
        console.warn('Продукт с указанным ID не найден в Local Storage')
    }
}
function updateProductButton(productId) {
    const button = document.querySelector(`.products[data-id="${productId}"] .frame__shop-button`)
    if (button) {
        button.classList.remove('added')
        button.textContent = 'Add to cart'
    }
}
