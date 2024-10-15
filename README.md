# Running with Docker (Remote)

Steps:

1.  Ensure Docker is installed.
2.  Ensure ROOT_URL = `http://backend:3000` in client/src/helpers/hooks/api/api.ts
3.  Run Docker Compose:

        docker-compose up

4.  Access Playerest (v0.0.1):

        Frontend: http://localhost

        Backend: http://localhost:3000

# Running with Docker (Local)

1. Run Docker Compose:
   
        docker-compose -f docker-compose-build-images.yml up --build
   
2.  Access Playerest:

        Frontend: http://localhost

        Backend: http://localhost:3000
