import $ from 'jquery'


export default class Menu {
  constructor() {
    console.log('Menu');
    console.log($);
  }
}
// new Menu();


$('.js-menu-btn').on('click', () => {
  $('.js-menu-show').toggleClass('is-menu-show');
  $('.js-menu-show-text01').toggleClass('is-menu-show-text');
  $('.js-menu-show-text02').toggleClass('is-menu-show-text');
  $('.js-menu-show-text03').toggleClass('is-menu-show-text');
  $('.js-menu-show-text04').toggleClass('is-menu-show-text');
  $('.js-menu-show-text05').toggleClass('is-menu-show-text');
  $('.js-menu-show-text06').toggleClass('is-menu-show-text');
  $('.js-menu-show-text07').toggleClass('is-menu-show-text');
  $('.js-menu-show-text08').toggleClass('is-menu-show-text');
  $('.js-menu-show-text09').toggleClass('is-menu-show-text');
  $('.js-menu-show-icons').toggleClass('is-menu-show-icons');
  $('.js-menu-btn-bar').toggleClass('is-bar-move');

  //背景スクロール ロック
  $('body').toggleClass('is-stay');
});