# Birdie Developer Test

## Comments about my project
The user of the web application can choose the id of the care recipient he wants to consult. This is not how it should be implemented in a final product in which there should be an authentication. But here we can't store additional data.

In the table tab, the user can see all the different visits that have been done, and when he clicks on the visit item, it navigates to a visit page where all events during this visit and their details are displayed.

Both in the backend and the frontend, I set up additional components and routes for possible improvements of this solution.


## Usage

1. Start the API. (Run the following commands within the `backend` folder)

   a. Install the dependencies
   ```
   npm install
   ```
   
   b. Run the HTTP server (will start on port `8000`) in dev mode
   ```
   npm run dev
   ```

   b. Run the HTTP server (will start on port `8000`) in prod mode
   ```
   npm start
   ``` 
2. Start the React app  (Run the following commands within the `front-end` folder)

    a. Install the dependencies
   ```
   npm install
   ```
   
   b. Run the application (will start on port `3000`)
   ```
   npm start
   ```

Running `npm start` first in the backend then in the frontend starts the application.

## Test
I implemented 3 different tests with jest and supertest to test the responses of the API and the object sent back.
In the backend you need to run `npm test`.
We can of course add some test for additional routes.