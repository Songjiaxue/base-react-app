import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import moment from 'moment';
import './api';
import './index.css';
import App from './route.js';
import * as serviceWorker from './serviceWorker';
import userInfoState from './store/user-info';

moment.locale('zh');
window.moment = moment;

ReactDOM.render(
  <HashRouter>
    <Provider userState={userInfoState}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);

(function (doc, win) {
  let docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      let scrollWidth = docEl.scrollWidth;
      if (!scrollWidth) return;
      if (scrollWidth > 1366) {
        docEl.style.fontSize = Math.floor(100 * (scrollWidth / 1920)) + 'px';
      } else {
        docEl.style.fontSize = Math.floor(100 * (1366 / 1920)) + 'px';
        // docEl.style.minWidth = "1366px";
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
