import $ from 'jquery'


export default class ConditionSearch {
  constructor() {
    console.log('ConditionSearch');
    console.log($);
  }
}

$(() => {
  const box = $('.js_target');//検索対象のDOMを格納する
  const conditions = $('.js_conditions');//現在の条件の選択状況を保持するオブジェクト

  let findConditions;//各data-typeの子要素(input)を格納する
  let currentType;//現在のdata-typeを示す

  let count = 0;//検索ヒット数
  let checkcount = 0;//各data-typeのチェックボックス選択数
  let data_check = 0;//対象項目のデータがどれだけチェック状態と一致しているか

  const condition = {};//チェックボックスの入力状態を保持するオブジェクト

  $('.js_denominator').text(box.length);//件数表示の分母をセット

  for (let i = 0; i < conditions.length; i++) {//ターゲットのdata-typeを参照し、メソッドとしてconditionに個別に代入する
    currentType = conditions[i].getAttribute('data-type');
    condition[currentType] = [];
  }

  function setConditions() {//条件設定

    count = 0;
    box.removeClass('js_selected');

    for (let i = 0; i < conditions.length; i++) {//data-typeごとの処理

      currentType = conditions[i].getAttribute('data-type');

      findConditions = conditions[i].querySelectorAll('input');

      for (let n = 0; n < findConditions.length; n++) {//inputごとの処理

        if (findConditions[n].checked) {//現在選択中のインプットが選択されている場合
          condition[currentType][findConditions[n].value] = true;
          checkcount++
        } else {
          condition[currentType][findConditions[n].value] = false;
        }
        if (findConditions.length === n + 1) {//ループが最後の場合
          if (checkcount === 0) {
            for (let t = 0; t < findConditions.length; t++) {
              condition[currentType][findConditions[t].value] = true;
            }
          }
          checkcount = 0;
        }
      }
    }


    for (let m = 0, len = box.length; m < len; ++m) {//最初に取得したターゲットの情報と、現在のinputの選択状態を比較して処理を行う

      for (let i = 0; i < conditions.length; i++) {//ターゲットのdata-typeを参照し、メソッドとしてconditionに個別に代入する
        currentType = conditions[i].getAttribute('data-type');
        //現在のターゲットのtype情報をカンマ区切りで分割し、配列に代入
        const currentBoxTypes = $(box[m]).data(currentType).split(',');

        for (let j = 0; j < currentBoxTypes.length; j++) {
          if (condition[currentType][currentBoxTypes[j]]) {
            data_check++;//選択した条件のうちひとつでもマッチしてたらdata_checkを加算してループを抜ける
            break;
          }
          // else {}
        }

      }

      if (data_check === conditions.length) {
        count++;
        $(box[m]).addClass('js_selected');
      }
      // else {}
      data_check = 0;
    }

    $('.js_numerator').text(count);//件数表示の分子をセット
  }

  setConditions();

  $(document).on('click', 'input', () => {

    setConditions();

  });

  // ========================================
  // 全解除
  // ========================================
  $(document).on('click', '.js_release', () => {
    $('.p-recruitFlow-search-check input').each(function () {
      $(this).prop('checked', false);
    });
    setConditions();

    /*
    js_releaseをクリック

    同typeのもののチェック全解除
    */

  });

  // $("#location-all").on('click', function () {
  //   $('input[name="location"]+.js-all').addClass("is-blue");
  //   $('input[name="location"]').each(function () {
  //     $(this).prop('checked', false);
  //   });
  // });
  // $('input[name="location"]+.js-one').on('click', function () {
  //   $('input[name="location"]+.js-all').removeClass("is-blue");
  // });


  // $("#type-all").on('click', function () {
  //   $('input[name="type"]+.js-all').addClass("is-blue");
  //   $('input[name="type"]').each(function () {
  //     $(this).prop('checked', false);
  //   });
  // });
  // $('input[name="type"]+.js-one').on('click', function () {
  //   $('input[name="type"]+.js-all').removeClass("is-blue");
  // });

});
