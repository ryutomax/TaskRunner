import $ from 'jquery'

export default class scrollUnderline {
  constructor() {
    console.log('scrollUnderline');
    console.log($);
  }
}

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

//メッセージ
const underline = (target) => {
  target.classList.add('is-underL_scroll');
};

setObserve('.js-underLine', underline, {
  root: null,
  // threshold: 1,
  rootMargin: '0px 0px -25% 0px',
});
setObserve('.js-underLine02', underline, {
  root: null,
  // threshold: 1,
  rootMargin: '0px 0px -25% 0px',
});

//インタビュー
const interviewUnderline = (target) => {
  target.classList.add('is-underL_scroll-interviewTop');
};

setObserve('.js-underLine-interviewTop', interviewUnderline, {
  root: null,
  // threshold: 1,
  rootMargin: '0px 0px 0% 0px',
});

setObserve('.js-underLine-interviewTop02', interviewUnderline, {
  root: null,
  // threshold: 1,
  rootMargin: '0px 0px 0% 0px',
});

setObserve('.js-underLine-interviewTop03', interviewUnderline, {
  root: null,
  // threshold: 1,
  rootMargin: '0px 0px 0% 0px',
});

const interviewTextUnderline = (target) => {
  target.classList.add('is-underL_scroll-interviewText');
};

setObserve('.js-underLine-interviewText-green', interviewTextUnderline, {
  root: null,
  // threshold: 1,
  rootMargin: '0px 0px 0% 0px',
});
setObserve('.js-underLine-interviewText-pink', interviewTextUnderline, {
  root: null,
  // threshold: 1,
  rootMargin: '0px 0px 0% 0px',
});
setObserve('.js-underLine-interviewText-blue', interviewTextUnderline, {
  root: null,
  // threshold: 1,
  rootMargin: '0px 0px 0% 0px',
});
