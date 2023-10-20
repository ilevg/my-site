document.addEventListener('DOMContentLoaded', getProducts);

const itemsPerPage = 8;
let currentPage = 1;
let currentProducts = [];
const currentPageElem = document.querySelector('.collection__page-current');
const allPagesElem = document.querySelector('.collection__page-all');
currentPageElem.innerHTML = currentPage;

function getProducts() {
    fetch('/server/get_products.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            currentProducts = products;
            displayProducts();
            setupPagination();
            allPagesElem.innerHTML = Math.ceil(currentProducts.length / itemsPerPage);
        })
        .catch(error => console.error('Error fetching products: ', error));
}

function displayProducts() {
    const container = document.querySelector('.collection__items');
    container.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const currentProductsOnPage = currentProducts.slice(start, end);

    for (let i = 0; i < currentProductsOnPage.length; i++) {
        const product = currentProductsOnPage[i];
        const productsHtml = `
            <div class="collection__item">
                <div class="collection__container-img">
                    <img class="collection-img" src="${product.image_url}" alt="${product.product_name}">
                </div>
                <h3>${product.product_name}</h3>
                <ul>
                    <li class="frame__shop-price">${product.price}</li>
                    <li>${product.description}</li>
                    <li>Size: ${product.size}cm</li>
                </ul>
                <button class="frame__shop-button" type="button">Add to cart</button>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', productsHtml);

        setTimeout(() => {
            const allItems = container.querySelectorAll('.collection__item');
            allItems.forEach(item => item.classList.add('active'));
        }, 10 * i);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        currentPageElem.innerHTML = currentPage;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        displayProducts();
    }
}

function nextPage() {
    const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        currentPageElem.innerHTML = currentPage;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        displayProducts();
    }
}

function setupPagination() {
    document.querySelector('.collection__pagination-prev').addEventListener('click', prevPage);
    document.querySelector('.collection__pagination-next').addEventListener('click', nextPage);
}