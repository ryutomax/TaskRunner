import $ from 'jquery'


export default class Loading {
  constructor() {
    window.addEventListener('pageshow', function (event) {
      if (event.persisted) {
        // bfcache発動時の処理
        // $('body').removeClass('ja-load');
        $('body').addClass('is-pageShow');
        window.location.reload();
      }
    });

    $(window).on('load', () => {
      // $('body').removeClass('ja-load');
      $('body').addClass('is-pageShow');
    });
    $(() => {
      // ハッシュリンク(#)と別ウィンドウでページを開く場合はスルー
      $('a:not([href^="#"]):not([target])').on('click', function (e) {
        e.preventDefault(); // ナビゲートをキャンセル
        const url = $(this).attr('href'); // 遷移先のURLを取得
        if (url !== '') {
          $('body').addClass('js-load');  // bodyに class="fadeout"を挿入
          setTimeout(() => {
            window.location = url;  // 0.8秒後に取得したURLに遷移
          }, 800);
        }
        return false;
      });
    });
  }
}
