document.addEventListener('DOMContentLoaded', function() {
    // Табы
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Загрузка главы
    const chapterItems = document.querySelectorAll('.chapter-item');
    const readerContainer = document.querySelector('.reader-container');
    const mangaReader = document.getElementById('manga-reader');
    const backBtn = document.querySelector('.back-btn');
    const chapterTitle = document.querySelector('.chapter-title');
    const mangaInfo = document.querySelector('.manga-info');
    
    chapterItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const chapterNum = this.getAttribute('data-chapter');
            loadChapter(chapterNum);
        });
    });
    
    backBtn.addEventListener('click', function() {
        readerContainer.classList.remove('active');
        mangaInfo.classList.remove('hidden');
    });
    
    function loadChapter(chapterNum) {
        // Очищаем reader
        mangaReader.innerHTML = '';
        
        // Устанавливаем название главы
        chapterTitle.textContent = `Глава ${chapterNum}`;
        
        // Показываем reader и скрываем информацию о манге
        readerContainer.classList.add('active');
        mangaInfo.classList.add('hidden');
        
        // Загрузка страниц
        const pageCount = 18;
        
        for (let i = 1; i <= pageCount; i++) {
            const img = document.createElement('img');
            img.src = `chapters/chapter${chapterNum}/${i}.jpg`;
            img.alt = `Страница ${i}`;
            img.className = 'manga-page';
            img.loading = 'lazy';
            mangaReader.appendChild(img);
        }
        
        // Прокручиваем к верху
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Загрузка главы из URL параметра
    const urlParams = new URLSearchParams(window.location.search);
    const chapterParam = urlParams.get('chapter');
    
    if (chapterParam) {
        loadChapter(chapterParam);
    }
});