## Table of contents

- [Overview](#overview)
  - [Setup](#setup)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

This is a modern movie discovery web application that allows users to search through thousands of movies, view trending titles, and explore detailed information about each film. The app integrates with The Movie Database (TMDb) API to provide real-time movie data and uses Appwrite as a backend service to track search analytics.

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with the following:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   ```

4. **Set up Appwrite**
   - Create an Appwrite project at [cloud.appwrite.io](https://cloud.appwrite.io)
   - Create a database and collection with the following attributes:
     - `searchTerm` (String)
     - `count` (Integer)
     - `movie_id` (Integer)
     - `poster_url` (String)

5. **Run the development server**
   ```bash
   npm run dev
   ```

### Screenshot

![Movie Discovery App](./public/Screenshot%202025-11-07%20at%2016-07-07%20my-movie-screening.png)

### Links

- Live Site URL: [Movie App](https://movie-discovery-app-ku9r.vercel.app/)

## My Process

### Built with

- **React 18** - Modern React with Hooks
- **React Router** - Client-side routing for navigation
- **Vite** - Next-generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework with custom theme
- **Appwrite** - Backend-as-a-Service for data persistence
- **TMDb API** - The Movie Database API for movie data
- **Lucide React** - Beautiful icon library
- **react-use** - Custom hooks library (useDebounce)

**Key Features:**
- Debounced search functionality to optimize API calls
- Responsive design with mobile-first approach
- Dynamic routing for individual movie pages
- Search analytics tracking with Appwrite
- Real-time trending movies section
- Detailed movie information including cast, trailers, and financials

### What I Learned

**1. Debouncing User Input**
```javascript
const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);
```
Implementing debouncing was crucial to prevent excessive API calls while users type. This improved performance and reduced unnecessary network requests.

**2. Working with External APIs**
```javascript
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
```
I learned how to properly authenticate with bearer tokens and structure API requests for optimal data fetching.

**3. Backend Integration with Appwrite**
```javascript
export const updateSearchCount = async (searchTerm, movie) => {
  const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal('searchTerm', searchTerm),
  ]);
  // Update or create document logic
};
```
This project taught me how to implement backend functionality without building a custom server, using Appwrite's SDK for database operations.

**4. Dynamic Routing with React Router**
```javascript
const handleMovieClick = (id) => {
  navigate(`/movie/${id}`);
};
```
I implemented clean URL structures and learned to pass route parameters for dynamic content loading.

**5. CSS Custom Properties with Tailwind**
```css
@theme {
  --color-primary: #030014;
  --background-image-hero-pattern: url("/hero-bg.png");
}
```
Extending Tailwind with custom theme values allowed me to maintain consistent branding throughout the application.

## Author

- LinkedIn - [Abiramisri](https://linkedin.com/in/abiramisri)

## Acknowledgments

- Thanks to [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the comprehensive movie API
- [Appwrite](https://appwrite.io/) for the excellent backend-as-a-service platform
- Design inspiration from modern streaming platforms
- The React and Vite communities for excellent documentation and resources
