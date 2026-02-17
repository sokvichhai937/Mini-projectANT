// API Service Functions

// Generic API call function
async function apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getToken();
    
    const headers = {
        ...options.headers,
    };
    
    // Add Authorization header if token exists
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Add Content-Type for JSON if not FormData
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    
    const config = {
        ...options,
        headers,
    };
    
    try {
        const response = await fetch(url, config);
        
        // Handle 401 Unauthorized - token expired or invalid
        if (response.status === 401) {
            removeToken();
            removeUserData();
            window.location.href = '/pages/login.html';
            throw new Error('Unauthorized. Please login again.');
        }
        
        // Parse response
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Auth API
const authAPI = {
    register: (userData) => {
        return apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },
    
    login: (credentials) => {
        return apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },
    
    logout: () => {
        return apiCall('/auth/logout', {
            method: 'DELETE',
        });
    },
    
    getProfile: () => {
        return apiCall('/auth/profile', {
            method: 'GET',
        });
    },
};

// Profile API
const profileAPI = {
    updateProfile: (profileData) => {
        return apiCall('/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
    },
    
    uploadAvatar: (file) => {
        const formData = new FormData();
        formData.append('avatar', file);
        return apiCall('/profile/avatar', {
            method: 'POST',
            body: formData,
        });
    },
    
    deleteAvatar: () => {
        return apiCall('/profile/avatar', {
            method: 'DELETE',
        });
    },
};

// Categories API
const categoriesAPI = {
    getAll: (params = {}) => {
        const queryString = buildQueryString({
            _page: params.page || DEFAULT_PAGE,
            _per_page: params.perPage || DEFAULT_PER_PAGE,
            sortBy: params.sortBy || 'name',
            sortDir: params.sortDir || 'ASC',
            search: params.search || '',
        });
        return apiCall(`/categories?${queryString}`, {
            method: 'GET',
        });
    },
    
    getById: (id) => {
        return apiCall(`/categories/${id}`, {
            method: 'GET',
        });
    },
    
    create: (categoryData) => {
        return apiCall('/categories', {
            method: 'POST',
            body: JSON.stringify(categoryData),
        });
    },
    
    update: (id, categoryData) => {
        return apiCall(`/categories/${id}`, {
            method: 'PUT',
            body: JSON.stringify(categoryData),
        });
    },
    
    delete: (id) => {
        return apiCall(`/categories/${id}`, {
            method: 'DELETE',
        });
    },
};

// Articles API
const articlesAPI = {
    getAll: (params = {}) => {
        const queryString = buildQueryString({
            search: params.search || '',
            _page: params.page || DEFAULT_PAGE,
            _per_page: params.perPage || 100,
        });
        return apiCall(`/articles?${queryString}`, {
            method: 'GET',
        });
    },
    
    getById: (id) => {
        return apiCall(`/articles/${id}`, {
            method: 'GET',
        });
    },
    
    getOwn: (params = {}) => {
        const queryString = buildQueryString({
            search: params.search || '',
            _page: params.page || DEFAULT_PAGE,
            _per_page: params.perPage || 100,
            sortBy: params.sortBy || 'createdAt',
            sortDir: params.sortDir || 'asc',
        });
        return apiCall(`/articles/own?${queryString}`, {
            method: 'GET',
        });
    },
    
    getByCreator: (creatorId, params = {}) => {
        const queryString = buildQueryString({
            search: params.search || '',
            _page: params.page || DEFAULT_PAGE,
            _per_page: params.perPage || 10,
            sortBy: params.sortBy || 'createdAt',
            sortDir: params.sortDir || 'asc',
        });
        return apiCall(`/articles/by/${creatorId}?${queryString}`, {
            method: 'GET',
        });
    },
    
    create: (articleData) => {
        return apiCall('/articles', {
            method: 'POST',
            body: JSON.stringify(articleData),
        });
    },
    
    update: (id, articleData) => {
        return apiCall(`/articles/${id}`, {
            method: 'PUT',
            body: JSON.stringify(articleData),
        });
    },
    
    delete: (id) => {
        return apiCall(`/articles/${id}`, {
            method: 'DELETE',
        });
    },
    
    uploadThumbnail: (id, file) => {
        const formData = new FormData();
        formData.append('thumbnail', file);
        return apiCall(`/articles/${id}/thumbnail`, {
            method: 'POST',
            body: formData,
        });
    },
    
    deleteThumbnail: (id) => {
        return apiCall(`/articles/${id}/thumbnail`, {
            method: 'DELETE',
        });
    },
};
