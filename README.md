# User Authentication and Authorization
## Steps to re-create the project on local system
> Please run the following steps

> Please create ".env" file at the root level of the project folder and add the following keys along with preferred values
```
PORT = 
MONGO_URI = 
JWT_SECRET =
``` 

```
npm install 
```
run this command on both levels, frontend and backend (folders).
```

npm run data:destroy
```
this will clear the database to start with the project afresh.

```
npm run data:import
```
this will fill the database with dummy data.

```
npm run dev
```
this will start the project concurrently, react and nodemon server.


> the postman collection of the rest APIs is attach within the repository

### Thank You