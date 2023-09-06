
// Функция для загрузки хедера
import loadSections from './add-sections.js';

const url = '../../html/header.html';
const errMessage = 'Error loading header:';

function afterSectionLoaded() {
    document.addEventListener('mousemove', apply3DChanges);
    playSound();
    toggleNavigation();
}
loadSections(url, errMessage, afterSectionLoaded)

        
//Функция для применения 3D эффектов
function apply3DChanges(e) {
    Object.assign(document.documentElement, {
        style: `
            --move-x: ${(e.clientX - window.innerWidth / 2) * 0.003}deg;
            --move-y: ${(e.clientY - window.innerHeight / 2) * 0.006}deg;
        `
    });
}

// Функция для воспроизведения звука и анимации лого
function playSound() {
    let audioElements = document.querySelectorAll('.audio');
    let logo = document.querySelector('.nav__logo');

    window.addEventListener('click', () => {
        audioElements.forEach((audio) => {
            if (audio.paused) {
                audio.play();
                logo.style.animation = 'heartbeat 1.19s infinite';
            }
            logo.addEventListener('mouseenter', () => {
                audio.pause();
                logo.style.animation = 'none';
                logo.style.transition = 'all 1s ease';
            });
            logo.addEventListener('mouseleave', () => {
                audio.play();
                logo.style.animation = 'heartbeat 1.19s infinite';
            });
        });
    });
}

// Функция для отображения/скрытия навигации
function toggleNavigation() {
    const logo = document.querySelector('.nav__logo');
    const navList = document.querySelector('.nav__list_items');
    
    logo.addEventListener('click', () => {
            navList.style.height = (navList.offsetHeight == '0') ? '800px' : '0px' 
    });
}

