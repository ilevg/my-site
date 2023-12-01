export const cartState = {
    totalPriceValue: 0,
};

export async function getProductsForCart(
    tableTitle = null, 
    total = null, 
    button = null, 
    subtext = null, 
    totalPrice = null, 
    callback = null, 
    productsList = null
) {

    function changeStyleprodButton(productId) {
        if (productsList) {
            productsList.forEach(item => {
                const pageProductId = item.getAttribute('data-id');
                if (pageProductId == productId) {
                    let productButton = item.querySelector('.frame__shop-button, .frame__shop-button-left');
                    productButton.innerHTML = 'Added!';
                    productButton.classList.add('added');
                }
            });
        }
    }

    // add products to cart from DB
    async function getProductsFromDB() {
        try {
            const isUserLoggedIn = await callback();
            let userId = isUserLoggedIn ? isUserLoggedIn.id : null;
            const response = await fetch('/server/cart_all_products.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const products = await response.json();
            products.forEach(product => {
                if (product.user_id == userId) {
                    cartState.totalPriceValue += parseInt(product.price);
                    changeStyleprodButton(product.product_id, productsList);
                    const HTML = `
                        <tr class="products" data-product="${product.product_id}" data-user="${product.user_id}">
                            <td>
                                <img class="cart__product-img" src="${product.image}" alt="${product.name}">
                            </td>
                            <td>
                                <ul>
                                    <li>${product.name}</li>
                                    <li>${product.description}</li>
                                    <li>${product.size}</li>
                                </ul>
                            </td>
                            <td class="cart__product__price-value">€${product.price}</td>
                            <td>
                                <img class="cart__delete-icon delete-icon" src="/img/delete-icon.webp" alt="delete">
                            </td>
                        </tr>`;

                    // Insert before the cartTotal element
                    if (tableTitle) {
                        tableTitle.style.visibility = 'visible';
                        total.style.visibility = 'visible';
                        button.style.visibility = 'visible';
                        subtext.style.display = 'none';
                    }

                    total.insertAdjacentHTML('beforebegin', HTML);
                }
            });

            totalPrice.innerHTML = '€' + cartState.totalPriceValue;
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    await getProductsFromDB();

    async function getProductsFromLS() {
        const isUserLoggedIn = await callback();
        if (!isUserLoggedIn) {
            const localStorProds = JSON.parse(localStorage.getItem('localStorArr')) || [];
            if (localStorProds.length > 0) {
                localStorProds.forEach(product => {       
                    changeStyleprodButton(product.productId, productsList);
                    cartState.totalPriceValue += parseInt(product.price);
                    const HTML = `
                        <tr class="products" data-product="${product.productId}" data-user="0">
                            <td>
                                <img class="cart__product-img" src="${product.image}" alt="${product.name}">
                            </td>
                            <td>
                                <ul>
                                    <li>${product.name}</li>
                                    <li>${product.description}</li>
                                    <li>${product.size}</li>
                                </ul>
                            </td>
                            <td class="cart__product__price-value">€${product.price}</td>
                            <td>
                                <img class="cart__delete-icon delete-icon" src="/img/delete-icon.webp" alt="delete">
                            </td>
                        </tr>`;

                    // Insert before the cartTotal element
                    if (tableTitle) {
                        tableTitle.style.visibility = 'visible';
                        total.style.visibility = 'visible';
                        button.style.visibility = 'visible';
                        subtext.style.display = 'none';
                    }

                    total.insertAdjacentHTML('beforebegin', HTML);
                });
                totalPrice.innerHTML = '€' + cartState.totalPriceValue;
            }
        }
    }

    await getProductsFromLS();
}
