# PENT Platform API Documentation

Welcome to Pent api that allows you to give reviews about your previous stayed apartment to help others!!
## Technologies Used

- Backend - ExpressJS/Typescript
- Database - MongoDB
- Endpoint Testing - Postman and ThunderClient
- Deployment - Mongo Atlas and Heroku

## How to run in development mode

#### Prerequisites

- Have nodejs v18 and above installed on your system
- Have mongodb installed

#### Dependencies installation

- Fork and clone the repository
- Run `npm install` on your terminal

#### Environment Variables

- Replace the following environment variable with yours
  - `MONGO_URL`
  - `PORT`
  - `TEST_PORT`
  - `JWT_SECRET`
  - `JWT_EXPIRY`

- start the server
  - `npm run serve`

## How to run from hosted link

- Copy the `baseUrl` hosted on heroku link [https://pent-platform.herokuapp.com/](https://pent-platform.herokuapp.com/)

- Refer to [Endpoint](#endpoints) for Request Arguments requirement and endpoint to test on postman

## Error Handling

Errors are returned as JSON objects in the following format:

```json
{
  "statusCode": 404,
  "error": "not found"
}
```

The API will return four error types when requests fail:

- 400: Bad Request
- 404: Not Found
- 422: Not Processable
- 500: Internal server error

### Endpoints

#### GET `'/'`

- Home and welcome page

- **Request Arguments** : `None`

- **Returns** : welcome message

- **Sample** :

```json
{
  "message": "Welcome to Pent api that allows you to give reviews about your previous stayed apartment to help others!!"
}
```

#### POST `'/api/auth/register'`

- Register to gain author privileges

- **Request Arguments**

  - `username` : string
  - `password` string
  - `email`: string
  - `firstName` : string
  - `lastName` : string
  - `gender` : string

- **Returns** : successful message and token

- **Sample** :

```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzAxYWY2NWE0ZDJjYmU1MTc5ZDJiMmUiLCJpYXQiOjE2NjEwNTQ4MjIsImV4cCI6MTY2MTA1ODQyMn0.YxaspcigJadOvMeJq2ZoKEtYyzlNKtuysimKoOOpp2A"
}
```

#### POST `'/api/auth/login'`

- Login to gain author privileges

- **Request Arguments**

  - `username` : string
  - `password` : string

- **Returns** : successful message, user details and token

- **Sample** :

```json
{
  "msg": "login successfully",
  "data": {
    "_id": "6301b5eddce03464be59d9d2",
    "firstName": "Destiny",
    "lastName": "Erhabor",
    "gender": "Male",
    "email": "destinyerhabor6@gmail.com",
    "username": "caesar",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDFiNWVkZGNlMDM0NjRiZTU5ZDlkMiIsInVzZXJuYW1lIjoiY2Flc2FyIiwiaWF0IjoxNjYxMDU2NjM4LCJleHAiOjE2NjEwNjAyMzh9.L6GCYnqULAXvwKJQpQUY4vBXaQVdxVfStQQEKpoR9A8"
}
```

#### POST `'/api/review'` {authentication needed}

- Sends a post request to create a new review

- **Request Arguments** : A json body containing,

  - `image` : string (optional),
  - `video` : string (optional),
  - `apartmentName` : string,
  - `rating` : number
  - `comments.landlord` : string,
  - `comments.environment` : string,
  - `comments.amenitiesQuality` : string

- **Returns**: Returns a success message and created review
details.

- **Sample**:

```json
{
  "data": {
    "apartmentName": "bamboo",
    "image": "",
    "video": "",
    "rating": 2,
    "visitorRatingCount": 0,
    "comments": {
      "landlord": "Not friendly",
      "environment": "trenches",
      "amenitiesQuality": "Bad"
    },
    "_id": "6301b955476d5c148702ca37",
    "owner": "6301b5eddce03464be59d9d2",
    "createdAt": "2022-08-21T04:49:25.381Z",
    "updatedAt": "2022-08-21T04:49:25.381Z",
    "__v": 0
  },
  "message": "Review created successfully"
}
```

#### GET `'/api/reviews'`

- Fetches a list of object of students in which the keys are the id,
name, gender, class and registered subject.

- **Request Arguments**: Optional `Query params`

  - `page` : number
  - `limit` : number
  - `sort` : string - (`visitRating` by default sort by `latest`)

- **Returns**: An array of data object as in `sample` for when sorted by helpful visitor rating. `?sort=visitRating`

- **Sample**:

```json
{
  "data": [
    {
      "comments": {
        "landlord": "Not friendly",
        "environment": "trenches",
        "amenitiesQuality": "Bad"
      },
      "_id": "6301e9577c402eb4e15b868e",
      "image": "",
      "video": "",
      "apartmentName": "bamboo",
      "rating": 2,
      "visitorRatingCount": 109,
      "owner": {
        "_id": "6301e88f578f84cd0887f785",
        "firstName": "Destiny",
        "lastName": "Erhabor",
        "gender": "Male",
        "email": "destinyerhabor6@gmail.com",
        "username": "caesar",
        "__v": 0
      },
      "createdAt": "2022-08-21T08:14:15.427Z",
      "updatedAt": "2022-08-21T08:36:27.811Z",
      "__v": 0
    },
    {
      "comments": {
        "landlord": "friendly",
        "environment": "condusive",
        "amenitiesQuality": "Okay"
      },
      "_id": "6301e9e07c402eb4e15b8694",
      "image": "",
      "video": "",
      "apartmentName": "beache",
      "rating": 12,
      "visitorRatingCount": 0,
      "owner": {
        "_id": "6301e88f578f84cd0887f785",
        "firstName": "Destiny",
        "lastName": "Erhabor",
        "gender": "Male",
        "email": "destinyerhabor6@gmail.com",
        "username": "caesar",
        "__v": 0
      },
      "createdAt": "2022-08-21T08:16:32.429Z",
      "updatedAt": "2022-08-21T08:16:32.429Z",
      "__v": 0
    }
  ],
  "message": "all reviews found"
}
```

#### GET `'/api/review/${id}'`

- Fetches a single set of reviews by their id.

- **Request Arguments**:

  - `id` : integer

- **Returns**: An object with review details, as in `sample`

- **Sample**:

```json
{
  "data": {
    "comments": {
      "landlord": "Not friendly",
      "environment": "trenches",
      "amenitiesQuality": "Bad"
    },
    "_id": "6301b91dec4b6504348918b2",
    "apartmentName": "jericho",
    "image": "",
    "video": "",
    "rating": 2,
    "visitorRatingCount": 0,
    "owner": {
      "_id": "6301b5eddce03464be59d9d2",
      "firstName": "Destiny",
      "lastName": "Erhabor",
      "gender": "Male",
      "email": "destinyerhabor6@gmail.com",
      "username": "caesar",
      "__v": 0
    },
    "createdAt": "2022-08-21T04:48:29.170Z",
    "updatedAt": "2022-08-21T04:48:29.170Z",
    "__v": 0
  },
  "message": "Single review found"
}
```

#### DELETE `'api/review/${id}'` {Authentication and Authorization needed}

- Deletes a specific review using the id of the student

- **Request Arguments**:

  - `id` : integer

- **Returns**: Returns a success message.

- **Sample**:

```json
{
  "message": "Single student deleted"
}
```

#### PUT `'/api/review/${id}'` {Authentication and Authorization needed}

- Update review data

- **Request Arguments**: a params and json body of any data to be updated

  - `id` - `{params}` : integer
  - `image` : string (optional),
  - `video` : string (optional),
  - `apartmentName` : string,
  - `rating` : number
  - `comments.landlord` : string,
  - `comments.environment` : string,
  - `comments.amenitiesQuality` : string

- **Returns**: updated review and a success message as in `sample`

- **Sample**:

```json
{
  "data": {
    "_id": "6301b91dec4b6504348918b2",
    "image": "",
    "video": "",
    "apartmentName": "jericho",
    "rating": 1,
    "visitorRatingCount": 0,
    "owner": "6301b5eddce03464be59d9d2",
    "createdAt": "2022-08-21T04:48:29.170Z",
    "updatedAt": "2022-08-21T04:59:32.336Z",
    "__v": 0
  },
  "message": "review updated"
}
```

#### PATCH `'/api/review/${id}/visitor'`

- Allows visitor to mark reviews as helpful or not

- **Request Arguments**: An id integer of review and json body of

  - `id - {param}` : integer
  - `helpful` : integer (accepts only 1 or 0)

- **Returns**: An object with updated `visitorRatingCount` and a success message as in `sample`

- **Sample**:

```json
{
  "data": {
    "comments": {
      "landlord": "friendly",
      "environment": "condusive",
      "amenitiesQuality": "Okay"
    },
    "_id": "6301e9e07c402eb4e15b8694",
    "image": "",
    "video": "",
    "apartmentName": "beache",
    "rating": 12,
    "visitorRatingCount": 1,
    "owner": "6301e88f578f84cd0887f785",
    "createdAt": "2022-08-21T08:16:32.429Z",
    "updatedAt": "2022-08-21T09:22:12.783Z",
    "__v": 0
  },
  "message": "successful"
}
```
