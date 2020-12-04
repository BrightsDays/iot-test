/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", () => {
  'use strict';

  const newsTest = [{
    "header": "Новость",
    "author": "Давид",
    "date": "23.12.2108",
    "link": "www.dot.com"
  }, {
    "header": "Танцы с бубном",
    "author": "Эрик",
    "date": "12.09.1918",
    "link": "www.dot.com"
  }, {
    "header": "Годовщина Великой Изоляции",
    "author": "Эмма",
    "date": "89.56.3245",
    "link": "www.dot.com"
  }, {
    "header": "Падение евро остановлено",
    "author": "Жанна",
    "date": "31.02.2007",
    "link": "www.dot.com"
  }];

  const loadData = async data => {
    let response = await fetch(data);
    let answer = await response.json();
    return answer;
  };

  const createList = (newsList, target) => {
    const root = document.querySelector(target);
    const newsBox = document.createElement('div');
    const count = document.createElement('button');
    newsBox.classList.add('test-news');
    count.classList.add('test-news__count');
    count.textContent = newsList.length;
    root.appendChild(newsBox);

    for (let i in newsList) {
      const newsItem = `
                <div class="test-news__item test-news__item_hide">
                    <h1 class="test-news__header">${newsList[i].header}</h1>
                    <p class="test-news__author">автор: ${newsList[i].author}</p>
                    <p class="test-news__date">${newsList[i].date}</p>
                    <a class="test-news__link" href="${newsList[i].link}">Подробнее</a>
                    <span class="test-news__status">не прочитано</span>
                </div>
            `;
      newsBox.innerHTML += newsItem;
    }

    newsBox.appendChild(count);
    count.addEventListener('click', () => {
      document.querySelectorAll('.test-news__item').forEach(item => {
        if (!item.classList.contains('test-news__item_show')) {
          item.classList.add('test-news__item_show');
          count.textContent = 'X';
          count.style.backgroundColor = '#ff0000';
        } else {
          item.classList.remove('test-news__item_show');
          count.textContent = newsList.length;
          count.style.backgroundColor = '#0ea11a';
        }
      });
    });
  };

  const markRead = () => {
    document.querySelectorAll('.test-news__link').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        const status = item.parentElement.querySelector('.test-news__status');
        item.parentElement.style.color = '#bebcbc';
        status.textContent = 'прочитано';
        status.style.color = '#000000';
      });
    });
  };

  const newsFeed = (news, wrap) => {
    loadData(news).then(json => {
      createList(json, wrap);
    });
    markRead();
  };

  newsFeed(newsTest, '.root');
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map