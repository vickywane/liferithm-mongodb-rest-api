# Liferithms

## Front end developer test challenge

### Node - express api for Activity tracker app

<p> This server is built using `Express.js`. The goal of this api is to be able to persist data from the React Native App</p>
<p> Using `Yarn` , run ` Yarn Start ` to start server on default port **5050**.  </p>
<p> **Note: ** This project uses environment variables. Create a `.env` file at the file root and add a Mongodb connection uri variable. E.g for connecting to a local mongodb instance ` mongodb://localhost:27017/{DB_NAME} `  </p>

| Endpoints        | Description                                                                 | Verb | Parameters                                        |
| ---------------- | --------------------------------------------------------------------------- | ---- | ------------------------------------------------- |
| /activities      | Returns all saved activities with no authentication required                | GET  | nil                                               |
| /create-activity | inserts a new activity using the supplied parameters                        | POST | title , time , description , date                 |
| /update-activity | updates using the supplied activty title to find the activity and update it | POST | activityTitle , title , time , description , date |
| /delete-activity | delete the activity containing the specified title                          | POST | activityTitle                                     |
