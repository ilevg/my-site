import '../css/modules-scss/reset.css'
import '../css/pages-scss/main.scss'

import '../img/2222.jpg'
import '../img/99.jpg'
import '../../asset/img/2222.jpg'
import '../../asset/img/layer-6.png'
import '../../asset/img/layers-3-3.png'
import '../../asset/img/layer-4-4.png'
import '../../asset/img/layer-5-5.png'

import {loadSection} from './add-sections.js'
import {headerFunction} from './navigation.js'

// add header
const urlHeader = './header.html', 
    placeholderHeader = document.querySelector('#header-placeholder'), 
    errorHeader = 'Header loading error:'
if(placeholderHeader){
    loadSection(urlHeader, placeholderHeader, errorHeader)
        .then(() => headerFunction())
}
//Function for applying 3D effects
function apply3DChanges(e) {
    Object.assign(document.documentElement, {
        style: `
            --move-x: ${(e.clientX - window.innerWidth / 2) * 0.003}deg;
            --move-y: ${(e.clientY - window.innerHeight / 2) * 0.006}deg;
        `
    })
}
document.addEventListener('mousemove', apply3DChanges)