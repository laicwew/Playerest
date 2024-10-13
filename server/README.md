# Playerest-Server

This is the backend for Playerest, which is built using Node JS and TypeScript.

## Local Development

    cd functions

Add AWS credentials

    Create .env file in root, then add credentials

Install all project dependencies

    npm install

Run a local webserver to test functions

    npm run dev

Run script

    pnpm ts-node fileName.ts

## Deployed API

    https://api-ttvkb2gtia-uc.a.run.app
    replacing: http://localhost:3000

## Local API

Get all users:

    GET http://localhost:3000/api/users

Get all reviews:

    GET http://localhost:3000/api/reviews

Get a review using id:

    GET http://localhost:3000/api/reviews/detail/:id
    Example: http://localhost:3000/api/reviews/detail/7

Add a review:

    POST http://localhost:3000/api/reviews/add

    Example body:
    {
        "imageUrl": "https://cataas.com/cat?random=51",
        "author": "coolgamer",
        "title": "Fantastic Game!",
        "content": "This game offers an incredible experience. I loved the graphics and gameplay.",
        "rate": 5
    }

Get reviews by author:

    POST http://localhost:3000/api/reviews/by-author

    Example body:
    {"author": "topgamer", "reviewId": "5"}

Get reviews by pagination:

    GET http://localhost:3000/api/reviews/paginated?limit=10 (can change the limit, this is the first time it's fetch, a pagination id is returned)

    GET http://localhost:3000/api/reviews/paginated?limit=10&lastEvaluatedKey=%7B%22id%22%3A9%7D (use the pagination id returned from previous call, in this example it's 9)

Register:

    POST http://localhost:3000/api/users/register

    Example body:
    {
        "email": "test@example.com",
        "username": "testuser",
        "password": "password123"
    }

Register Confirm:

    POST http://localhost:3000/api/users/registerconfirm

    Example body:
    {
        "username": "testuser",
        "code": "123456"
    }

Register Confirmation Code Resend:

    POST http://localhost:3000/api/users/resendconfirm

    Example body:
    {
        "username": "testuser",
    }

Login:

    POST http://localhost:3000/api/users/login

    Example body:
    {
        "username": "testuser",
        "password": "password123"
    }

Get all comments:

    GET http://localhost:3000/api/comments

Get comments by reviewId:

    POST http://localhost:3000/api/comments/review

    Example body:
    {"reviewId": 5}

Add comment:

    POST http://localhost:3000/api/comments/add

    Example body:
    {
        "author": "testuser",
        "content": "This is a comment.",
        "reviewId": 123
    }

Get a list of relevant reviews by query - SEARCH:

    POST http://localhost:3000/api/reviews/search

    Example body:
    {"query": "game"}

Add draft:

    POST http://localhost:3000/api/drafts/store

    Example body:
    {
        "imageUrl": "https://example.com/image.jpg",
        "author": "testuser",
        "title": "Great Game!",
        "content": "This is a draft review."
    }

Get drafts by username:

    GET http://localhost:3000/api/drafts/user/nightwarrior

Publish draft using draft id:

    POST http://localhost:3000/api/drafts/publish

    Example body:
    {"draftId": 1}

Upload image to AWS s3 bucket:

    POST http://localhost:3000/api/reviews/upload

    Example usage:
    // Create form data object
    const formData = new FormData();
    formData.append('image', selectedFile);
    const response = await axios.post('http://localhost:3000/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    });

    Example response:
    {
        "message": "Image uploaded successfully!",
        "imageUrl": "https://plaverest-user-images.s3.eu-north-1.amazonaws.com/images/1234567890.png"
    }
