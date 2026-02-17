# 📝 Blog Management System - ប្រព័ន្ធគ្រប់គ្រងអត្ថបទប្លក់

## 📖 ការពិពណ៌នា

Blog Management System គឺជាកម្មវិធី Frontend Application ពេញលេញដែលបង្កើតឡើងដោយប្រើ HTML, CSS, និង JavaScript ធម្មតា (គ្មាន Framework) ។ ប្រព័ន្ធនេះអនុញ្ញាតឱ្យអ្នកប្រើប្រាស់អាចគ្រប់គ្រងអត្ថបទប្លក់ បង្កើតប្រភេទ និងអាចបញ្ចូលរូបភាពបានយ៉ាងងាយស្រួល។

## ✨ មុខងារសំខាន់ៗ

### 🔐 ប្រព័ន្ធផ្ទៀងផ្ទាត់អត្តសញ្ញាណ (Authentication)
- **ចុះឈ្មោះ (Register)**: បង្កើតគណនីថ្មីជាមួយនឹងព័ត៌មាន នាមខ្លួន, នាមត្រកូល, អ៊ីមែល និងលេខសម្ងាត់
- **ចូលប្រើប្រាស់ (Login)**: ចូលប្រើប្រាស់ប្រព័ន្ធដោយប្រើអ៊ីមែល និងលេខសម្ងាត់
- **ចាកចេញ (Logout)**: ចាកចេញពីប្រព័ន្ធដោយសុវត្ថិភាព
- **Remember Me**: ជម្រើសសម្រាប់ចងចាំការចូលប្រើប្រាស់

### 👤 គ្រប់គ្រងប្រវត្តិរូប (Profile Management)
- មើលព័ត៌មានប្រវត្តិរូបផ្ទាល់ខ្លួន
- កែសម្រួលព័ត៌មានផ្ទាល់ខ្លួន (នាមខ្លួន, នាមត្រកូល, អ៊ីមែល)
- បញ្ចូលរូបភាពប្រវត្តិរូប (Avatar) ជាមួយមុខងារមើលមុន
- លុបរូបភាពប្រវត្តិរូប

### 📁 គ្រប់គ្រងប្រភេទ (Categories Management)
- មើលប្រភេទទាំងអស់ក្នុងទម្រង់តារាង
- បង្កើតប្រភេទថ្មី
- កែសម្រួលប្រភេទ
- លុបប្រភេទ
- ស្វែងរកប្រភេទ
- តម្រៀបតាមឈ្មោះ (ឡើង/ចុះ)
- Pagination

### 📝 គ្រប់គ្រងអត្ថបទ (Articles Management)

#### មើលអត្ថបទទាំងអស់
- បង្ហាញអត្ថបទក្នុងទម្រង់ Grid Card
- ស្វែងរកអត្ថបទតាមចំណងជើង
- ច្រោះតាមប្រភេទ
- Pagination
- ចុចដើម្បីមើលព័ត៌មានលម្អិត

#### មើលព័ត៌មានលម្អិតអត្ថបទ
- បង្ហាញអត្ថបទពេញលេញជាមួយរូបភាព
- បង្ហាញព័ត៌មានអ្នកនិពន្ធ
- បង្ហាញប្រភេទ និងកាលបរិច្ឆេទ
- ប៊ូតុងកែសម្រួល/លុប (សម្រាប់អ្នកជាម្ចាស់)

#### អត្ថបទរបស់ខ្ញុំ
- បង្ហាញអត្ថបទដែលខ្ញុំបានបង្កើត
- សកម្មភាពរហ័ស: មើល, កែសម្រួល, លុប

#### បង្កើត/កែសម្រួលអត្ថបទ
- ទម្រង់បញ្ចូល: ចំណងជើង, មាតិកា, ប្រភេទ
- បញ្ចូលរូបភាពអត្ថបទ (Thumbnail) ជាមួយមុខងារមើលមុន
- លុបរូបភាពអត្ថបទ
- បង្កើតអត្ថបទថ្មី
- កែសម្រួលអត្ថបទដែលមានស្រាប់

### 🏠 ផ្ទាំងគ្រប់គ្រង (Dashboard)
- សារស្វាគមន៍ជាមួយឈ្មោះអ្នកប្រើប្រាស់
- ស្ថិតិរហ័ស: ចំនួនអត្ថបទសរុប, អត្ថបទរបស់ខ្ញុំ, ចំនួនប្រភេទ
- អត្ថបទថ្មីៗ
- សកម្មភាពរហ័ស: បង្កើតអត្ថបទ, គ្រប់គ្រងប្រភេទ

## 🛠️ បច្ចេកវិទ្យាដែលប្រើប្រាស់

- **HTML5**: រចនាសម្ព័ន្ធទំព័រ
- **CSS3**: ការរចនាទំនើប និង Responsive Design
- **JavaScript (Vanilla)**: Logic និងការទំនាក់ទំនងជាមួយ API
- **REST API**: `https://blogs2.csm.linkpc.net/api/v1`
- **LocalStorage**: ការរក្សាទុក Token និងព័ត៌មានអ្នកប្រើប្រាស់

## 📁 រចនាសម្ព័ន្ធ Project

```
Mini-projectANT/
├── index.html              # Homepage/Landing Page
├── pages/
│   ├── login.html          # ទំព័រចូលប្រើប្រាស់
│   ├── register.html       # ទំព័រចុះឈ្មោះ
│   ├── dashboard.html      # ផ្ទាំងគ្រប់គ្រងមេ
│   ├── profile.html        # គ្រប់គ្រងប្រវត្តិរូប
│   ├── categories.html     # គ្រប់គ្រងប្រភេទ
│   ├── articles.html       # បញ្ជីអត្ថបទទាំងអស់
│   ├── article-detail.html # មើលអត្ថបទលម្អិត
│   ├── create-article.html # បង្កើត/កែសម្រួលអត្ថបទ
│   └── my-articles.html    # អត្ថបទរបស់ខ្ញុំ
├── css/
│   ├── style.css           # Global Styles
│   ├── auth.css            # Authentication Pages Styles
│   ├── dashboard.css       # Dashboard Styles
│   └── components.css      # Reusable Components
├── js/
│   ├── config.js           # API Configuration
│   ├── api.js              # API Service Functions
│   ├── auth.js             # Authentication Logic
│   ├── profile.js          # Profile Management
│   ├── categories.js       # Categories Management
│   ├── articles.js         # Articles Management
│   └── utils.js            # Helper Functions
├── assets/
│   ├── images/             # រូបភាព និង Icons
│   └── logo/               # Logo Files
├── postman/
│   └── ANT-Mini-Blog-adm.json  # Postman Collection
├── .gitignore
└── README.md
```

## 🚀 របៀបដំឡើង និងប្រើប្រាស់

### តម្រូវការ
- Web Browser (Chrome, Firefox, Safari, Edge)
- Live Server Extension (សម្រាប់ការអភិវឌ្ឍន៍)

### ជំហានដំឡើង

1. **Clone Repository**
```bash
git clone https://github.com/sokvichhai937/Mini-projectANT.git
cd Mini-projectANT
```

2. **បើកជាមួយ Live Server**
   - បើក `index.html` ជាមួយ Live Server
   - ឬបើកដោយផ្ទាល់ក្នុង browser: `file:///path/to/Mini-projectANT/index.html`

3. **ចុះឈ្មោះ & ចូលប្រើប្រាស់**
   - ចូលទៅកាន់ទំព័រចុះឈ្មោះ
   - បង្កើតគណនីថ្មី
   - ចូលប្រើប្រាស់ដោយប្រើគណនីដែលបានបង្កើត

## 📡 API Documentation

### Base URL
```
https://blogs2.csm.linkpc.net/api/v1
```

### Authentication Method
ប្រើ Bearer Token ក្នុង Authorization Header:
```
Authorization: Bearer {your_token}
```

### Postman Collection
File Postman Collection មានស្រាប់នៅក្នុង folder `postman/`:
- `ANT-Mini-Blog-adm.json`

Import file នេះទៅក្នុង Postman ដើម្បីសាកល្បង API endpoints ទាំងអស់។

## 🔒 សុវត្ថិភាព (Security)

- Token រក្សាទុកក្នុង LocalStorage
- Authorization Header សម្រាប់គ្រប់ request ដែលត្រូវការ authentication
- Validation នៅ Client-side
- XSS Prevention (HTML Sanitization)
- Password strength validation

## 📱 Responsive Design

ប្រព័ន្ធនេះដំណើរការល្អនៅលើគ្រប់ឧបករណ៍:
- 📱 Mobile: 320px - 767px
- 📱 Tablet: 768px - 1023px
- 💻 Desktop: 1024px and above

## 🎨 UI/UX Features

- Modern និង Clean Design
- Bootstrap-inspired styling
- Smooth transitions និង animations
- Toast notifications សម្រាប់ feedback
- Loading states
- Empty states
- Confirmation modals
- Form validation feedback
- Responsive navigation

## 📸 Screenshots

*(Screenshots នឹងត្រូវបានបន្ថែមនៅទីនេះ)*

### Landing Page
- Homepage ជាមួយនឹង Hero Section និង Features

### Authentication
- Login Page
- Register Page

### Dashboard
- Main Dashboard ជាមួយ Stats និង Quick Actions

### Articles Management
- Articles List
- Article Detail
- Create/Edit Article
- My Articles

### Categories Management
- Categories List with CRUD Operations

### Profile Management
- Profile View & Edit
- Avatar Upload

## 👨‍💻 អ្នកអភិវឌ្ឍន៍

- **ឈ្មោះគម្រោង**: Blog Management System
- **អ្នកបង្កើត**: ANT Team
- **GitHub**: [sokvichhai937](https://github.com/sokvichhai937)

## 📝 License

MIT License - សូមមើលឯកសារ LICENSE សម្រាប់ព័ត៌មានលម្អិត

## 🤝 ការរួមចំណែក

យើងស្វាគមន៍ការរួមចំណែកពីសហគមន៍! សូម:
1. Fork repository នេះ
2. បង្កើត feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit ការផ្លាស់ប្តូររបស់អ្នក (`git commit -m 'Add some AmazingFeature'`)
4. Push ទៅ branch (`git push origin feature/AmazingFeature`)
5. បើក Pull Request

## 📞 ទំនាក់ទំនង

សម្រាប់សំណួរ ឬការគាំទ្រ សូមទាក់ទង:
- GitHub Issues: [Create an issue](https://github.com/sokvichhai937/Mini-projectANT/issues)

---

**បានបង្កើតឡើងដោយ ❤️ ជាមួយ HTML, CSS & JavaScript**