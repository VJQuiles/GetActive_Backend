# GetActive_Backend
Welcome to the backend fo my full stack app, GetActive. In this repo you will find the backend and middle tier set up. 

## Description
This backend is built to allow users to:
- Allow users to create and login to accounts
- Allow users to create custom workouts
- Users can create or assign exercises to workout plans
- Use core exercises to build their workouts from, with an instrcutions section

## Getting Started
### Dependencies
    "bcrypt": "^6.0.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.1",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.18.0", 

    "devDependencies": {
    "nodemon": "^3.1.10"
  }

### Installing
You can run npm i in order to install all necessary packages. 

### Executing program
Nodemon is set in the package.json file to allow you to run the program with npm run dev.

It is also important to set up a .env file and place it in your gitignore with these the variables:

MONGO_URI=<mongo db connection string>
JWT_SECRET=<your jwt secret> (you can generate one here: https://jwtsecrets.com/)
PORT=<3000 || 8080> or any other port you would like. This is not necesary.

The use of a route testing application like postman is also recommended. 

Be sure to save tokens that are generated in order to use them for the workout and exercise routes. 

## Authors
Vincent J. Quiles

## Reflection
The momentum of the backend continued in this portion of the fullstack project. And because of the building we did from our projects in the middle tier and backend, I was able to leverage a lot of that code, tweaking it for the needs of this particular project. 

I followed a similar set up to my backend development project, making slight alterations to fit the objectives of a fitness app, and wanting to impart some personal knowledge I believe to be useful. I created a core exercises route, that served as the opportunity to share some of that knowledge. It also ended up helping a lot on the front end with being able to make an api call for data without having to worry about protected routes. 

The core exercises also served as the primary source of change between this project and previous ones. I was force to consider how i would want to protect those exercises, as well as how to build them. That's why i ended up using enums, so that way i could build the list as i add information(such new types of workouts like explosive workouts or calisthenics), I could apply those changes easily to both the backend and the front end. 

I also decided to make core exercises it's own model so as to not have it be accessible by users. I will add to it by seeding to the db on the backend like i did in this setup. 

Overall, I found this to be good practice in having a vision not only for what you want your db to be now, but as it grows. 

## Acknowledgments

As stated in the reflection, I used much of my previous repository: Backend_Development

I also found revisiting some of the code alongs done by one of our instructors to be useful.

## Planning

I did all my planning in a notebook i dont have with me, gonna update this when i get home and have it. 