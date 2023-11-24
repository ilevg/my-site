import '../css/pages-scss/collection.scss'
// open collection imgs
const body = document.querySelector('body')
function openImg(e) {
    let target = e.target.closest('.collection-img')
    if(!target) return
    let container = target.closest('.collection__container-img')
    if(!container) return

    target.classList.toggle('collection-img-open')
    container.classList.toggle('collection__container-img-change')
    body.classList.toggle('collection__body-hidden')
}
window.addEventListener('click', openImg)


