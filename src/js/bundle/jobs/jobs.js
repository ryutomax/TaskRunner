import $ from 'jquery'

export default class jobs {
  constructor() {
    console.log('jobs');
    console.log($);
  }
}

$('.js-jobsToggle').on('click',function(){
    // $(this).next(document).toggleSlide();
    $(this).toggleClass('is-active');
});

