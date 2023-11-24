import '../css/modules-scss/header.scss'
import '../css/modules-scss/cart.scss'
import '../css/modules-scss/reset.css'
import '../css/pages-scss/shop.scss'

import {loadSection} from './add-sections.js'
import {headerFunction} from './navigation.js'

//import individual style for page
import {importPageStyles} from './import-page-styles.js'
importPageStyles()
// add header
const urlHeader = './header.html', 
    placeholderHeader = document.querySelector('#header-placeholder'), 
    errorHeader = 'Header loading error:'
if(placeholderHeader){
    loadSection(urlHeader, placeholderHeader, errorHeader)
        .then(() => headerFunction())
}
// add footer
const urlFooter = './footer.html', 
      placeholderFooter = document.querySelector('#footer-placeholder'), 
      errorFooter = 'Footer loading error:'
if(placeholderFooter){
    loadSection(urlFooter, placeholderFooter, errorFooter)
}
import '../css/modules-scss/footer.scss'

// function for cart visible
export function cartVisible() {
    const cartSection = document.querySelector('.cart')
    const cartContainer = document.querySelector('.cart__content')
    const cart = document.querySelector('.cart__wrapper')
    const cartButton = document.querySelector('.cart__icon-img')
    cartSection.addEventListener('click', function(e) {
        let target = e.target
        if(target == cartButton) {
            cartContainer.style.right =  '0'
            cart.style.right =  '0'
            document.body.style.overflow = 'hidden'
            document.body.style.marginRight = '8px'
        } else if (target == cartContainer ){
            cartContainer.style.right =  ''
            cart.style.right =  ''
            document.body.style.overflow = ''
            document.body.style.marginRight = '0'
        } 
    })
    async function changeLoginText() {
        const navLoginText = document.querySelector('.cart__login-text')
        const checkUserLoggedIn = async () => {
            try {
                const response = await fetch('/server/auth_verification.php')
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const userData = await response.json()
                return userData
            } catch (error) {
                console.error('Error checking user login:', error)
                return false
            }
        }
        const isUserLoggedIn = await checkUserLoggedIn()
        .catch(error => {
            console.error('Error checking user login:', error)
            return false
        })
        let userId = isUserLoggedIn.id
        if(userId) {
            navLoginText.innerHTML = "Profile"
        } else {
            navLoginText.innerHTML = "Login"
        }
    }
    changeLoginText()
}
