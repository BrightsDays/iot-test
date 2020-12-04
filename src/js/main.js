window.addEventListener("DOMContentLoaded", () => {
    'use strict';

    const loadData = async (data) => {
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
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const status = item.parentElement.querySelector('.test-news__status');
    
                item.parentElement.style.color = '#bebcbc';
                status.textContent = 'прочитано';
                status.style.color = '#000000';
            });
        });
    };

    const newsFeed = (news, wrap) => {
        loadData(news)
            .then(json => {
                createList(json, wrap);
                markRead();
        });
    };

    newsFeed('https://brightsdays.github.io/iot-test/news.json', '.root');
});