
# MovieBox

MovieBox is a modern web application built with Next.js 15 and Tailwind CSS 4, leveraging the TMDB API to display movies, series, and popular persons. The app features a homepage with a carousel of "Now Playing" movies, a combined list of popular movies and series, a hamburger menu for navigation, detailed pages for movies/series/persons, and additional enhancements like animations and responsive design.

## Project Setup Instructions

### Prerequisites
- **Node.js**: Version 18.x or higher (recommended).
- **npm**: Comes with Node.js, or use Yarn/pnpm if preferred.
- **TMDB API Key**: Sign up at [The Movie Database (TMDB)](https://www.themoviedb.org/) to get an API key.

### Installation
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd moviebox
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   This installs Next.js, Tailwind CSS, Swiper, and other libraries listed below.

3. **Set Up Environment Variables**:
   - Create a `.env.local` file in the root directory.
   - Add your TMDB API key:
     ```
     NEXT_PUBLIC_TMDB_API_KEY=your-api-key-here
     ```
   - Replace `your-api-key-here` with the key from TMDB.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

5. **Build and Run Production** (optional):
   ```bash
   npm run build
   npm run start
   ```


## Libraries Used
- **Next.js 15**: Framework for server-side rendering, dynamic routing, and building the app.
- **Tailwind CSS 4**: Utility-first CSS framework for responsive and modern styling.
- **Swiper**: Slider library for the "Now Playing" movies carousel, with modules for fade effects, autoplay, pagination, and keyboard navigation.
- **Motion (`motion/react`)**: Animation library for hover effects, transitions, and interactive elements (e.g., buttons, section reveals).
- **React Hot Toast**: Notification library for displaying error messages in the navbar.
- **React**: Core library (included with Next.js) for building components.
- **Next/Image**: Optimized image component for loading TMDB posters and backdrops efficiently.

## Additional Features Implemented

### 1. Expanded Content Support
- **Detail Pages for All Types**: Detail pages support movies, series, and persons with tailored layouts:
  - Movies/Series: Show title, genres, release date, overview, rating, runtime, trailer (if available), and backdrop image.
  - Persons: Display biography, birthday, place of birth, and a list of credits.

### 2. Enhanced Carousel
- **Responsive Carousel**: The "Now Playing" carousel adapts to screen size:
  - Desktop: Vertical sliding (can be changed to horizontal), uses `backdrop_path`, shows title, overview, and a "See More" button with a gradient overlay.
  - Mobile: Horizontal sliding, uses `poster_path`, displays the title and a "next" button with top/bottom gradients.
- **Swiper Features**: Includes autoplay with a progress circle, fade effects, clickable pagination dots, and keyboard navigation.
- **High-Quality Images**: Uses `w1920` resolution with `priority` for fast loading.

### 3. Animations
- **Motion**: Used for:
  - Hover effects (e.g., scaling images in `CardImage`, buttons in `Carousel` and `PopularSection`).
  - Transitions (e.g., fading in sections, sliding navbar dropdown).
  - Interactive elements (e.g., "See More" button with a rotating arrow).
- **Smooth User Experience**: Animations enhance the app’s polish without being overwhelming.

### 4. Responsive Design
- **Tailwind CSS**: Responsive layouts using classes like `sm:grid-cols-3`, `md:grid-cols-5` for grids, and `useIsMobile` hook to adjust item counts and layouts.
- **Adaptive UI**:
  - Hamburger menu toggles a dropdown on mobile, with a hover preview of movie posters on desktop.
  - Carousel switches between `poster_path` (mobile) and `backdrop_path` (desktop) with different layouts.
  - Detail pages use a flex layout (side-by-side on desktop, stacked on mobile).

### 5. Error Handling
- **Centralized Error Display**: Errors from API calls (e.g., "Sorry, there’s an issue: Network error...") are displayed centered on the page using `min-h-screen flex items-center justify-center`.
- **Toasts in Navbar**: Errors are also shown as toast notifications for immediate feedback.
- **User-Friendly Messages**: Custom error messages guide users (e.g., "Please check your connection or VPN").

### 6. Performance Optimizations
- **Concurrent Data Fetching**: Uses `Promise.all` to fetch multiple API endpoints simultaneously, reducing load times.
- **Server-Side Rendering**: Leverages Next.js for faster initial page loads.
- **Image Optimization**: Uses `Next/Image` with `priority` and `quality` settings for efficient image loading.

