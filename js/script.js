'use strict';

/* ----------- 1. ローディングアニメーション ----------- */
function loadingAnimation() {
  // document.body.classList.toggle('no-scroll');
  window.addEventListener('load', () => {
    setTimeout(() => {
      const spinner = document.getElementById('loading');
      // console.log(spinner);
      spinner.classList.add('is-loaded');
    }, 500);
  });
}
loadingAnimation();

// function webStorage() {
//   if (sessionStorage.getItem('access')) {
//     // 2回目以降のアクセス時の処理には関数を実行しない
//     const spinner = document.getElementById('loading');
//     spinner.classList.add('is-loaded');
//   } else {
//     // 初回アクセス時の処理
//     sessionStorage.setItem('access', 0);
//     loadingAnimation();
//   }
// }
// webStorage();

// 初回サイト訪問時のみ1秒間アニメーション
// ページが読み込まれた後に実行
// const spinner = document.getElementById('loading');
// window.addEventListener('load', () => {
//   // 初めての場合にのみローディングアニメーションを表示
//   if (! localStorage.getItem('visited')) {
//     // 1秒後にローディングアニメーションを非表示にし、ページ表示
//     setTimeout(() => {
//       spinner.classList.add('is-loaded');
//       localStorage.setItem('visited', true);
//     }, 1000);
//   } else {
//     spinner.classList.add('is-loaded');
//   }
// });


/* ----------- 2. ページ内スクロール ----------- */
window.addEventListener('DOMContentLoaded', () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  // console.log(anchorLinks);
  const anchorLinksArray = Array.prototype.slice.call(anchorLinks);

  anchorLinksArray.forEach(link => {
    // console.log(link);
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.hash;
      // console.log(targetId);
      const targetElement = document.querySelector(targetId);// #about
      // console.log(targetElement);
      const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;
      // console.log(targetOffsetTop);
      window.scrollTo({
        top: targetOffsetTop,
        behavior: "smooth"
      });
    });
  });
});

/* ----------- スクロールでヘッダー背景色つける ----------- */

/* ----------- ダークモード切替え ----------- */
/* ----------- モーダルウィンドウ ----------- */
/* ----------- Swiper(スライドショー) ----------- */


/* ----------- 3. ハンバーガーメニュー ----------- */
// 要素を取得
const hamburger = document.querySelector('.js-hamburger'); // ハンバーガーボタン
const globalNav = document.querySelector('.js-global-nav'); // ナビゲーションメニュー
const globalNavLinks = document.querySelectorAll('.js-global-nav-link'); // ナビゲーションメニューのリンク
const overlay = document.querySelector('.js-overlay'); // ナビゲーションメニューのオーバーレイ(白い背景)

// ハンバーガーボタンをクリックした時の処理
hamburger.addEventListener('click', () => {
  // メニューを開く関数を呼び出す
  toggleHamburgerClass();
});

// メニューを開いてリンクをクリックした時の処理
globalNavLinks.forEach((link) => {
  // forEachでそれぞれの<a>タグにクリックイベントを設定
  link.addEventListener('click', (e) => {
    // デフォルトのリンク動作をしないようにする
    e.preventDefault();
    // メニューを閉じる関数を呼び出す
    removeHamburgerClass();
  });
});

// SP版でメニューが開いた状態でPC版にリサイズした場合の対応
window.addEventListener('resize', () => { // 画面幅を変更したときに
  // is-activeクラスが付いていたら
  if (hamburger.classList.contains('is-active') && globalNav.classList.contains('is-active') && overlay.classList.contains('is-active')) {
    // メニューを閉じる関数を呼び出す
    removeHamburgerClass();
  }
});

// メニュー開↔閉の処理をまとめる
function toggleHamburgerClass() {
  hamburger.classList.toggle('is-active');
  globalNav.classList.toggle('is-active');
  overlay.classList.toggle('is-active');
  document.body.classList.toggle('no-scroll');
}

// メニューを閉じる処理をまとめる
function removeHamburgerClass() {
  hamburger.classList.remove('is-active');
  globalNav.classList.remove('is-active');
  overlay.classList.remove('is-active');
  document.body.classList.remove('no-scroll');
}

/* ----------- 4. Swiper(フェード) ----------- */
// ページが読み込まれたら
window.addEventListener('load', () => {
  // 動作オプションを設定する
  let swipeOption = {
    loop: true, // スライドショーをループさせる
    effect: 'fade', // フェードアニメーションに設定
    autoplay: {
      delay: 3000, // 3秒ごとにフェードさせる
      disableOnInteraction: false,
    },
    speed: 2000, // 2秒間かけてフェードさせる
  }
  // Swiperを初期化: 第1引数 swiper-containerクラス / 第2引数 オプション
  new Swiper('.swiper-container', swipeOption);
});

/* ----------- 5. GSAPアニメーション ----------- */
const textElement = document.querySelector('.kv__main-copy');
const text = textElement.innerText;
textElement.innerText = '';

function animateText() {
  const characters = text.split('');
  characters.forEach((char, index) => {
    const span = document.createElement('span');
    span.innerText = char;
    span.style.opacity = 0;
    span.style.transform = 'translateY(20px)';
    textElement.appendChild(span);

    gsap.to(span, {
      duration: 1,
      opacity: 1,
      y: 0,
      delay: index * 0.05,
      ease: 'power3.out',
    })
  });
}

setTimeout(() => {
  animateText();
}, 2000);

/* ----------- 6. タブメニュー ----------- */
// タブ要素をすべて取得する
const tabItem = document.querySelectorAll('.tab__item');
// パネル要素をすべて取得する
const panelItem = document.querySelectorAll('.panel__container');

for (let i = 0; i < tabItem.length; i++) {
  tabItem[i].addEventListener('click', tabToggle);
}

function tabToggle() {
  // いったん全部のタブのis-activeクラスを外す
  for (let i = 0; i < tabItem.length; i++) {
    tabItem[i].classList.remove('is-active');
  }
  // いったん全部のパネルのis-activeクラスを外す
  for (let i = 0; i < panelItem.length; i++) {
    panelItem[i].classList.remove('is-active');
  }

  this.classList.add('is-active');

  const aryTabs = Array.prototype.slice.call(tabItem);

  const index = aryTabs.indexOf(this);

  panelItem[index].classList.add('is-active');
}

/* ----------- 7. アコーディオンメニュー ----------- */
// Q&AのQエリアをすべて取得(NodeList)
const qa = document.querySelectorAll('.js-ac');
// console.log(qa);

function acToggle() {
  const content = this.nextElementSibling;
  content.classList.toggle('is-open');
  const qa = this; // js-ac要素自身
  qa.classList.toggle('is-open');
}

for (let i = 0; i < qa.length; i++) {
  qa[i].addEventListener('click', acToggle);
}

/* ----------- 8. フォームのバリデーション ----------- */

const form = document.querySelector('.form');
const submitButton = document.querySelector('.form-btn');

form.addEventListener('input', (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll('.required');
  let isValid = true;

  inputs.forEach((input) => {
    const errorId = 'error' + input.id.substring(5);
    const errorMessage = document.getElementById(errorId);

    if (input.value.trim() === '') {
      errorMessage.classList.add('is-error');
      isValid = false;
    } else {
      errorMessage.classList.remove('is-error');
    }
  });

  submitButton.disabled = !isValid;
});

/* ----------- 9. TOPへ戻るボタン ----------- */
const toTopBtn = document.getElementById('to-top');
// console.log(toTopBtn);
toTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

window.addEventListener('scroll', scrollEvent);

function scrollEvent() {
  if (window.pageYOffset > 300) {
    toTopBtn.classList.add('is-active');
  } else {
    toTopBtn.classList.remove('is-active');
  }
}

/* ----------- 10. GSAPのプラグインscrollTrigger(スクロールして要素が画面内に入ったらふわっと表示) ----------- */
// js-scroll-triggerクラスが付いた要素をすべて取得する
const scrollAreas = document.querySelectorAll('.js-scroll-trigger');
// console.log(scrollAreas);

// 取得した要素をforEach()を使って1個ずつ処理する
scrollAreas.forEach((scrollArea) => {
  // console.log(scrollArea);
  // gsap.fromToメソッドを使って1個ずつアニメーションの設定をする
  gsap.fromTo(scrollArea,
    {
      // 初期状態
      autoAlpha: 0, // 非表示
      y: 80, // transform: translateY(80px)と同じ
    },
    {
      // アニメーション終了時の状態
      autoAlpha: 1, // 表示
      y: 0, // transform: translateY(0)と同じ
      duration: 2, // 2秒かけて表示
      scrollTrigger: { // scrollTriggerで、スクロール中はそれぞれのエリアを監視する
        trigger: scrollArea,
        start: "top 80%",
        end: "bottom 20%",
        // markers: true, // 目印を表示
      }
    }
  );
});
