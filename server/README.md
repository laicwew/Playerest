Backend Structure
server
├─ .firebaserc
├─ .gitignore
├─ firebase.json
├─ functions
│  ├─ .eslintrc.js
│  ├─ .gitignore
│  ├─ Dockerfile
│  ├─ dummyComments.csv
│  ├─ dummyReviews.csv
│  ├─ dummyUsers.csv
│  ├─ importComments.ts
│  ├─ importReviews.ts
│  ├─ importUsers.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ README.md
│  ├─ src
│  │  ├─ app.ts
│  │  ├─ config
│  │  │  └─ awsConfig.ts
│  │  ├─ controllers
│  │  │  ├─ commentController.ts
│  │  │  ├─ draftController.ts
│  │  │  ├─ reviewController.ts
│  │  │  └─ userController.ts
│  │  ├─ index.ts
│  │  ├─ middlewares
│  │  │  └─ authMiddleware.ts
│  │  ├─ routes
│  │  │  ├─ commentRoutes.ts
│  │  │  ├─ draftRoutes.ts
│  │  │  ├─ reviewRoutes.ts
│  │  │  └─ userRoutes.ts
│  │  ├─ server.ts
│  │  ├─ services
│  │  │  ├─ cognitoService.ts
│  │  │  ├─ dynamoService.ts
│  │  │  └─ s3Service.ts
│  │  └─ utils
│  │     └─ logger.ts
│  ├─ tsconfig.dev.json
│  └─ tsconfig.json
├─ package-lock.json
└─ tsconfig.json
