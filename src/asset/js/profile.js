import '../css/pages-scss/profile.scss'
import '../css/modules-scss/reset.css'
import '../css/modules-scss/footer.scss'

//Add orders history to profile page
function getOrders() {
    fetch('/server/profile_orders_history.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(orders => {
            const subtext = document.querySelector('.profile__subtext')
            const tableTitle = document.querySelector('.profile-orders__table__title')
            let i = 0
            if(orders.length > 0) {
                orders.forEach(order => {
                    const HTML = `
                            <tr>
                                <td>
                                <span>${++i}</span>
                                </td>
                                <td>
                                    <img class="cart__product-img" src="${order.image_url}" alt="${order.product_name}">
                                </td>
                                <td>
                                    <ul>
                                        <li>${order.product_name}</li>
                                        <li>${order.description}</li>
                                        <li>${order.size}</li>
                                    </ul>
                                </td>
                                <td>€${order.price}</td>
                                <td>
                                    <span class="profile-orders__date">${order.date}</span>
                                </td>
                            </tr>`
                        // Insert before the cartTotal element
                        subtext.insertAdjacentHTML('beforebegin', HTML)
                        subtext.style.display ='none'
                        tableTitle.removeAttribute('hidden')
                })
            }
        })
        .catch(error => {
            console.error('Error fetching products: ', error)
        })
}
getOrders()
// function for edit profile address on profile.html
const editAdressButton = document.querySelector('.profile__button')
function editAdress() {
    const editAddresPopup = document.querySelector('.profile-popup')
    const cancelEditAddres = document.querySelector('.profile-popup__button-cancel')
    cancelEditAddres.addEventListener('click', function(){
        editAddresPopup.style.height='0'
    })
    editAddresPopup.style.height='100vh'
}
editAdressButton.addEventListener('click', editAdress)