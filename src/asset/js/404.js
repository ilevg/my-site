
import '../css/modules-scss/reset.css';
import '../css/pages-scss/404.scss';



import '../../libs/particles/particles.js'

import {loadSection} from './add-sections.js';

// add header
import {headerFunction} from './add-header.js';

const urlHeader = './header.html', 
      placeholderHeader = document.querySelector('#header-placeholder'), 
      errorHeader = 'Header loading error:'
loadSection(urlHeader, placeholderHeader, errorHeader, headerFunction)

