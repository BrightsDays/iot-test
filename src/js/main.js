window.addEventListener("DOMContentLoaded", () => {
    'use strict';

    const loadData = async (data) => {
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
        if (newsList.length == 0) {count.disabled = true;}

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

            item.append(header,author,date,link,status);
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