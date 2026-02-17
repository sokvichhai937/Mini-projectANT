// Categories Management Logic

let currentPage = 1;
let totalPages = 1;
let currentSearch = '';
let currentSortBy = 'name';
let currentSortDir = 'ASC';

// Load categories
async function loadCategories() {
    try {
        const tableBody = document.getElementById('categoriesTableBody');
        tableBody.innerHTML = '<tr><td colspan="5" class="text-center"><div class="spinner"></div></td></tr>';
        
        const response = await categoriesAPI.getAll({
            page: currentPage,
            perPage: 10,
            search: currentSearch,
            sortBy: currentSortBy,
            sortDir: currentSortDir
        });
        
        if (!response.data || response.data.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">
                        <div class="empty-state">
                            <div class="empty-state-icon">📁</div>
                            <div class="empty-state-text">មិនមានប្រភេទ</div>
                        </div>
                    </td>
                </tr>
            `;
            document.getElementById('paginationContainer').innerHTML = '';
            return;
        }
        
        // Calculate total pages from response
        totalPages = response.pages || 1;
        
        // Render categories
        tableBody.innerHTML = response.data.map((category, index) => `
            <tr>
                <td>${(currentPage - 1) * 10 + index + 1}</td>
                <td><strong>${sanitizeHTML(category.name)}</strong></td>
                <td>${sanitizeHTML(category.description || '-')}</td>
                <td>${formatDate(category.createdAt)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-primary action-btn" onclick="editCategory(${category.id})">
                            ✏️ កែសម្រួល
                        </button>
                        <button class="btn btn-sm btn-danger action-btn" onclick="deleteCategory(${category.id})">
                            🗑️ លុប
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
        
        // Render pagination
        renderPagination();
    } catch (error) {
        showToast('មិនអាចទាញយកប្រភេទបាន', 'error');
        console.error('Load categories error:', error);
    }
}

// Render pagination
function renderPagination() {
    const container = document.getElementById('paginationContainer');
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = `
        <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            ← មុន
        </button>
        <span>ទំព័រ ${currentPage} / ${totalPages}</span>
        <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            បន្ទាប់ →
        </button>
    `;
}

// Change page
function changePage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    loadCategories();
}

// Open category modal
function openCategoryModal(categoryId = null) {
    const modal = document.getElementById('categoryModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('categoryForm');
    
    form.reset();
    document.getElementById('categoryId').value = '';
    document.getElementById('categoryNameError').textContent = '';
    
    if (categoryId) {
        modalTitle.textContent = 'កែសម្រួលប្រភេទ';
        loadCategoryDetails(categoryId);
    } else {
        modalTitle.textContent = 'បង្កើតប្រភេទថ្មី';
    }
    
    modal.style.display = 'flex';
}

// Close category modal
function closeCategoryModal() {
    document.getElementById('categoryModal').style.display = 'none';
}

// Load category details
async function loadCategoryDetails(categoryId) {
    try {
        const category = await categoriesAPI.getById(categoryId);
        document.getElementById('categoryId').value = category.id;
        document.getElementById('categoryName').value = category.name;
        document.getElementById('categoryDescription').value = category.description || '';
    } catch (error) {
        showToast('មិនអាចទាញយកព័ត៌មានប្រភេទបាន', 'error');
        closeCategoryModal();
    }
}

// Save category
async function saveCategory() {
    const categoryId = document.getElementById('categoryId').value;
    const name = document.getElementById('categoryName').value.trim();
    const description = document.getElementById('categoryDescription').value.trim();
    
    // Validation
    if (!name) {
        document.getElementById('categoryNameError').textContent = 'សូមបញ្ចូលឈ្មោះប្រភេទ';
        return;
    }
    
    const saveBtn = document.getElementById('saveCategoryBtn');
    saveBtn.disabled = true;
    saveBtn.textContent = 'កំពុងរក្សាទុក...';
    
    try {
        if (categoryId) {
            await categoriesAPI.update(categoryId, { name, description });
            showToast('កែសម្រួលប្រភេទជោគជ័យ', 'success');
        } else {
            await categoriesAPI.create({ name, description });
            showToast('បង្កើតប្រភេទជោគជ័យ', 'success');
        }
        
        closeCategoryModal();
        loadCategories();
    } catch (error) {
        showToast(error.message || 'មិនអាចរក្សាទុកបាន', 'error');
    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'រក្សាទុក';
    }
}

// Edit category
function editCategory(categoryId) {
    openCategoryModal(categoryId);
}

// Delete category
function deleteCategory(categoryId) {
    showConfirmation('តើអ្នកពិតជាចង់លុបប្រភេទនេះមែនទេ?', async () => {
        try {
            await categoriesAPI.delete(categoryId);
            showToast('លុបប្រភេទជោគជ័យ', 'success');
            loadCategories();
        } catch (error) {
            showToast(error.message || 'មិនអាចលុបបាន', 'error');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    
    // Search
    let searchTimeout;
    document.getElementById('searchInput').addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearch = e.target.value;
            currentPage = 1;
            loadCategories();
        }, 500);
    });
    
    // Sort
    document.getElementById('sortBy').addEventListener('change', (e) => {
        currentSortBy = e.target.value;
        currentPage = 1;
        loadCategories();
    });
    
    document.getElementById('sortDir').addEventListener('change', (e) => {
        currentSortDir = e.target.value;
        currentPage = 1;
        loadCategories();
    });
});
