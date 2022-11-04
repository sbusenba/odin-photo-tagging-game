
let imageHolder = document.querySelector('#image-holder')
let cursor = document.querySelector('#cursor')
imageHolder.addEventListener('click',(e)=>{
    console.log(`x=${e.pageX}, y=${e.pageY}`)
});

imageHolder.addEventListener('mousemove',(e)=>{
    cursor.style.top=(e.pageY-27)+'px'
    cursor.style.left=(e.pageX-27)+'px'

})