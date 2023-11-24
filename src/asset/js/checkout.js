//Add products details
import { checkUserLoggedIn } from './check-user-logged-in.js'
import {cartState, getProductsForCart} from './get-products-for-cart.js'

document.addEventListener('DOMContentLoaded', function () {
    const subTotalEl = document.querySelector('.checkout__subtotal')
    const subtotalValueEl = document.querySelector('.checkout__subtotal-value')
    const shippingValueEl = document.querySelector('.checkout__shipping-value')
    const totalValueEl = document.querySelector('.checkout__total-value')
    
    const countrySelect = document.querySelector('.checkout__country-select')
    const uaShippingMethod = document.querySelectorAll('.checkout__shiping-ua')
    const plShippingMethod = document.querySelectorAll('.checkout__shiping-pl')
    const shippingMethod = document.querySelectorAll('.shipping_method')

    async function addProductInfo() {
        await getProductsForCart(null, subTotalEl, null, null, subtotalValueEl, checkUserLoggedIn, null)
        changeProductDetails()
    }
    function changeProductDetails() {
        setTimeout(function () {
            const shippingValue = parseFloat(shippingValueEl?.innerText.replaceAll('€', '').trim()) || 0
            const subtotalValue = parseFloat(subtotalValueEl?.innerText.replaceAll('€', '').trim()) || 0
            const totalValue = shippingValue + subtotalValue
            const deleteImg = document.querySelectorAll('.cart__delete-icon')
            const allProducts = document.querySelectorAll('.products')
            let productIdArr = []

            if (deleteImg.length > 0) {
                deleteImg.forEach((item) => {
                    item.style.display = 'none'
                })
            }
            totalValueEl.textContent = '€' + totalValue

            function changeShippingPrice() {
                shippingMethod.forEach(item => {
                    item.addEventListener('click', () => {
                        const floatValue = parseFloat(item.value.match(/[\d.]+/)[0]) || 0
                        shippingValueEl.textContent = '€' + floatValue
            
                        let totalValue = floatValue + subtotalValue
                        totalValueEl.textContent = '€' + totalValue
                    })
                })
            }
            changeShippingPrice()
            function changeShipping() {
                const totalValue = subtotalValue - shippingValue
                if(countrySelect) {
                    if (countrySelect.value === 'pl') {
                        totalValueEl.textContent = '€' + totalValue
                        shippingValueEl.textContent = '€00.00'
                        
                        uaShippingMethod.forEach((item) => {
                            item.closest('.checkout__input').style.display = 'none'
                            item.removeAttribute('required')
                        })
                        plShippingMethod.forEach((item) => {
                            item.closest('.checkout__input').style.display = 'flex'
                            item.setAttribute('required', '')
                        })
                    }
                    if (countrySelect.value === 'ua') {
                        totalValueEl.textContent = '€' + totalValue
                        shippingValueEl.textContent = '€00.00'
            
                        plShippingMethod.forEach((item) => {
                            item.closest('.checkout__input').style.display = 'none'
                            item.removeAttribute('required')
                        })
                        uaShippingMethod.forEach((item) => {
                            item.closest('.checkout__input').style.display = 'flex'
                            item.setAttribute('required', '')
                        })
                    }
                }
            }
            changeShipping()

            function addProdDetailsToForm() {
                const formUserId = document.getElementById('user_id')
                const formProductId = document.getElementById('product_id')
                const payContainer = document.querySelector('.pay')
                let userId
                if (allProducts) {
                    allProducts.forEach(item => {
                        const porductId = item.getAttribute('data-product')
                        if(formUserId) {
                            userId = item.getAttribute('data-user')
                        }
                        productIdArr.push(porductId)
                    })
                    let productIdString = productIdArr.join(',')
                    if(formUserId) {
                        formUserId.setAttribute('value', userId)
                        formProductId.setAttribute('value', productIdString) 
                    }
                }
                function payOrderInfo() {
                    const url = '/server/pay_page.php'
                    const data = {productIds: productIdArr}
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                        .then(response => {
                            if(!response.ok) {
                                throw new Error(`Network response was not ok: ${response.status}`)
                            }
                            return response.json()
                        })
                        .then(responseObj => {
                            const payOrderId = document.querySelector('.pay__order-id')
                            const payOrderDate = document.querySelector('.pay__order-date')
                            const payOrderPayment = document.querySelector('.pay__order-payment')
                            const payOrderShiping = document.querySelector('.pay__order-shiping')

                            payOrderId.textContent = responseObj[0].id
                            payOrderDate.textContent = responseObj[0].date
                            payOrderPayment.textContent = responseObj[0].payment
                            payOrderShiping.textContent = responseObj[0].shipping

                            const shippingPrice = parseFloat(responseObj[0].shipping.match(/[\d.]+/)[0]) || 0
                            shippingValueEl.textContent = '€' + shippingPrice

                            const subtotalPrice = parseFloat(subtotalValueEl?.innerText.replaceAll('€', '').trim()) || 0
                            const totalPrice = shippingPrice + subtotalPrice
                            totalValueEl.textContent = '€' + totalPrice
                        })
                        .then(() => {
                            //remove ordered products from localStorage
                            function removeProductsFromLocalStor(arr) {
                                const localStorArr = JSON.parse(localStorage.getItem('localStorArr')) || []
                                arr.forEach(product => {
                                    localStorArr.forEach((localProduct, index) => {
                                        if (product === localProduct.productId) {
                                            localStorArr.splice(index, 1)
                                        }
                                    })
                                })
                                localStorage.setItem('localStorArr', JSON.stringify(localStorArr))
                            }
                            removeProductsFromLocalStor(productIdArr)
                        })
                        .catch(error => {
                            console.error('There was a problem with the fetch operation:', error)
                        })
                }
                if(payContainer) {
                    payOrderInfo()
                }
            }
            addProdDetailsToForm()
            if(countrySelect) {
                countrySelect.addEventListener('change', changeShipping)
            }
        }, 200)
    }
// function for checkout drop-downs
    function checkoutDropDown() {
        const paymentItems = document.querySelectorAll('.checkout__blik-input, .checkout__card-input')
        if(paymentItems) {
            paymentItems.forEach(item => {
                item.addEventListener('change', function() {
                    const descriptionId = this.getAttribute('data-description')
                    const descriptionElement = document.getElementById(descriptionId)
                    const allDescriptionElements = document.querySelectorAll('.checkout__payment-description')
                    allDescriptionElements.forEach(desc => {
                        desc.style.height = '0'
                        desc.style.opacity = '0'
                    })
                    if (descriptionElement) {
                        descriptionElement.style.height = 'calc(var(--index) * 1)'
                        descriptionElement.style.opacity = '1'
                    }
                })
            })
        }
    }
    checkoutDropDown()
    addProductInfo()
})