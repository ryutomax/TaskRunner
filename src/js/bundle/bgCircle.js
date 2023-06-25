export default class bgCircle {
  constructor() {
    if (document.querySelector(".bgcircle-circle1") == undefined) {
      console.log("bgCircle.JS PASS");
    } else {

      runBgCircle()
    }

  }
}
let c1 = document.querySelector(".bgcircle-circle1")
let c2 = document.querySelector(".bgcircle-circle2")
let c1path = document.querySelector(".bgcircle-circle1 circle")
let c2path = document.querySelector(".bgcircle-circle2 path")
function runBgCircle() {
  window.addEventListener('load', () => {
    c1 = document.querySelector(".bgcircle-circle1")
    c2 = document.querySelector(".bgcircle-circle2")
    c1path = document.querySelector(".bgcircle-circle1 circle")
    c2path = document.querySelector(".bgcircle-circle2 path")
    setTimeout(() => {
      c1.style.opacity = 1
      c2.style.opacity = 1
      c1.classList.add('show')
      c2.classList.add('show')
    }, 1000)
    setCircleSize()
  });
  window.addEventListener('scroll', () => {
    const pageY = window.pageYOffset
    if (pageY > 100) {
      c1.style.opacity = 0
    } else {
      c1.style.opacity = 1
    }
    if (pageY > 300) {
      c2.style.opacity = 0
    } else {
      c2.style.opacity = 1
    }
  });
  addEventListener("resize", (event) => {
    setCircleSize()
  });

}
function setCircleSize() {
  if (window.innerWidth < 700) {
    c1path.setAttribute("stroke-width", 6)
    c2path.setAttribute("stroke-width", 7)
  }else if (window.innerWidth < 900){
    c2path.setAttribute("stroke-width", 8)
  }else{
    c2path.setAttribute("stroke-width", 10)
  }
}
// new bgCircle();

// if(pageY > 100){
//   c1.classList.add('hide')
// }else{
//   c1.classList.remove('hide')
// }
// if(pageY > 200){
//   c2.classList.add('hide')
// }else{
//   c2.classList.remove('hide')
// }

//円を動かすと重くなる
// https://gyazo.com/476dfacefbb8571bb4d57f0d296ae369

// pageY = window.pageYOffset
// c1.style.top = pageY*0.1
// c2.style.top = 730 + pageY * 0.2
// console.log(pageY*0.1);
// console.log(c1.style.top);
