import '../css/pages-scss/profile.scss';
import '../css/modules-scss/reset.css';


import '../../libs/particles/particles.js'
import '../css/modules-scss/footer.scss';

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