// Utility Functions

// Get token from localStorage
function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

// Set token to localStorage
function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

// Remove token from localStorage
function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

// Get user data from localStorage
function getUserData() {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
}

// Set user data to localStorage
function setUserData(userData) {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
}

// Remove user data from localStorage
function removeUserData() {
    localStorage.removeItem(USER_KEY);
}

// Check if user is authenticated
function isAuthenticated() {
    return !!getToken();
}

// Redirect to login if not authenticated
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = '/pages/login.html';
        return false;
    }
    return true;
}

// Show toast notification (Bootstrap 5 compatible)
function showToast(message, type = 'info') {
    // Check if Bootstrap is loaded
    if (typeof bootstrap === 'undefined') {
        // Fallback to simple alert
        alert(message);
        return;
    }
    
    // Find or create toast container
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '1060';
        document.body.appendChild(toastContainer);
    }
    
    // Determine toast colors based on type
    let bgClass = 'bg-info';
    let icon = 'ℹ️';
    let title = 'Info';
    
    if (type === 'success') {
        bgClass = 'bg-success';
        icon = '✓';
        title = 'Success';
    } else if (type === 'error' || type === 'danger') {
        bgClass = 'bg-danger';
        icon = '✗';
        title = 'Error';
    } else if (type === 'warning') {
        bgClass = 'bg-warning';
        icon = '⚠';
        title = 'Warning';
    }
    
    // Create toast element
    const toastId = 'toast-' + Date.now();
    const toastHtml = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header ${bgClass} text-white">
                <strong class="me-auto">${icon} ${title}</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${sanitizeHTML(message)}
            </div>
        </div>
    `;
    
    // Add toast to container
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    // Initialize and show toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
    });
    
    toast.show();
    
    // Remove toast from DOM after it's hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

// Show loading spinner
function showLoading(element) {
    if (element) {
        element.innerHTML = '<div class="spinner"></div>';
    }
}

// Hide loading spinner
function hideLoading(element, content = '') {
    if (element) {
        element.innerHTML = content;
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Sanitize HTML to prevent XSS
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate password strength
function validatePassword(password) {
    // At least 6 characters
    return password.length >= 6;
}

// Show confirmation modal
function showConfirmation(message, onConfirm) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <p>${sanitizeHTML(message)}</p>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                <button class="btn btn-danger" id="confirmBtn">Confirm</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('confirmBtn').addEventListener('click', () => {
        modal.remove();
        onConfirm();
    });
}

// Get query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Build query string
function buildQueryString(params) {
    return Object.keys(params)
        .filter(key => params[key] !== null && params[key] !== undefined && params[key] !== '')
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
}

// Truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Get image URL or placeholder
function getImageUrl(imagePath) {
    if (!imagePath) return '/assets/images/placeholder.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
}
