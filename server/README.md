Backend Structure

```
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
│  ├─ lib
│  │  ├─ app.js
│  │  ├─ app.js.map
│  │  ├─ config
│  │  │  ├─ awsConfig.js
│  │  │  └─ awsConfig.js.map
│  │  ├─ controllers
│  │  │  ├─ commentController.js
│  │  │  ├─ commentController.js.map
│  │  │  ├─ draftController.js
│  │  │  ├─ draftController.js.map
│  │  │  ├─ reviewController.js
│  │  │  ├─ reviewController.js.map
│  │  │  ├─ userController.js
│  │  │  └─ userController.js.map
│  │  ├─ index.js
│  │  ├─ index.js.map
│  │  ├─ middlewares
│  │  │  ├─ authMiddleware.js
│  │  │  └─ authMiddleware.js.map
│  │  ├─ routes
│  │  │  ├─ commentRoutes.js
│  │  │  ├─ commentRoutes.js.map
│  │  │  ├─ draftRoutes.js
│  │  │  ├─ draftRoutes.js.map
│  │  │  ├─ reviewRoutes.js
│  │  │  ├─ reviewRoutes.js.map
│  │  │  ├─ userRoutes.js
│  │  │  └─ userRoutes.js.map
│  │  ├─ server.js
│  │  ├─ server.js.map
│  │  ├─ services
│  │  │  ├─ cognitoService.js
│  │  │  ├─ cognitoService.js.map
│  │  │  ├─ dynamoService.js
│  │  │  ├─ dynamoService.js.map
│  │  │  ├─ s3Service.js
│  │  │  └─ s3Service.js.map
│  │  └─ utils
│  │     ├─ logger.js
│  │     └─ logger.js.map
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

```
