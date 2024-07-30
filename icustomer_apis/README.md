## Prerequisites
    Python 3.12
    pip (Python package installer) (24.0)
    PostgreSQL 15

# Follow these steps to set up and run the Django project:

# 1. Clone the Repository
```bash
git clone repo_url
cd icustomer_apis

# 2. Install Dependencies
pip install -r requirements.txt

# 3. Set Up Environment Variables
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=localhost
DATABASE_PORT=5432

# 4. Apply Migrations
python manage.py migrate

# 5. Create a Superuser (Optional)
python manage.py createsuperuser

# 6. Run Application
python manage.py runserver

# The application will be available at http://localhost:8000/admin (Login with your super user credentials created with python manage.py createsuperuser)


# Docker Setup Instructions
#Prerequisites
    Docker
    Docker Compose

2) Open docker-compose file
Replace ${DATABASE_NAME}, ${DATABASE_USER}, and ${DATABASE_PASSWORD} with your PostgreSQL database credentials.

3)Environment Variables (Optional)

You can set environment variables in a .env file in the project root (create if not exists):
DATABASE_NAME=DATABASE_NAME
DATABASE_USER=DATABASE_USER
DATABASE_PASSWORD=xZwRWPcr

4. Build and Start Docker Containers
docker-compose up --build