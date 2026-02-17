// Authentication Logic

// Logout function
async function logout() {
    try {
        await authAPI.logout();
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        // Clear local storage regardless of API response
        removeToken();
        removeUserData();
        showToast('ចាកចេញជោគជ័យ', 'success');
        window.location.href = '/pages/login.html';
    }
}

// Check authentication on protected pages
function checkAuth() {
    if (!isAuthenticated()) {
        window.location.href = '/pages/login.html';
        return false;
    }
    return true;
}

// Update navbar with user info
function updateNavbar() {
    const userData = getUserData();
    if (!userData) return;
    
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = `${userData.firstName} ${userData.lastName}`;
    }
    
    const userEmailElement = document.getElementById('userEmail');
    if (userEmailElement) {
        userEmailElement.textContent = userData.email;
    }
    
    const userAvatarElement = document.getElementById('userAvatar');
    if (userAvatarElement && userData.avatar) {
        userAvatarElement.src = getImageUrl(userData.avatar);
    }
}

// Initialize auth state
function initAuth() {
    // Check if on a protected page
    const isProtectedPage = !window.location.pathname.includes('login.html') && 
                           !window.location.pathname.includes('register.html') &&
                           !window.location.pathname.includes('index.html');
    
    if (isProtectedPage) {
        checkAuth();
        updateNavbar();
    }
}

// Auto-initialize on page load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initAuth);
}
