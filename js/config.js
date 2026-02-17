// API Configuration
const API_BASE_URL = 'https://blogs2.csm.linkpc.net/api/v1';
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

// Pagination defaults
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_BASE_URL, TOKEN_KEY, USER_KEY, DEFAULT_PAGE, DEFAULT_PER_PAGE };
}
