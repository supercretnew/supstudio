document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('projects-grid');
    const dataFile = 'projects.txt';

    // Функция для создания HTML карточки (без изображения)
    function createCard(project) {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" class="btn" target="_blank">Смотреть проект</a>
        `;
        return card;
    }

    // Парсер вашего формата
    fetch(dataFile)
        .then(response => response.text())
        .then(text => {
            // Разбиваем текст на блоки по закрывающей скобке '}'
            const rawBlocks = text.split('}');

            rawBlocks.forEach(block => {
                // Чистим пробелы
                if (block.trim().length === 0) return;

                // Убираем открывающую скобку '{' и лишние переносы
                const content = block.replace('{', '').trim();
                
                const projectData = {};
                
                // Читаем построчно
                const lines = content.split('\n');
                lines.forEach(line => {
                    // Ищем позицию знака равно
                    const separatorIndex = line.indexOf('=');
                    if (separatorIndex > -1) {
                        const key = line.substring(0, separatorIndex).trim();
                        const value = line.substring(separatorIndex + 1).trim();
                        projectData[key] = value;
                    }
                });

                // Проверяем, что есть хотя бы имя, и добавляем на сайт
                if (projectData.name) {
                    container.appendChild(createCard(projectData));
                }
            });
        })
        .catch(error => {
            console.error('Ошибка загрузки файла проектов:', error);
            container.innerHTML = '<p style="text-align:center; color:red;">Не удалось загрузить список проектов. Проверьте наличие файла projects.txt</p>';
        });
});
