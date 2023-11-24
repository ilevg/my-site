//add cart 
import {productsToCart} from './products-cart.js'
import { checkUserLoggedIn } from './check-user-logged-in.js'

import {loadSection} from './add-sections.js'
import {cartVisible} from './shop.js'

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

document.addEventListener('DOMContentLoaded', getProducts)
const itemsPerPage = 8
let currentPage = 1
let currentProducts = []
const currentPageElem = document.querySelector('.collection__page-current')
const allPagesElem = document.querySelector('.collection__page-all')
currentPageElem.innerHTML = currentPage
function displayProducts() {
    const container = document.querySelector('.collection__items')
    container.innerHTML = ''

    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage

    const currentProductsOnPage = currentProducts.slice(start, end)

    for (let i = 0; i < currentProductsOnPage.length; i++) {
        const product = currentProductsOnPage[i]
        const productsHtml = `
            <div data-id="${product.id}" class="collection__item products">
                <div class="collection__container-img">
                    <img class="collection-img products-img" src="${product.image_url}" alt="${product.product_name}">
                </div>
                <h3 class="products-name">${product.product_name}</h3>
                    <ul>
                        <li class="frame__shop-price products-price">${product.price}</li>
                        <li class="products-description">${product.description}</li>
                        <li class="products-size">Size: ${product.size}cm</li>
                    </ul>
                <button class="frame__shop-button ${product.ordered? product.ordered : ''}" type="button">Add to cart</button>
            </div>
        `
        container.insertAdjacentHTML('beforeend', productsHtml)

        setTimeout(() => {
            const allItems = container.querySelectorAll('.collection__item')
            allItems.forEach(item => item.classList.add('active'))
        }, 10 * i)
    }
}
function disabledOrderedButton() {
    const productsButtonOrdered = document.querySelectorAll('.ordered')
    if(productsButtonOrdered) {
        productsButtonOrdered.forEach((button) => {
            button.setAttribute('disabled', true)
            button.textContent = 'Was booked'
        })
    }
}
function prevPage() {
    if (currentPage > 1) {
        currentPage--
        currentPageElem.innerHTML = currentPage
        window.scrollTo({ top: 0, behavior: 'smooth' })
        displayProducts()
    }
}
function nextPage() {
    const totalPages = Math.ceil(currentProducts.length / itemsPerPage)
    if (currentPage < totalPages) {
        currentPage++
        currentPageElem.innerHTML = currentPage
        window.scrollTo({ top: 0, behavior: 'smooth' })
        displayProducts()
    }
}
function setupPagination() {
    document.querySelector('.collection__pagination-prev').addEventListener('click', () => {
        prevPage() 
        disabledOrderedButton()
        changeAddedButton(checkUserLoggedIn)

    })
    document.querySelector('.collection__pagination-next').addEventListener('click', () => {
        nextPage() 
        disabledOrderedButton()
        changeAddedButton(checkUserLoggedIn)
    })
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
            currentProducts = products
            displayProducts()
            setupPagination()
            allPagesElem.innerHTML = Math.ceil(currentProducts.length / itemsPerPage)
        })
        .then(() => {
            disabledOrderedButton()
        })
        .then(() => productsToCart())
        .catch(error => console.error('Error fetching products: ', error))
}

async function changeAddedButton(callback) {
    const productsList = document.querySelectorAll('.products')
    function changeStyleprodButton(productId) {
        if (productsList) {
            productsList.forEach(item => {
                const pageProductId = item.getAttribute('data-id')
                if (pageProductId == productId) {
                    let productButton = item.querySelector('.frame__shop-button, .frame__shop-button-left')
                    productButton.innerHTML = 'Added!'
                    productButton.classList.add('added')
                }
            })
        }
    }
    // add products to cart from DB
    async function getProductsFromDB() {
        try {
            const isUserLoggedIn = await callback()
            let userId = isUserLoggedIn ? isUserLoggedIn.id : null
            const response = await fetch('/server/cart_all_products.php')
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const products = await response.json()
            products.forEach(product => {
                if (product.user_id == userId) {
                    cartState.totalPriceValue += parseInt(product.price)
                    changeStyleprodButton(product.product_id, productsList)
                }
            })
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }
    getProductsFromDB()
    async function getProductsFromLS() {
        const isUserLoggedIn = await callback()
        if (!isUserLoggedIn) {
            const localStorProds = JSON.parse(localStorage.getItem('localStorArr')) || []
            if (localStorProds.length > 0) {
                localStorProds.forEach(product => {       
                    changeStyleprodButton(product.productId, productsList)
                })
            }
        }
    }
    getProductsFromLS()
}
