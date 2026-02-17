# Testing Guide - Blog Management System

## Manual Testing Checklist

### 1. Authentication Flow
- [ ] **Register Page** (`/pages/register.html`)
  - Open the register page
  - Fill in: First Name, Last Name, Email, Password, Confirm Password
  - Test validation: empty fields, invalid email, weak password, password mismatch
  - Submit and verify redirect to login page
  - Check success toast message

- [ ] **Login Page** (`/pages/login.html`)
  - Open the login page
  - Enter registered credentials
  - Test "Remember Me" checkbox
  - Submit and verify redirect to dashboard
  - Check token is saved in localStorage
  - Test with wrong credentials (should show error)

- [ ] **Logout**
  - Click logout from any page
  - Verify redirect to login page
  - Check localStorage is cleared

### 2. Dashboard
- [ ] **Dashboard Page** (`/pages/dashboard.html`)
  - Verify welcome message shows user name
  - Check stats cards display correct numbers
  - Verify recent articles list
  - Test quick action buttons

### 3. Profile Management
- [ ] **Profile Page** (`/pages/profile.html`)
  - View current profile information
  - Update profile (First Name, Last Name, Email)
  - Upload avatar (test with image < 5MB)
  - Delete avatar
  - Verify changes are saved and reflected

### 4. Categories Management
- [ ] **Categories Page** (`/pages/categories.html`)
  - View all categories in table
  - Create new category with name and description
  - Edit existing category
  - Delete category (with confirmation)
  - Test search functionality
  - Test sort by name (ASC/DESC)
  - Test pagination

### 5. Articles Management

#### All Articles
- [ ] **Articles Page** (`/pages/articles.html`)
  - View all articles in grid layout
  - Test search by title/content
  - Filter by category
  - Test pagination
  - Click on article to view details

#### Article Details
- [ ] **Article Detail Page** (`/pages/article-detail.html`)
  - View full article with thumbnail
  - Verify author information
  - Check category and dates
  - If owner: test Edit and Delete buttons

#### My Articles
- [ ] **My Articles Page** (`/pages/my-articles.html`)
  - View only own articles
  - Test search
  - Quick actions: View, Edit, Delete
  - Test pagination

#### Create/Edit Article
- [ ] **Create Article** (`/pages/create-article.html`)
  - Fill in: Title, Category, Content
  - Upload thumbnail (test preview)
  - Submit and verify creation
  - Check redirect to My Articles

- [ ] **Edit Article** (`/pages/create-article.html?id=X`)
  - Load existing article data
  - Modify fields
  - Change thumbnail
  - Delete thumbnail
  - Save changes
  - Verify updates

### 6. Responsive Design Testing
- [ ] **Mobile** (320px - 767px)
  - Test all pages on mobile view
  - Verify navigation menu toggle works
  - Check layouts are stacked properly
  - Verify buttons and forms are usable

- [ ] **Tablet** (768px - 1023px)
  - Test all pages on tablet view
  - Verify grid layouts adjust properly

- [ ] **Desktop** (1024px+)
  - Test all pages on desktop view
  - Verify all features work as expected

### 7. Error Handling
- [ ] Test API errors (network failures)
- [ ] Test validation errors (empty required fields)
- [ ] Test 401 unauthorized (expired token)
- [ ] Test file upload errors (large files, wrong format)
- [ ] Verify error messages are user-friendly

### 8. UI/UX Features
- [ ] Toast notifications appear and auto-dismiss
- [ ] Loading spinners show during API calls
- [ ] Confirmation modals work for delete actions
- [ ] Form validation feedback is clear
- [ ] Empty states display when no data
- [ ] Hover effects and transitions work smoothly

## Automated Testing Notes

Since this is a vanilla JS application without a build system, automated testing can be added using:
- Jest for unit tests
- Cypress or Playwright for E2E tests

## Known Limitations

1. No offline support
2. Images must be < 5MB
3. Text content is not sanitized server-side
4. No real-time updates
5. No file type validation beyond `image/*`

## API Testing

Use the provided Postman collection (`postman/ANT-Mini-Blog-adm.json`) to test all API endpoints independently.

Import steps:
1. Open Postman
2. Import > File > Select `ANT-Mini-Blog-adm.json`
3. Set the `base_url` variable to: `https://blogs2.csm.linkpc.net/api/v1`
4. After login, set the `token` variable with the JWT token from response
5. Test all endpoints

## Security Checklist

- [x] Token stored in localStorage
- [x] Authorization header in protected requests
- [x] Client-side input validation
- [x] HTML sanitization for XSS prevention
- [x] Password validation (min 6 characters)
- [x] Email validation
- [ ] HTTPS only (server configuration)
- [ ] Content Security Policy (server configuration)

## Browser Compatibility

Tested browsers:
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

## Performance

- Optimize images before upload
- Lazy loading not implemented
- No caching strategy
- API pagination helps with large datasets

## Accessibility

Basic accessibility features:
- Semantic HTML
- Alt text for images
- Form labels
- Keyboard navigation (native)

Improvements needed:
- ARIA labels
- Focus management
- Screen reader testing
- Color contrast validation
