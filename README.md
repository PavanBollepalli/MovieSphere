<div align="center">
  <img src="./public/hero.png" alt="MovieSphere Banner" width="100%" />
  
  # 🎬 MovieSphere
  
  **Discover, Search, and Explore Movies Like Never Before**
  
  A modern, feature-rich React application that brings the world of cinema to your fingertips with real-time data from TMDB API, AI-powered recommendations, and intelligent search tracking.
  
  [![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TMDB API](https://img.shields.io/badge/TMDB-API-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/)
  
  ![License](https://img.shields.io/github/license/PavanBollepalli/MovieSphere?style=for-the-badge)
  ![Stars](https://img.shields.io/github/stars/PavanBollepalli/MovieSphere?style=for-the-badge)
  ![Forks](https://img.shields.io/github/forks/PavanBollepalli/MovieSphere?style=for-the-badge)
  ![Issues](https://img.shields.io/github/issues/PavanBollepalli/MovieSphere?style=for-the-badge)
  
  [🚀 Live Demo](https://moviesphere-demo.vercel.app) • [📖 Documentation](https://github.com/PavanBollepalli/MovieSphere/wiki) • [🐛 Report Bug](https://github.com/PavanBollepalli/MovieSphere/issues)
  
</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [⚡ Quick Start](#-quick-start)
- [🔧 Installation](#-installation)
- [🚀 Usage](#-usage)
- [🎯 API Integration](#-api-integration)
- [📱 Screenshots](#-screenshots)
- [🏗️ Project Structure](#️-project-structure)
- [🤝 Contributing](#-contributing)
- [🐛 Troubleshooting](#-troubleshooting)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)
- [📞 Contact](#-contact)

---

## ✨ Features

🎯 **Core Features**
- 🔍 **Smart Search** - Search through thousands of movies with real-time suggestions
- 📈 **Trending Movies** - AI-powered trending section based on user search patterns
- 🎬 **Movie Details** - Comprehensive movie information with ratings, cast, and synopsis
- 📱 **Responsive Design** - Seamless experience across all devices
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS

🤖 **Advanced Features**
- 🧠 **AI Movie Recommendations** - Powered by OpenAI for personalized suggestions
- 📊 **Search Analytics** - Track popular searches with Appwrite database
- 🎭 **Interactive Chat** - AI-powered movie recommendation chatbot
- 🔄 **Dynamic Routing** - Smooth navigation with React Router
- 🎪 **Custom Animations** - Engaging loading states and transitions

🔧 **Technical Features**
- ⚡ **React 19** - Latest React features and performance improvements
- 🎨 **Tailwind CSS v4** - Modern utility-first styling
- 🌐 **TMDB API Integration** - Real-time movie data
- 🗄️ **Appwrite Backend** - Cloud database for search tracking
- 📦 **Modular Components** - Reusable and maintainable code structure

[🔝 Back to top](#-moviesphere)

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19.0.0
- **Styling:** Tailwind CSS 4.0.11
- **Routing:** React Router DOM 7.3.0
- **Build Tool:** Vite 6.2.0
- **HTTP Client:** Axios 1.8.2

### Backend & APIs
- **Movie Data:** TMDB API
- **AI Features:** OpenAI API / A4F API
- **Database:** Appwrite 17.0.1
- **AI Library:** Google Generative AI 0.24.0

### Development
- **Linting:** ESLint 9.21.0
- **Code Quality:** React Hooks ESLint Plugin
- **Package Manager:** npm
- **Version Control:** Git

[🔝 Back to top](#-moviesphere)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **Git** for version control

### API Keys Required

1. **TMDB API Key** - [Get from TMDB](https://www.themoviedb.org/settings/api)
2. **Appwrite Project** - [Create at Appwrite](https://appwrite.io/)
3. **OpenAI API Key** (Optional) - [Get from OpenAI](https://platform.openai.com/api-keys)

[🔝 Back to top](#-moviesphere)

---

## ⚡ Quick Start

Get MovieSphere running locally in 3 steps:

```bash
# 1. Clone the repository
git clone https://github.com/PavanBollepalli/MovieSphere.git

# 2. Install dependencies
cd MovieSphere && npm install

# 3. Start development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser! 🎉

[🔝 Back to top](#-moviesphere)

---

## 🔧 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/PavanBollepalli/MovieSphere.git
cd MovieSphere
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```env
# TMDB API Configuration
VITE_TMDB_API=your_tmdb_bearer_token_here

# Appwrite Configuration
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id

# AI Features (Optional)
VITE_A4F_API_KEY=your_ai_api_key
VITE_A4F_BASE_URL=https://api.a4f.co/v1
```

### Step 4: Start Development Server

```bash
npm run dev
```

### Step 5: Build for Production

```bash
npm run build
npm run preview
```

[🔝 Back to top](#-moviesphere)

---

## 🚀 Usage

### Basic Movie Search

```javascript
import { useState } from 'react';
import Search from './components/Search';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <Search 
      searchTerm={searchTerm} 
      setSearchTerm={setSearchTerm} 
    />
  );
}
```

### Fetch Movie Details

```javascript
const fetchMovieDetails = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      }
    }
  );
  return response.json();
};
```

### AI Movie Recommendations

```javascript
import { getAIResponse } from './utils/openaiAPI';

const getMovieRecommendation = async (userPreference) => {
  const prompt = `Recommend movies based on: ${userPreference}`;
  const recommendation = await getAIResponse(prompt);
  return recommendation;
};
```

[🔝 Back to top](#-moviesphere)

---

## 🎯 API Integration

### TMDB API Setup

1. Visit [TMDB](https://www.themoviedb.org/) and create an account
2. Navigate to Settings → API
3. Generate an API key and bearer token
4. Add to your `.env` file:

```env
VITE_TMDB_API=your_bearer_token_here
```

### Appwrite Database Setup

1. Create an [Appwrite](https://appwrite.io/) account
2. Create a new project
3. Set up a database with a collection for search tracking:

```javascript
// Collection structure
{
  searchTerm: "string",
  count: "number",
  movie_id: "string", 
  poster_url: "string"
}
```

### API Endpoints Used

| Endpoint | Purpose | Usage |
|----------|---------|-------|
| `/search/movie` | Search movies | User search functionality |
| `/discover/movie` | Popular movies | Default movie listing |
| `/movie/{id}` | Movie details | Detailed movie information |

[🔝 Back to top](#-moviesphere)

---

## 📱 Screenshots

<div align="center">

### 🏠 Home Page
<img src="./docs/screenshots/homepage.png" alt="Homepage" width="800px" />

### 🔍 Search Results
<img src="./docs/screenshots/search.png" alt="Search Results" width="800px" />

### 🎬 Movie Details
<img src="./docs/screenshots/movie-details.png" alt="Movie Details" width="800px" />

### 🤖 AI Chatbot
<img src="./docs/screenshots/ai-chat.png" alt="AI Chatbot" width="400px" />

</div>

[🔝 Back to top](#-moviesphere)

---

## 🏗️ Project Structure

```
MovieSphere/
├── 📁 public/                  # Static assets
│   ├── 🖼️ hero.png            # Hero banner image
│   ├── 🔍 search.svg          # Search icon
│   └── ⭐ star.svg            # Rating star icon
├── 📁 src/                     # Source code
│   ├── 📁 components/          # React components
│   │   ├── 🎬 MovieCard.jsx   # Movie card component
│   │   ├── 📝 MovieBio.jsx    # Movie details page
│   │   ├── 🔍 Search.jsx      # Search component
│   │   ├── 💬 ChatBot.jsx     # AI chatbot component
│   │   ├── ⚡ Spinner.jsx     # Loading component
│   │   └── ❌ PageNotFound.jsx # 404 page
│   ├── 📁 utils/               # Utility functions
│   │   ├── 🤖 openaiAPI.js    # AI integration
│   │   └── 🎣 useDebounce.js  # Custom hooks
│   ├── ⚙️ appwrite.js         # Database integration
│   ├── 🎨 index.css           # Global styles
│   ├── 🚀 main.jsx            # App entry point
│   └── 📱 App.jsx             # Main component
├── 🔧 vite.config.js          # Vite configuration
├── 🎨 tailwind.config.js      # Tailwind configuration
├── 📝 package.json            # Dependencies
└── 🌍 .env                    # Environment variables
```

### Key Components

- **App.jsx** - Main application logic and state management
- **MovieCard.jsx** - Displays individual movie cards with ratings
- **MovieBio.jsx** - Detailed movie information page
- **Search.jsx** - Search input with debounced API calls
- **ChatBot.jsx** - AI-powered movie recommendation chat

[🔝 Back to top](#-moviesphere)

---

## 🤝 Contributing

We love contributions! Here's how you can help make MovieSphere even better:

### Development Workflow

1. **Fork the repository**
   ```bash
   # Click the Fork button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/MovieSphere.git
   cd MovieSphere
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-new-feature
   ```

4. **Make your changes**
   ```bash
   # Make your awesome changes
   npm run lint  # Check code quality
   npm run build # Test build
   ```

5. **Commit your changes**
   ```bash
   git commit -m "✨ Add amazing new feature"
   ```

6. **Push to your branch**
   ```bash
   git push origin feature/amazing-new-feature
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Describe your changes

### Contribution Guidelines

- 📝 Write clear commit messages
- 🧪 Add tests for new features
- 📖 Update documentation as needed
- 🎨 Follow the existing code style
- 🐛 Check that all tests pass

### Areas for Contribution

- 🌟 New movie discovery features
- 🎨 UI/UX improvements
- 🚀 Performance optimizations
- 📱 Mobile experience enhancements
- 🌍 Internationalization
- 🧪 Test coverage improvements

[🔝 Back to top](#-moviesphere)

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue: Movies not loading
```bash
# Check API key in .env file
echo $VITE_TMDB_API

# Verify network connectivity
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.themoviedb.org/3/movie/popular
```

#### Issue: Build errors
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run build -- --force
```

#### Issue: Environment variables not working
```bash
# Ensure .env file is in root directory
# Environment variables must start with VITE_
# Restart development server after changes
```

#### Issue: AI chatbot not responding
```bash
# Verify AI API configuration
# Check A4F API key and base URL
# Review browser console for error messages
```

### Getting Help

- 📖 Check the [Wiki](https://github.com/PavanBollepalli/MovieSphere/wiki)
- 🐛 [Report Bugs](https://github.com/PavanBollepalli/MovieSphere/issues)
- 💬 [Discussions](https://github.com/PavanBollepalli/MovieSphere/discussions)
- ✉️ Contact: [your.email@example.com]

[🔝 Back to top](#-moviesphere)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Pavan Bollepalli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

[🔝 Back to top](#-moviesphere)

---

## 👏 Acknowledgments

Special thanks to these amazing resources and people:

### APIs & Services
- 🎬 **[TMDB](https://www.themoviedb.org/)** - For comprehensive movie data
- 🤖 **[OpenAI](https://openai.com/)** - For AI-powered recommendations  
- 🗄️ **[Appwrite](https://appwrite.io/)** - For backend database services
- 🔥 **[A4F](https://a4f.co/)** - For AI API integration

### Technologies
- ⚛️ **[React Team](https://react.dev/)** - For the amazing framework
- 🎨 **[Tailwind CSS](https://tailwindcss.com/)** - For beautiful styling
- ⚡ **[Vite](https://vitejs.dev/)** - For lightning-fast development

### Community
- 🌟 All contributors who helped improve this project
- 🐛 Users who reported bugs and suggested features
- 💡 The open-source community for inspiration

### Resources
- 🎯 Icons from [Heroicons](https://heroicons.com/)
- 🎨 Design inspiration from [Dribbble](https://dribbble.com/)
- 📸 Images from [Unsplash](https://unsplash.com/)

[🔝 Back to top](#-moviesphere)

---

## 📞 Contact

<div align="center">

**Pavan Bollepalli**

[![GitHub](https://img.shields.io/badge/GitHub-PavanBollepalli-181717?style=for-the-badge&logo=github)](https://github.com/PavanBollepalli)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/pavanbollepalli)
[![Twitter](https://img.shields.io/badge/Twitter-Follow-1DA1F2?style=for-the-badge&logo=twitter)](https://twitter.com/pavanbollepalli)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail)](mailto:your.email@example.com)

**💼 Portfolio:** [pavanbollepalli.dev](https://pavanbollepalli.dev)

---

⭐ **Found this project helpful? Give it a star!** ⭐

**🚀 [View Live Demo](https://moviesphere-demo.vercel.app) | 📖 [Documentation](https://github.com/PavanBollepalli/MovieSphere/wiki) | 🐛 [Report Issues](https://github.com/PavanBollepalli/MovieSphere/issues)**

---

*Built with ❤️ by developers, for movie lovers*

</div>

[🔝 Back to top](#-moviesphere)
