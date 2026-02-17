// Profile Management Logic

let currentProfile = null;

// Load profile data
async function loadProfile() {
    try {
        const profile = await authAPI.getProfile();
        currentProfile = profile;
        
        // Update profile display
        document.getElementById('profileName').textContent = `${profile.firstName} ${profile.lastName}`;
        document.getElementById('profileEmail').textContent = profile.email;
        
        // Update form fields
        document.getElementById('firstName').value = profile.firstName;
        document.getElementById('lastName').value = profile.lastName;
        document.getElementById('email').value = profile.email;
        
        // Update avatar
        if (profile.avatar) {
            document.getElementById('profileAvatar').src = getImageUrl(profile.avatar);
            document.getElementById('deleteAvatarBtn').style.display = 'inline-block';
        } else {
            document.getElementById('profileAvatar').src = '/assets/images/placeholder.jpg';
            document.getElementById('deleteAvatarBtn').style.display = 'none';
        }
        
        // Update stored user data
        setUserData(profile);
    } catch (error) {
        showToast('មិនអាចទាញយកព័ត៌មានបាន', 'error');
        console.error('Load profile error:', error);
    }
}

// Handle profile form submission
document.addEventListener('DOMContentLoaded', () => {
    // Load profile on page load
    loadProfile();
    
    // Handle profile update
    document.getElementById('profileForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Clear errors
        document.getElementById('firstNameError').textContent = '';
        document.getElementById('lastNameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        
        // Validation
        let hasError = false;
        
        if (!firstName) {
            document.getElementById('firstNameError').textContent = 'សូមបញ្ចូលនាមខ្លួន';
            hasError = true;
        }
        
        if (!lastName) {
            document.getElementById('lastNameError').textContent = 'សូមបញ្ចូលនាមត្រកូល';
            hasError = true;
        }
        
        if (!validateEmail(email)) {
            document.getElementById('emailError').textContent = 'សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ';
            hasError = true;
        }
        
        if (hasError) return;
        
        // Update profile
        const updateBtn = document.getElementById('updateBtn');
        updateBtn.disabled = true;
        updateBtn.textContent = 'កំពុងរក្សាទុក...';
        
        try {
            await profileAPI.updateProfile({ firstName, lastName, email });
            showToast('កែសម្រួលព័ត៌មានជោគជ័យ', 'success');
            loadProfile();
        } catch (error) {
            showToast(error.message || 'កែសម្រួលបរាជ័យ', 'error');
        } finally {
            updateBtn.disabled = false;
            updateBtn.textContent = '💾 រក្សាទុកការផ្លាស់ប្តូរ';
        }
    });
});

// Handle avatar upload
async function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showToast('សូមជ្រើសរើសរូបភាព', 'error');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showToast('រូបភាពធំពេក (អតិបរមា 5MB)', 'error');
        return;
    }
    
    try {
        showToast('កំពុងបញ្ចូលរូបភាព...', 'info');
        await profileAPI.uploadAvatar(file);
        showToast('បញ្ចូលរូបភាពជោគជ័យ', 'success');
        loadProfile();
    } catch (error) {
        showToast(error.message || 'បញ្ចូលរូបភាពបរាជ័យ', 'error');
    }
}

// Handle avatar delete
async function handleAvatarDelete() {
    showConfirmation('តើអ្នកពិតជាចង់លុបរូបភាពនេះមែនទេ?', async () => {
        try {
            await profileAPI.deleteAvatar();
            showToast('លុបរូបភាពជោគជ័យ', 'success');
            loadProfile();
        } catch (error) {
            showToast(error.message || 'លុបរូបភាពបរាជ័យ', 'error');
        }
    });
}
