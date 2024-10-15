# Running with Docker (Pull Image from Hub)

Steps:

1.  Ensure Docker is installed.

2.  Run Docker Compose:

        docker-compose up

3.  Access Playerest (v0.0.1):

        Frontend: http://localhost

        Backend: http://localhost:3000

# Running with Docker (Local)

1. Run Docker Compose:
   
        docker-compose -f docker-compose-build-images.yml up --build
   
2.  Access Playerest:

        Frontend: http://localhost

        Backend: http://localhost:3000
