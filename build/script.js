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

  const loadData = async data => {
    const response = await fetch(data);

    if (response.status == 200) {
      const answer = await response.json();
      return answer;
    } else {
      return [];
    }
  };

  const createList = (newsList, target) => {
    const root = document.querySelector(target);
    const newsBox = document.createElement('div');
    const count = document.createElement('button');
    newsBox.classList.add('test-news');
    count.classList.add('test-news__count');
    count.textContent = newsList.length;

    if (newsList.length == 0) {
      count.disabled = true;
    }

    root.appendChild(newsBox);

    for (let i in newsList) {
      const item = document.createElement('div');
      const header = document.createElement('span');
      const author = document.createElement('p');
      const date = document.createElement('p');
      const link = document.createElement('a');
      const status = document.createElement('span');
      item.classList.add('test-news__item');
      header.classList.add('test-news__header');
      header.textContent = newsList[i].header;
      author.classList.add('test-news__author');
      author.textContent = `Автор: ${newsList[i].author}`;
      date.classList.add('test-news__date"');
      date.textContent = newsList[i].date;
      link.classList.add('test-news__link');
      link.textContent = 'Подробнее';
      link.href = newsList[i].link;
      status.classList.add('test-news__status');
      status.textContent = 'не прочитано';
      item.append(header, author, date, link, status);
      newsBox.appendChild(item);
    }

    newsBox.appendChild(count);
    count.addEventListener('click', () => {
      document.querySelectorAll('.test-news__item').forEach(item => {
        if (!item.classList.contains('test-news__item--show')) {
          item.classList.add('test-news__item--show');
          count.textContent = 'X';
          count.style.backgroundColor = '#ff0000';
        } else {
          item.classList.remove('test-news__item--show');
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
      markRead();
    });
  };

  newsFeed('https://brightsdays.github.io/iot-test/news.json', '.root');
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map