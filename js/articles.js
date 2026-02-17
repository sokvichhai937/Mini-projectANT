// Articles Management Logic

let currentPage = 1;
let totalPages = 1;
let currentSearch = '';
let currentCategoryFilter = '';

// Load articles
async function loadArticles() {
    try {
        const container = document.getElementById('articlesContainer');
        container.innerHTML = '<div class="loading-container"><div class="spinner"></div></div>';
        
        const response = await articlesAPI.getAll({
            search: currentSearch,
            page: currentPage,
            perPage: 12
        });
        
        let articles = response.data || [];
        
        // Filter by category if selected
        if (currentCategoryFilter) {
            articles = articles.filter(article => 
                article.categoryId && article.categoryId.toString() === currentCategoryFilter
            );
        }
        
        if (!articles || articles.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📄</div>
                    <div class="empty-state-text">មិនមានអត្ថបទ</div>
                </div>
            `;
            document.getElementById('paginationContainer').innerHTML = '';
            return;
        }
        
        // Render articles in grid
        container.innerHTML = `
            <div class="row">
                ${articles.map(article => `
                    <div class="col-12 col-md-6 col-lg-4 mb-4">
                        <div class="card" style="height: 100%;">
                            ${article.thumbnail ? `
                                <img src="${getImageUrl(article.thumbnail)}" class="card-img" alt="${sanitizeHTML(article.title)}">
                            ` : ''}
                            <div class="card-body">
                                <div class="mb-2">
                                    <span class="badge badge-primary">${sanitizeHTML(article.category?.name || 'Uncategorized')}</span>
                                </div>
                                <h5 class="card-title">${sanitizeHTML(truncateText(article.title, 60))}</h5>
                                <p class="card-text text-muted">${sanitizeHTML(truncateText(article.content, 100))}</p>
                                <div class="article-meta text-muted mb-3" style="font-size: 0.875rem;">
                                    <div>👤 ${sanitizeHTML(article.creator?.firstName || '')} ${sanitizeHTML(article.creator?.lastName || '')}</div>
                                    <div>📅 ${formatDate(article.createdAt)}</div>
                                </div>
                                <a href="/pages/article-detail.html?id=${article.id}" class="btn btn-primary btn-sm">អានបន្ត →</a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Update pagination
        totalPages = response.pages || 1;
        renderArticlePagination();
    } catch (error) {
        showToast('មិនអាចទាញយកអត្ថបទបាន', 'error');
        console.error('Load articles error:', error);
    }
}

// Render pagination
function renderArticlePagination() {
    const container = document.getElementById('paginationContainer');
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = `
        <button onclick="changeArticlePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            ← មុន
        </button>
        <span>ទំព័រ ${currentPage} / ${totalPages}</span>
        <button onclick="changeArticlePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            បន្ទាប់ →
        </button>
    `;
}

// Change page
function changeArticlePage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    loadArticles();
}

// Load category filter
async function loadCategoryFilter() {
    try {
        const response = await categoriesAPI.getAll({ perPage: 100 });
        const select = document.getElementById('categoryFilter');
        
        if (response.data && response.data.length > 0) {
            const options = response.data.map(category => 
                `<option value="${category.id}">${sanitizeHTML(category.name)}</option>`
            ).join('');
            select.innerHTML = '<option value="">ប្រភេទទាំងអស់</option>' + options;
        }
        
        select.addEventListener('change', (e) => {
            currentCategoryFilter = e.target.value;
            currentPage = 1;
            loadArticles();
        });
    } catch (error) {
        console.error('Load categories error:', error);
    }
}

// Initialize search
function initArticleSearch() {
    let searchTimeout;
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentSearch = e.target.value;
                currentPage = 1;
                loadArticles();
            }, 500);
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initArticleSearch();
});
