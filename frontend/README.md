This is test iCustomer Test Project. 

# Features
    List and Kanban views for products
    Search and filter products by category
    View detailed product information

## Prerequisites
- Node.js v22.5.1
- npm (Node Package Manager)
- Docker

```bash
git clone repo_url
cd frontend


npm install
npm start
# The application will be available at http://localhost:3000

# OR  Run with Dockerfile
docker build -t icustomer-ui .
docker run -p 3000:3000 icustomer-ui
# The application will be available at http://localhost:3000