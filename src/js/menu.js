;(()=> {
    const menuEl = document.querySelector('.menu')
    const MENU_STATE = {
        FIXED: 'fixed',
        RELATIVE: 'relative'
    }

    let state = MENU_STATE.RELATIVE
    window.addEventListener('scroll', ()=> {
        if(window.scrollY > 100 && state === MENU_STATE.RELATIVE) {
            state = MENU_STATE.FIXED
            menuEl.classList.add('--fixed')
        } else if (window.scrollY < 100 && state === MENU_STATE.FIXED) {
            state = MENU_STATE.RELATIVE
            menuEl.classList.remove('--fixed')
        }
    });
})();

