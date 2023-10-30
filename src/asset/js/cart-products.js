export function productsToCart() {
    console.log('DOMContentLoaded event fired'); // Добавьте этот console.log
    document.body.addEventListener('click', (event) => {
        const button = event.target.closest('.frame__shop-button') || event.target.closest('.frame__shop-button-left');
        if (button) {
            addToCart(button);
        } else {
            console.log('click')
        }
    });

    const addToCart = async (button) => {
        const productInfo = getProductInfo(button);
        //Проверяем, является ли пользователь зарегистрированным
        const isUserLoggedIn = await checkUserLoggedIn()
            .catch(error => {
                console.error('Error checking user login:', error);
                return false;
            });
            
        // Если пользователь зарегистрирован, отправляем данные на сервер
        if (isUserLoggedIn) {
            //sendToServer(productInfo);
            alert(productInfo)
        } else {
            // Если пользователь не зарегистрирован, сохраняем в локальное хранилище
            //addToLocalStorage(productInfo);
            alert('Do not logged in')
        }
    };

    const getProductInfo = (button) => {
        let productInfo = button.closest('.products');
        let productName = productInfo.querySelector('.products-name').innerText;
        let productImg = document.querySelector(`[data-image="${productName}"]`)
        let productImgUrl;
        if (productInfo) {
            let styles = getComputedStyle(productImg)
            productImgUrl = styles.backgroundImage;

            let urlMatch = productImgUrl.match(/url\(["']?(.*?)["']?\)/);
            if (urlMatch && urlMatch[1]) {
                productImgUrl = urlMatch[1];
            }

            console.log(productImgUrl)
            let productInfoArr = {
                image: productImgUrl,
                name: productName,
                price: productInfo.querySelector('.products-price').innerText,
                description: productInfo.querySelector('.products-description').innerText,
                size: productInfo.querySelector('.products-size').innerText,
            };
            return productInfoArr;
        } else {
            console.error('Product info not found');
            return null; // или другое значение, которое обозначает отсутствие данных
        }
    };

    const checkUserLoggedIn = async () => {
        try {
            const response = await fetch('/server/auth_verification.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error checking user login:', error);
            return false;
        }
    };

    // const addToLocalStorage = (productInfo) => {
    //     const cart = JSON.parse(localStorage.getItem('cart')) || [];
    //     cart.push(productInfo);
    //     localStorage.setItem('cart', JSON.stringify(cart));
    //     updateCartUI(cart);
    // };

    // const sendToServer = (productInfo) => {
    //     // Реализуйте этот метод для отправки информации о товаре на сервер
    //     // Используйте AJAX или Fetch API для отправки POST-запроса на сервер
    //     fetch('/server/cart_products.php', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(productInfo),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             // Обработайте ответ от сервера (если это необходимо)
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // };

    // const updateCartUI = (cart) => {
    //     // Реализуйте этот метод для обновления отображения корзины на странице
    // };
}