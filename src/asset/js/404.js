
import '../css/modules-scss/reset.css'
import '../css/pages-scss/404.scss'
import '../css/modules-scss/header.scss'

import {loadSection} from './add-sections.js'

// add header
import {headerFunction} from './navigation.js'

const urlHeader = './header.html', 
    placeholderHeader = document.querySelector('#header-placeholder'), 
    errorHeader = 'Header loading error:'
loadSection(urlHeader, placeholderHeader, errorHeader)
    .then(() => headerFunction())

