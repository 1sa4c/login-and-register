# Login and Register

  A MERN stack (MongoDB, Express, ReactJS, NodeJS) application to demonstrate a complete login and registration system

## Overview
When a registration request is done, the user's name, email and the hashed password are stored in the DB.

When the user tries to log in, the inputed email and password are going to be compared with the email and hash stored in the DB

The data for login and register are verified on the backend with JOI

Once the user has logged in, a JWT token is created and sent to the client and stored in local storage. Passport JWT takes over at this point and handles all further user authentication for protected routes.

If a user forgets his/her password, a unique link will be sent to his/her email with a token. This link leads to a page that will verify the autenticity of the token as well as if it has expired.
Then, the user will be able to enter a new password and it (hashed) will be updated in the DB.

On the protected routes (Dashboard page), every request from the client to the server must include the JWT as one of its authorization headers. If the JWT is missing, corrupted or expired, the authentication will fail and the route cannot be accessed.

## Tools
### ODM
  - Mongoose

### Authentication
  - JSONWebTokens
  - Passport
  - Passport JWT

### Validation
  - JOI
  
### Cryptography
  - BcryptJS
  - Crypto
  
### Email
  - Nodemailer
  
### HTTP Requests
  - Axios
