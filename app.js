// DOM
const touches = [...document.querySelectorAll('.bouton')];
const listekeycode = touches.map(touche => touche.dataset.key);

document.addEventListener('keydown',(e) => {
    const valeur = e.keycode.tostring();
    console.log(valeur,typeof valeur)
})