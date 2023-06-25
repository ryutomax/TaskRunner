import $ from 'jquery'

export default class scrollBgChange {
  constructor() {
    console.log('scrollBgChange');
    console.log($);
  }
}

const setObserve = (targets, triggers, addElements, options) => {
  // アニメーショントリガー
  const targetElements = document.querySelectorAll(targets);
  const triggerElements = document.querySelectorAll(triggers);



  function toggleClass(target, isIntersecting) {
    targetElements.forEach((targetElement) => {
      const dataBg = targetElement.dataset.bg;
      const dataTrigger = target.dataset.trigger;

      // console.log(dataBg);
      // console.log(dataTrigger);
      if (dataBg === dataTrigger) {
        isIntersecting
          ? targetElement.classList.add(addElements)
          : targetElement.classList.remove(addElements);
      }
    });
  }

  function callback(entries) {
    entries.forEach((entry) => {
      // ターゲットが画面領域に触れたときの処理
      toggleClass(entry.target, entry.isIntersecting);
    });
  }

  // IntersectionObserverオブジェクトのインスタンス生成
  const observer = new IntersectionObserver(callback, options);

  // observeメソッド呼び出し
  triggerElements.forEach((triggerElement) => {
    observer.observe(triggerElement);
  });
};

setObserve("[data-bg]", "[data-trigger]", "is-bgChange", {
  root: null,
  threshold: 0,
});