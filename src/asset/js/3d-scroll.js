
import '../../asset/img/about-1.jpg';
import '../../asset/img/about-2.jpg';



import '../css/pages-scss/scroll.scss';
import '../css/pages-scss/contact.scss';
import '../css/modules-scss/reset.css';

import '../../libs/particles/particles.js'
import {loadSection} from './add-sections.js';
import {headerFunction} from './add-header.js';

//import individual style for page
import {importPageStyles} from './import-page-styles.js';
importPageStyles();

// add header

const headerUrl = './header.html', 
      headerPlaceholder = document.querySelector('#header-placeholder'), 
      headerError = 'Header loading error:'
loadSection(headerUrl, headerPlaceholder, headerError, headerFunction)



// 3d scroll

let zSpacing = -1000,
    lastPose = zSpacing / 5,
    $frames = document.getElementsByClassName('frame'),
    frames = Array.from($frames),
    zVals = []

window.onscroll = function() {
    let top = document.documentElement.scrollTop,
        delta = lastPose - top
    lastPose = top

    frames.forEach(function(n,i) {
        zVals.push((i * zSpacing) + zSpacing)
        zVals[i] += delta * -7
        let frame = frames[i],
            transform = `translateZ(${zVals[i]}px)`,
            opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0
        frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`)

        frame.style.transform = `${transform}`;
        frame.style.opacity = `${opacity}`;
    })
}

window.scrollTo(0, 1)

// pointer events 

function pointerEvents() {
    let arrTranslateZ = []
    frames.forEach((frame) => {
        frame.style.pointerEvents = 'none'
        

        let coords = frame.style.transform;
        let translateZValue = parseFloat(coords.match(/translateZ\(([^)]+)\)/)[1]);

        if(frame.style.opacity == 1){
            arrTranslateZ.push(translateZValue)
        }
    })
    let maxTranslateZ = Math.max(...arrTranslateZ)

    frames.forEach((frame) => {
        if(frame.style.opacity == 1 && frame.style.transform == `translateZ(${maxTranslateZ}px)`) {
            frame.style.pointerEvents = 'visible'
        }
    })
}

window.addEventListener('scroll', pointerEvents);