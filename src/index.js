
let imageHolder = document.querySelector('#image-holder')
let cursor = document.querySelector('#cursor')

imageHolder.addEventListener('click',(e)=>{
    console.log(`x=${e.x}, y=${e.y}`)
    
    cursor.style.top = (e.pageY-27)+'px'
    cursor.style.left =  I(e.pageY-27)+'px'
    console.log(e)


})
imageHolder.addEventListener('mousemove',(e)=>{
    cursor.style.top=(e.pageY-27)+'px'
    cursor.style.left=(e.pageX-27)+'px'

})