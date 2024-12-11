# Dual-Container Blog Application

This project showcases the development of a cloud-deployed blog application with a **Ruby on Rails API backend** and a **Next.js frontend**. The application is containerized using **Docker** and deployed to **Microsoft Azure Container Apps**, demonstrating the integration of two powerful frameworks in a modern cloud-based architecture.

## Features

* **Ruby on Rails Backend**: Acts as an API, handling data management with SQLite.
* **Next.js Frontend**: Provides a dynamic user interface, using Axios to fetch data from the backend API.
* **Dockerized Environment**: Both applications are containerized for seamless deployment.
* **Cloud Scalability**: Leveraged Azure Container Apps for auto-scaling based on traffic.

## Prerequisites

* **Docker** installed on your system.
* Basic knowledge of Linux commands and Docker CLI.
* **Node.js** and **npm** for Next.js frontend setup.

## Setup

### Backend (Ruby on Rails)

1. **Pull Docker Image**:
```bash
docker pull ruby
```

2. **Run Ruby Container**:
```bash
docker run --rm -it -v /path/to/your/rails_app:/app ruby bash
```

3. **Set Up Rails Application**: Inside the container:
```bash
apt update  
apt install sqlite3  
gem install rails bundler  
rails new store  
cd store  
rails g scaffold Store name:string  
rake db:migrate  
```

4. **Start the Rails Server**:
```bash
rails s -b 0.0.0.0
```

5. **Access SQLite for Data**:
```bash
sqlite3 db/development.sqlite3  
```

### Frontend (Next.js)

1. **Navigate to the Frontend Directory**:
```bash
cd frontend
```

2. **Install Dependencies**:
```bash
npm install
```

3. **Start the Development Server**:
```bash
npm run dev
```

## Deployment

### Containerize Applications

1. **Dockerize the Backend**:
```bash
docker build -t rails_app .  
```

2. **Dockerize the Frontend**:
```bash
docker build -t nextjs_frontend .  
```

3. **Run the Containers**:
```bash
docker run -it -v /path/to/rails_app:/root -p 3000:3000 rails_app  
docker run -it -v /path/to/frontend:/root -p 3001:3001 nextjs_frontend  
```

4. **Push to Azure Container Apps**: Follow Microsoft Azure documentation to deploy containerized apps.

## Testing

1. **Simulate Traffic**: Use **Apache JMeter** or similar tools to simulate requests to the backend and frontend.
2. **Volume Testing**: Ensure that Azure Container Apps scales containers based on the defined request threshold.

## Key Commands Reference

### Docker Commands

* **View Running Containers**:
```bash
docker ps
```

* **Stop All Containers**:
```bash
docker stop $(docker ps -a -q)
```

* **Remove All Containers**:
```bash
docker rm $(docker ps -a -q)
```

* **Commit a Snapshot**:
```bash
docker commit <container_id> shop_app:1.0.0
```

### Rails Commands

* **Generate Scaffolds**:
```bash
rails g scaffold <Model> <field:type>
```

* **Roll Back Database Migration**:
```bash
rake db:rollback STEP=1
```

## Notes

* Ruby on Rails runs within a Linux Docker environment for compatibility and reproducibility.
* The backend API and frontend are linked via container ports:
   * Rails: `3000`
   * Next.js: `3001`
* Both applications can be deployed independently for scalability.



# Bloga (Blog website created with ruby and nextJS)
This might not be the most unique website ever created, I mean it's a blog website.
However, the uniqueness does not lie within the creation rather how it was created:
I used two wonderful frameworks that are not often combined: nextJS and Ruby/Rails.
I used Ruby/Rails strictly as an api which is not a thing a lot of people do and nextJS for frontend work. I didn't have to combine these two, they are both ridicoulsly good full-stack frameworks on their own but i felt like experimenting and having fun.
I added a third layer of complexity by dockerizing the two applications just because I felt like and to prepare them for implementation with cloud platforms like AWS and microsoft azure in the future. I also prefer using Ruby/Rails on a linux OS so I guess that was another reason why I dockerized my application.

