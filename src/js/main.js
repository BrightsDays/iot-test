window.addEventListener("DOMContentLoaded", () => {
    'use strict';

    const news = [
        {
            "header": "Новость",
            "author": "Давид",
            "date": "23.12.2108",
            "link": "www.dot.com"       
        },
        {
            "header": "Танцы с бубном",
            "author": "Эрик",
            "date": "12.09.1918",
            "link": "www.dot.com"        
        },
        {
            "header": "Годовщина Великой Изоляции",
            "author": "Эмма",
            "date": "89.56.3245",
            "link": "www.dot.com"        
        },
        {
            "header": "Падение евро остановлено",
            "author": "Жанна",
            "date": "31.02.2007",
            "link": "www.dot.com"        
        }
    ];

    const loadData = async (data) => {
        let response = await fetch(data);
        let answer = await response.json();

        return answer;
    };

    const loadList = (newsList) => {
        const root = document.querySelector('.root');
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
                item.classList.add('test-news__item_show');
            });
        });
    };

    // loadData(news)
    //     .then(json => {
    //         loadList(json);
    // });

    loadList(news);

    document.querySelectorAll('.test-news__link').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const status = item.parentElement.querySelector('.test-news__status');

            item.parentElement.style.color = '#bebcbc';
            status.textContent = 'прочитано';
            status.style.color = '#000000';
        });
    });
});