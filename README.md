# Prerequisites

# Frontend
    Node.js v22.5.1
    npm (Node Package Manager)
    Docker

# Backend
    Python 3.12
    pip (Python package installer)
    PostgreSQL 15
    Docker
    Docker Compose

# Frontend Setup
cd frontend

docker build -t icustomer-ui .
docker run -p 3000:3000 icustomer-ui


# Backend Setup
1) cd icustomer_apis
2) Create a .env file in the project root (if not exists) and add the following:
DATABASE_NAME=your_database_name
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
3) docker-compose up --build