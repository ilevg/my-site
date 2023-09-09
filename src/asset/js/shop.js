
// open collection img
const body = document.querySelector('body')

function openImg(e) {
    let target = e.target.closest('.collection__img')
    if(!target) return
    let container = target.closest('.collection__img_container')
    if(!container) return

    target.classList.toggle('collection__img_open')
    container.classList.toggle('collection__img_container_change')
    body.classList.toggle('body__hidden')
}

window.addEventListener('click', openImg)


// function for collection drop-down window

const paymentItems = document.querySelectorAll('.checkout__payment_item');

paymentItems.forEach(item => {
    item.addEventListener('change', function() {
        const descriptionId = this.getAttribute('data-description');
        
        const descriptionElement = document.getElementById(descriptionId);
        
        const allDescriptionElements = document.querySelectorAll('.checkout__payment_description');
        allDescriptionElements.forEach(desc => {
            desc.style.height = '0';
            desc.style.opacity = '0';
        });
        
        if (descriptionElement) {
            descriptionElement.style.height = 'calc(var(--index) * 10)';
            descriptionElement.style.opacity = '1';
        }
    });
});

// function for edit profile address on profile.html
const editAdressButton = document.querySelector('.profile__button');

function editAdress() {
    const editAddresPopup = document.querySelector('.profile__address_edit')
    const cancelEditAddres = document.querySelector('.profile__adress_edit-cancel')

    cancelEditAddres.addEventListener('click', function(){
        editAddresPopup.style.height='0'
    })
    

    editAddresPopup.style.height='100vh'
}
editAdressButton.addEventListener('click', editAdress)