# Playerest

```
Welcome to Playerest!

Have fun here :
```

## How To Start

```
1. install packages and dependencies
npm install

2.start development server
npm run dev
```

## About Playerest

## What we have done

## Project Structure

```
client
├─ public
│  └─ vite.svg
├─ README.md                 \\ Introduction to project
├─ src
│  ├─ assets                  \\ Folder to save image assets
│  ├─ aws-exports.ts
│  ├─ helpers
|  |  ├─ hooks
│  |  |  ├─ useIsMobile.tsx
│  │  |  ├─ useIsSmallScreen.tsx
|  |  |  └─api
|  |  |    └─api.ts
│  │  └─ screen.ts
│  ├─ index.tsx
│  ├─ model
│  │  ├─ review.ts
│  │  └─ user.ts
│  ├─ views
│  │  ├─ App.tsx
│  │  ├─ components              \\ Component in general use
│  │  │  ├─ AppNavBar.tsx               \\ Component: navigation bar
│  │  │  ├─ BtnGroup.tsx                \\ Component: reusable like & save button set
│  │  │  ├─ FormField.tsx               \\ Component: reusable form input field
│  │  │  ├─ LoginModal.tsx              \\ Component: login&signup modal
│  │  │  ├─ SearchBar.tsx               \\ Component: search bar
│  │  ├─ create
│  │  │  ├─ components
│  │  │  │  └─ SavedDraftSidebar.tsx    \\ Component: save unfinished review creation
│  │  │  └─ index.tsx                   \\ View for review creation page
│  │  ├─ details
│  │  │  ├─ components
│  │  │  │  ├─ CommentForum.tsx          \\ Component: View comments on the specific review
│  │  │  │  ├─ RecommendReviews.tsx      \\ Component: View other recommended reviews
│  │  │  │  └─ ReviewDetails.tsx         \\ Component: View review details
│  │  │  └─ index.tsx                    \\ View for review detail page
│  │  ├─ profile
│  │  │  └─ index.tsx                    \\ View for user profile page
│  │  └─ search
│  │     ├─ components
│  │     │  ├─ ReviewCard.tsx            \\ Component: reusable Card for overview review
│  │     │  └─ SearchResults.tsx         \\ Component: review results for searching
│  │     └─ index.tsx                    \\ View for search(explore) page
│  ├─ scss                           \\ UI style folder
│  │  ├─ styles.scss               \\ main application css style sheet
│  │  ├─ themes.scss                 \\ For dark & light theme handling
│  │  ├─_vars.scss                  \\ reusable variable values
│  │  ├─ styles.css                \\ generated style css file by scss based on style.scss
│  │  ├─ styles.css.map
│  │  ├─ themes.css                \\ generated theme css file by scss based on themes.scss
│  │  └─themes.css.map
│  └─ vite-env.d.ts
├─ Dockerfile
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ eslint.config.js
├─ index.html
├─ nginx.conf
├─ package-lock.json
├─ package.json
└─ vite.config.ts


```
