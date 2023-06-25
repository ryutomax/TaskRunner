import $ from 'jquery'

export default class Accordion {
  constructor() {
    console.log('Accordion');
    console.log($);
  }
}

//クリックで動く
$('.js-accordion').on('click', function() {
  $(".js-accordion").toggleClass('is-arrow-active');
  $(this).next('.p-recruitFlow-search').slideToggle();
  $(this).next('.p-jobsSearc-sp').slideToggle();
});
