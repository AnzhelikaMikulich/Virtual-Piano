
const fullscreen = document.querySelector('.openfullscreen');

fullscreen.addEventListener('click', changeScreen)

function changeScreen(){
    if(document.fullscreenElement === null){
        document.documentElement.requestFullscreen()
    }else if(document.fullscreenEnabled){
        document.exitFullscreen()

    }
}
