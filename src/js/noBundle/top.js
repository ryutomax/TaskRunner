
window.addEventListener('load', (event) => {
  const header = document.querySelector(".p-header")
  header.classList.add("js-anime04")
  const mv2 = document.querySelectorAll(".js-anime04")
  const mv = document.querySelectorAll("#mvTitle")

  setTimeout(function () {
    mv[0].classList.add("js-mv")
    setTimeout(function () {
      mv[1].classList.add("js-mv")
      setTimeout(function () {
        mv[2].classList.add("js-mv")
        mv[3].classList.add("js-mv")
        if(window.innerWidth<768){
          setTimeout(()=>{
            mv[4].classList.add("js-mv")
            setTimeout(function () {
              for (let i = 0; i < 2; i++) {
                mv2[i].classList.add("is-show")
                // title.classList.add("is-hide")
              }
            }, 800)
          },400)
        }
        else{
          mv[4].classList.add("js-mv")
          setTimeout(function () {
            for (let i = 0; i < 2; i++) {
              mv2[i].classList.add("is-show")
            }
          }, 800)
        }
      }, 1800)
    }, 500)
  }, 0)
});


let animeC01 = document.querySelectorAll('.js-anime01');
let animeC02 = document.querySelectorAll('.js-anime02');
let animeC03 = document.querySelectorAll('.js-anime03');
let animeC06 = document.querySelectorAll('.js-anime06');
window.addEventListener('scroll', function () {
  var scroll = window.scrollY;
  var windowHeight = window.innerHeight;
  for (let cont of animeC01) {
    var targetPos = cont.getBoundingClientRect().top + scroll;
    if (scroll > targetPos - windowHeight) {
      cont.classList.add("is-show");
    }
  }
  for (let cont of animeC02) {
    var targetPos = cont.getBoundingClientRect().top + scroll;
    if (scroll > targetPos - windowHeight) {
      cont.classList.add("is-show");
      setTimeout(function () { cont.classList.add("is-end"); }, 2000)
    }
  }
  for (let cont of animeC03) {
    var targetPos = cont.getBoundingClientRect().top + scroll;
    if (scroll > targetPos - windowHeight * 0.75) {
      cont.classList.add("is-show");
    }
  }
  for (let cont of animeC06) {
    var targetPos = cont.getBoundingClientRect().top + scroll;
    if (scroll > targetPos - windowHeight * 0.75) {
      cont.classList.add("is-show");
      setTimeout(function () { cont.classList.add("is-end"); }, 2000)
    }
  }
});
let iSlide = document.querySelector('#interviewSlide');
let sLeft = iSlide.scrollLeft;
let nLeft = 0
let delX = 0
window.interviewPCnext = function () {
  sLeft = Math.floor(iSlide.scrollLeft);
  iSlide.scrollLeft = Math.floor(sLeft / 300) * 300 + 300
}
window.interviewPCprev = function () {
  sLeft = Math.floor(iSlide.scrollLeft);
  iSlide.scrollLeft = Math.floor(sLeft / 301) * 300
}
window.interviewSPnext = function () {
  sLeft = Math.floor(iSlide.scrollLeft);
  iSlide.scrollLeft = Math.floor(sLeft / 200) * 200 + 200
}

window.interviewSPprev = function () {
  sLeft = Math.floor(iSlide.scrollLeft);
  iSlide.scrollLeft = Math.floor(sLeft / 201) * 200
}


var userAgent = window.navigator.userAgent.toLowerCase();

if (userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
  //IE向けの記述
} else if (userAgent.indexOf('edge') != -1) {
  //旧Edge向けの記述
} else if (userAgent.indexOf('chrome') != -1) {
  //Google Chrome向けの記述
} else if (userAgent.indexOf('safari') != -1) {
  const mElement = document.querySelector("main")
  mElement.classList.add("safari")
} else if (userAgent.indexOf('firefox') != -1) {
  //FireFox向けの記述
} else {
  //その他のブラウザ向けの記述
}

