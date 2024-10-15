# Playerest

```
Welcome to Playerest!

Have fun here : [https://main.d1zjx5qj46wizn.amplifyapp.com/]
```

## How To Start

```
1. install packages and dependencies
npm install

```

```

2.start development server
npm run dev
```

## About Playerest

Playerest is an interactive game review platform that empowers users to share their opinions on their favorite games and discover new games through reviews and recommendations. Our goal with Playerest is to create a community-driven space where gamers can not only find game reviews but also engage in meaningful conversations about the latest games, connect with other gamers, and make informed decisions before purchasing or playing games.

## What we have done

Key achievements include:

- User Authentication: Implemented a robust user authentication system that allows users to sign up, log in, and manage their profiles securely. This includes integration with AuthContext to manage login states.

- Review Creation and Management: Built a dynamic review creation page where users can post reviews with ratings, images, and detailed game descriptions. Reviews are saved to the database and displayed in various views.

- Image Upload Functionality: Developed image uploading capabilities for users to attach images to their reviews, with real-time preview and feedback.

- Responsive Design: Designed the entire application with responsiveness in mind, ensuring it works well across devices, from desktops to mobile phones, using custom SCSS themes for light and dark modes.

- Search & Explore Feature: Created a robust search and filtering system for users to explore game reviews based on keywords, ratings, and other criteria.

- MVP Architecture: Implemented the project using the Model-View-Presenter (MVP) architecture to ensure clean separation of concerns, making the code more modular, maintainable, and scalable.

- Recommendations and Comments: Added recommendation and commenting functionality to engage users in game discussions, share insights, and discover similar content.

## Project Structure

```
client
├─ public
│  └─ vite.svg
├─ README.md                                     \\ Introduction to project
├─ src
│  ├─ assets                                     \\ Folder to save image assets
│  ├─ aws-exports.ts                             \\ AWS configuration file
│  ├─ helpers                                    \\ Helper functions and hooks
|  |  ├─ hooks                                   \\ Custom hooks folder
│  |  |  ├─ useIsMobile.tsx                    \\ Custom hook to detect mobile screen size
│  │  |  ├─ useIsSmallScreen.tsx              \\ Custom hook to detect small screen sizes
|  |  |  └─api                                   \\ API interaction folder
|  |  |    └─ api.ts                       \\ API helper functions for server communication
│  │  └─ screen.ts                               \\ Utility to detect screen size
│  ├─ index.tsx                                  \\ Main React app entry point
│  ├─ model                                      \\ Models representing data structures
│  │  ├─ review.ts                               \\ Review data model
│  │  └─ user.ts                                 \\ User data model
|  ├─ presenter                                  \\ Presenter folder for business logic
|  │  ├─ CreatePresenter.tsx                     \\ Presenter logic for creating a review
|  │  ├─ DetailPresenter.tsx                     \\ Presenter logic for review details
|  │  ├─ ProfilePresenter.tsx                    \\ Presenter logic for user profile
|  │  └─ SearchPresenter.tsx                   \\ Presenter logic for search functionality
│  ├─ views                                      \\ Main views and components for the app
│  │  ├─ App.tsx                                 \\ Main App component and router
│  │  ├─ components                              \\ Shared components used across the app
│  │  │  ├─ AppNavBar.tsx                        \\ Navigation bar component
│  │  │  ├─ BtnGroup.tsx                      \\ Reusable like & save button set component
│  │  │  ├─ FormField.tsx                        \\ Reusable form input field component
│  │  │  ├─ LoginModal.tsx                       \\ Login and signup modal component
│  │  │  └─ SearchBar.tsx                   \\ Search bar component for filtering content
│  │  ├─ create                                  \\ Create review page
│  │  │  ├─ components                           \\ Create page specific components
│  │  │  │  └─ SavedDraftSidebar.tsx      \\ Sidebar component for saving unfinished drafts
│  │  │  └─ index.tsx                            \\ View for creating a review
│  │  ├─ details                                 \\ Review details page
│  │  │  ├─ components                \\ Components for displaying review details
│  │  │  │  ├─ CommentForum.tsx        \\ Component for displaying and adding comments
│  │  │  │  ├─ RecommendReviews.tsx    \\ Component for recommending related reviews
│  │  │  │  └─ ReviewDetails.tsx       \\ Component for showing detailed review information
│  │  │  └─ index.tsx                            \\ View for displaying a specific review
│  │  ├─ profile                                 \\ User profile page
│  │  │  └─ index.tsx                            \\ View for user profile
│  │  └─ search                                  \\ Search and explore page
│  │     ├─ components                           \\ Search page specific components
│  │     │  ├─ ReviewCard.tsx           \\ Component for displaying review overview in Card
│  │     │  └─ SearchResults.tsx                 \\ Component for rendering search results
│  │     └─ index.tsx                            \\ View for exploring reviews via search
│  ├─ scss                                       \\ SCSS styles folder for the app
│  │  ├─ styles.scss                             \\ Main application SCSS stylesheet
│  │  ├─ themes.scss                        \\ Stylesheet for dark & light theme handling
│  │  ├─ _vars.scss            \\ SCSS variables for reusable values (colors, fonts, etc.)
│  │  ├─ styles.css                              \\ Generated CSS file based on styles.scss
│  │  ├─ styles.css.map                          \\ Source map for styles.css
│  │  ├─ themes.css                          \\ Generated CSS file for dark & light themes
│  │  └─ themes.css.map                          \\ Source map for themes.css
│  └─ vite-env.d.ts                        \\ TypeScript declaration for Vite environment
├─ Dockerfile                           \ Docker configuration for containerizing the app
├─ tsconfig.app.json                             \\ TypeScript configuration for the app
├─ tsconfig.json                                 \\ Root TypeScript configuration
├─ tsconfig.node.json                 \\ TypeScript configuration for node environment
├─ eslint.config.js                              \\ ESLint configuration for code linting
├─ index.html                                    \\ HTML template for the app
├─ nginx.conf
├─ package-lock.json
├─ package.json                                  \\ Project metadata and dependencies
└─ vite.config.ts                                \\ Vite configuration file

```
