
## Divdev

Divdev is a blog-style portfolio building website, designed to address the common issue of fragmented portfolio websites by
seamlessly integrating blog, profile, and side projects uploads into a cohesive and user-friendly experience


## Tech Stack

**Frontend:** React, Material UI

**Backend:** Node, Express

**Database:** MongoDB

**Cloud & API:** AWS, skills API 

**Testing:** Jest

## Pre-requisite

To run this project, you will need to add the following environment variables to your .env file


`EMAIL_USERNAME=""`

`PASSWORD=""`

`dbUsername=""`

`dbPassword=""`

`clusterName=""`

`dbName=""`

`skillsAPI=""`

`AWS_ACCESS_KEY=""`

`AWS_SECRET_ACCESS_KEY=""`

`AWS_BUCKET_NAME=""`

## Run Locally


Install dependencies

```bash
  cd backend && yarn
  cd frontend && yarn
```

Start the server and run the program
```bash
  cd backend 
  node server.js
```

Start the frontend 

```bash
  cd client 
  yarn start
```




