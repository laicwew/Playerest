# Running with Docker (Pull Image from Hub)

Steps:

1.  Ensure Docker is installed.

2.  Run Docker Compose:

        docker-compose up --build

3.  Access Playerest (v1.1.0):

        Frontend: http://localhost

        Backend: http://localhost:3000

# Running with Docker (Local)

1.  Go to `/client` and Build

        cd client
        npm run build

2.  Go to `/server/functions` and Build

        cd /server/functions
        npm run build

3.  Run Docker Compose in **root directory**:

        docker-compose -f docker-compose-build-images.yml up --build

4.  Access Playerest:

        Frontend: http://localhost

        Backend: http://localhost:3000

## Backend old Repo (For checking commits in grading)

We migrated the back-end repo to the repo where the front-end is located (that is, the current repo) halfway through the project. Old commits can be seen at https://github.com/YileiCheng/Playerest-Backend

# Build and Deploy with Docker

(Avoid cached old-version by using **WSL** and **Chrome incognito window**.)

        docker system prune -a  // clean cache
        docker-compose -f docker-compose-build-images.yml up --build  // build images
        docker images // show all images

        // Deploy
        docker tag playerest-frontend:latest lawrencewonde/playerest-frontend:1.1.0
        docker push lawrencewonde/playerest-frontend:1.1.0
        docker tag playerest-frontend:latest lawrencewonde/playerest-frontend:1.1.0
        docker push lawrencewonde/playerest-frontend:1.1.0
