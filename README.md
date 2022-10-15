# Full Stack - Personal List App - Frontend

## Objective

- This is the frontend side of my personal list app project.
- I used django rest framework for backend.
  ##### You can see my backend project from [here](https://github.com/esadakman/django-personal-app-backend) 👈

## Description

- The welcome page will be the login page and the user will not be able to access other pages without login
- Company personnel who have logged into the system will be able to see the company's departments on the home page and the personnel working under that section in detail.
- There will be update delete and add personal buttons for the personnel who are staff. And these personnel will be able to add new personnel to the list, update and delete them.
- For the register page, we used the formik-yup library in accordance with our backend.
- When the user logs in, we will send the token information, username and is_staff values to sessionStorage.
- I used the window.btoa() and window.atob() methods while assigning and withdrawing the token to the storage.
- I used the Material-Ui library for styling.
- You can perform staff operations using the following account information:
  - userName: michaelscott
  - password: Littlekidlover1

## Project Link

#### You can reach my project from [here](https://fullstack-personal-app.netlify.app/) 👈

## Project Skeleton

```
personal-app-frontend  (folder)
|----readme.md
SOLUTION
├── public
│     └── index.html
├── src
│    ├── app-router
│    │      │─── AppRouter.jsx
│    │      └─── PrivateRouter.jsx
│    ├── components
│    │      │─── DepartmentTable.js
│    │      └─── Navbar.js
│    ├── contexts
│    │      └── AuthContext.js
│    ├── helper
│    │      └── ToastNotify.js
│    ├── pages
│    │      │── DepartmentDetail.js
│    │      │── Home.js
│    │      │── Login.js
│    │      │── PersonalCreate.js
│    │      │── PersonalUpdate.js
│    │      └── Register.jsx
│    ├── App.js
│    ├── App.css
│    └── index.js
├── package.json
└── yarn.lock
```

### At the end of the project, following topics are to be covered;

- HTML
- CSS
- JavaScript
- ReactJS
- Axios
- Context API
- Formik-Yup
- Material-UI
- React-Router-DOM
- React-Toastify

To run this project;

```
$ git clone https://github.com/esadakman/reactjs-personal-app-frontend.git
$ cd ./reactjs-personal-app-frontend
$ npm install / yarn
$ npm start / yarn start
```

### Preview of the Project

![personal-front-app](https://user-images.githubusercontent.com/98649983/196004677-81a32ccf-b45c-497a-87fd-1d9a864fcf0c.gif)
