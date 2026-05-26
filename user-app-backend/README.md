# User Management Backend API

A Node.js + Express + MySQL backend API that serves mock user data similar to DummyJSON users.

---

# Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- dotenv
- nodemon
- body-parser

--- 

# Prerequisites

- Node.js >= 24.16.0
- npm =  11.13.0
- MySQL =  9.7.0

---

# Features

- REST API
- MySQL Database Integration
- Sequelize ORM
- Connection Pooling
- Pagination API
- Search API
- Error Handling Middleware

---

# Folder Structure

```bash
USER-APP/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── user.controller.js
│
├── middleware/
│   ├── errorMiddleware.js
│   └── index.js
│
├── models/
│   └── userModel.js
│
├── routes/
│   └── index.js
│
├── utils/
│   └── helper.js
│
├── .env
├── app.js
├── package.json
└── README.md

```bash
unzip file 

cd project-name

npm install
```

## Run Application

```bash
npm run dev
```

## API Used

https://dummyjson.com/users