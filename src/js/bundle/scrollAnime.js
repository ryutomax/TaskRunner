import $ from 'jquery'
import Vivus from 'vivus'

export default class scrollAnime {
  constructor() {
    // message svg手書き風アニメーション
    if ($('#js-svg-ceo').length) {
      new Vivus('js-svg-ceo', {
        type: 'oneByOne', //1パスずつ書く
        start: 'inViewport', //ビューポート内に表示されたらスタート
        duration: 150, //速さ
        animTimingFunction: Vivus.EASE//イージング
      })
    }

    // スクロールトップ
    $('.js-toUpBtn').on('click', () => {

      $('html, body').animate({ scrollTop: 0 });

    });

    $(window).on('scroll', () => { // スクロール毎にイベントが発火します。
      const scrollH = $(document).scrollTop();

      if (scrollH > 500) {
        $('.js-toUpBtn').addClass('is-btn-show');
      } else {
        $('.js-toUpBtn').removeClass('is-btn-show');
      }
    });

    $(window).on('scroll', function () {

      var elem = $('.js-anime');
      var isAnimate = 'is-start';

      elem.each(function () {

        var elemOffset = $(this).offset().top;
        var scrollPos = $(window).scrollTop();
        var wh = $(window).height();

        if (scrollPos > elemOffset - wh + (wh / 2)) {
          $(this).addClass(isAnimate);
        }
      });

    });

    // ========================================
    // // コンテンツ アニメーション
    // ========================================

    window.addEventListener("load", () => {

      // boxをすべて取得
      const contents = document.querySelectorAll(".js-content-show");
      const contents02 = document.querySelectorAll(".js-content-show02");
      const contents03 = document.querySelectorAll(".js-content-show03");
      const contents04 = document.querySelectorAll(".js-content-show04");
      // scrollイベントをセット
      window.addEventListener("scroll", showBoxes);
      // ロードのタイミングで一度発火
      showBoxes();

      function showBoxes() {
        // 発火位置
        const triggerBottom = (window.innerHeight / 5) * 4;

        contents.forEach((box) => {
          const boxTop = box.getBoundingClientRect().top;

          if (boxTop < triggerBottom + 300) {
            const delayFunc = () => {
              box.classList.add("is-showUp");
            }
            setTimeout(delayFunc, 300);
          }
        });
        contents02.forEach((box) => {
          const boxTop = box.getBoundingClientRect().top;

          if (boxTop < triggerBottom + 300) {
            const delayFunc = () => {
              box.classList.add("is-showUp02");
            }
            setTimeout(delayFunc, 300);
          }
        });
        contents03.forEach((box) => {
          const boxTop = box.getBoundingClientRect().top;

          if (boxTop < triggerBottom + 400) {
            const delayFunc = () => {
              box.classList.add("is-showUp03");
            }
            setTimeout(delayFunc, 300);
          }
        })
        contents04.forEach((box) => {
          const boxTop = box.getBoundingClientRect().top;

          if (boxTop < triggerBottom + 400) {
            const delayFunc = () => {
              box.classList.add("is-showUp04");
            }
            setTimeout(delayFunc, 300);
          }
        })

      }
    });



    // ========================================
    // // コンテンツ アニメーション
    // ========================================

    window.addEventListener("load", () => {

      // boxをすべて取得
      const contents = document.querySelectorAll(".js-content-show");
      const contents02 = document.querySelectorAll(".js-content-show02");
      const contents03 = document.querySelectorAll(".js-content-show03");
      const contents04 = document.querySelectorAll(".js-content-show04");
      // scrollイベントをセット
      window.addEventListener("scroll", showBoxes);
      // ロードのタイミングで一度発火
      showBoxes();

      function showBoxes() {
        // 発火位置
        const triggerBottom = (window.innerHeight / 5) * 4;

        contents.forEach((box) => {
          const boxTop = box.getBoundingClientRect().top;

          if (boxTop < triggerBottom + 300) {
            const delayFunc = () => {
              box.classList.add("is-showUp");
            }
            setTimeout(delayFunc, 300);
          }
        });
        contents02.forEach((box) => {
          const boxTop = box.getBoundingClientRect().top;

          if (boxTop < triggerBottom + 300) {
            const delayFunc = () => {
              box.classList.add("is-showUp02");
            }
            setTimeout(delayFunc, 300);
          }
        });
        contents03.forEach((box) => {
          const boxTop = box.getBoundingClientRect().top;

          if (boxTop < triggerBottom + 400) {
            const delayFunc = () => {
              box.classList.add("is-showUp03");
            }
            setTimeout(delayFunc, 300);
          }
        });
        contents04.forEach((box) => {
          const boxTop = box.getBoundingClientRect().top;

          if (boxTop < triggerBottom + 400) {
            const delayFunc = () => {
              box.classList.add("is-showUp04");
            }
            setTimeout(delayFunc, 300);
          }
        });
      }
    })


    const moveFadeLeft = (target) => {
      target.classList.add('is-showUp');
    };

    const setObserve = (targets, animationCall, options) => {
      const targetElements = document.querySelectorAll(targets);
      const callback = (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          animationCall(entry.target);
          obs.unobserve(entry.target);
        });
      };
      const observer = new IntersectionObserver(callback, options);
      targetElements.forEach((target) => {
        observer.observe(target);
      });
    };

    setObserve('.js-content-show', moveFadeLeft, {
      root: null,
      threshold: 0,
      rootMargin: '0px 0px -10% 0px',
    });

    // ========================================
    // メッセージ 背景スクロール マスク
    // ========================================
    window.addEventListener("load", () => {

      const messageContent = document.querySelectorAll(".js-scroll-mask");

      // scrollイベントをセット
      window.addEventListener("scroll", showBoxes);
      // ロードのタイミングで一度発火
      showBoxes();

      function showBoxes() {

        const triggerBottom = (window.innerHeight / 5) * 4;

        messageContent.forEach((box) => {

          // コンテンツの高さ取得
          const boxTop = document.getElementById("js-scroll-mask-trigger").getBoundingClientRect().top;

          if (boxTop < triggerBottom) {

            box.classList.add("is-scroll-mask");

          } else {

            box.classList.remove("is-scroll-mask");

          }
        });
      }

    });
  }
};
