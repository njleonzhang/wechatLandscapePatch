/**
 * Created by leon on 16/5/21.
 */

const inBrowser =
  typeof window !== 'undefined' &&
  Object.prototype.toString.call(window) !== '[object Object]';

const UA = inBrowser && window.navigator.userAgent.toLowerCase();

const isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
const isWechat = UA && UA.indexOf('micromessenger') > 0;

exports.apply = function(id) {
  if (isIos && isWechat) {
    let height = window.screen.height - 20 - 44;
    let element = document.getElementById(id);
    if (element) {
      element.style.height = `${height}px`;
    }
  }
};
