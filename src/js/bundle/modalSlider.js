import Swiper from 'swiper/bundle';
// import 'swiper/css/bundle';

export default class ModalSlider {

  constructor() {

    console.log(Swiper);
    window.addEventListener("DOMContentLoaded", () => {
      // モーダルを取得
      const modal = document.getElementById("modal");
      // モーダルを開く
      const openModalBtns = document.querySelectorAll(".js-modalOpen");
      // モーダルを閉じる
      const closeModalBtns = document.querySelectorAll(".modalClose");

      // Swiperの設定
      const swiper = new Swiper(".swiper", {
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination", // ページネーションのクラス名を指定
          type: "fraction", // ページネーションのtypeを指定
        },
        spaceBetween: 30, //任意のマージン
      });

      // モーダルのボタンクリック
      openModalBtns.forEach((openModalBtn) => {
        openModalBtn.addEventListener("click", () => {
          // data-modalで設定したスライド番号を取得
          const modalIndex = openModalBtn.getAttribute('data-modal');
          swiper.slideTo(modalIndex);
          modal.classList.add("is-active");
        });
      });

      // モーダルの閉じるボタンクリック
      closeModalBtns.forEach((closeModalBtn) => {
        closeModalBtn.addEventListener("click", () => {
          modal.classList.remove("is-active");
        });
      });
    });
  }
}