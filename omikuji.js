'use strict';
const userNameInput = document.getElementById('user-name');
const omikujiButton = document.getElementById('omikuji');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
const omikuji = ['大吉', '吉', '中吉', '小吉', '末吉', '凶', '大凶'];

userNameInput.onkeydown = (e) => {
  if(e.key === 'Enter') {
    omikujiButton.onclick();
  }
}

omikujiButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) { // 名前が空のときは終了する
    return;
  }

  // 占い結果の表示
  resultDivided.innerText = "";
  const header = document.createElement('h2');
  header.innerText = "占い結果"
  resultDivided.appendChild(header);

  const paragrah = document.createElement('p');
  const result = uranai(userName);
  paragrah.innerText = result;
  resultDivided.appendChild(paragrah);
  
  // tweet-areaの表示
  tweetDivided.innerText = "";
  const anchor = document.createElement('a');
  const hrefValue = 
  `https://twitter.com/intent/tweet?button_hashtag=${encodeURIComponent('おみくじ')}&ref_src=twsrc%5Etfw`;
  
  anchor.setAttribute('href', hrefValue);
  anchor.className = "twitter-hashtag-button";
  anchor.setAttribute('data-text', result);
  anchor.innerText = "Tweet #おみくじ"

  tweetDivided.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src', "https://platform.twitter.com/widgets.js");
  tweetDivided.appendChild(script);
}


/**
 * 名前の文字列を渡すと、結果を返す関数
 * @param {string} userName
 * @return {string} 占い結果
 */

function uranai(userName) {
  // 名前の全文字のコード番号を取得して合計する
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++){
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i)
  }

  // 日替わりになるように、合計値に今日の日付を足す
  const date = new Date();
  let sumOfDatecharCode = sumOfCharCode + date.getDate(); 
  
  // 名前と日付の合計を回答の数で割った添字の数値を求める
  const index = sumOfDatecharCode % omikuji.length;
  let result = omikuji[index];
  result = `${userName} さんは${result} です。`;

  return result;
}


