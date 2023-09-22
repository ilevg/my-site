export function headerFunction() {
    // function for play  wind sound on pages
    let icon = document.querySelector('.nav__icon-img');

    function playSound() {
        let audioElements = document.querySelectorAll('.header__audio');
        window.addEventListener('click', () => {
            audioElements.forEach((audio) => {
                if (audio.paused) {
                    audio.play();
                    icon.style.animation = 'heartbeat 1.19s infinite';
                }
                icon.addEventListener('mouseenter', () => {
                    audio.pause();
                    icon.style.animation = 'none';
                    icon.style.transition = 'all 1s ease';
                });
                icon.addEventListener('mouseleave', () => {
                    audio.play();
                    icon.style.animation = 'heartbeat 1.19s infinite';
                });
            });
        });
    }
    
   // Function to show/hide navigation
    function toggleNavigation() {

        const navList = document.querySelector('.nav__items');
        
        icon.addEventListener('click', () => {
                navList.style.height = (navList.offsetHeight == '0') ? '800px' : '0px' 
        });
    }
    
    playSound()
    toggleNavigation()
}
