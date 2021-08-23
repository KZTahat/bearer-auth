# LAB - 07

## bearer-auth

### `Author: Khaled Tahat`

[tests report]()

### Setup

`.env` requirements

- PORT=3002
- POSTGRES_URI = postgres://postgres:0000@localhost:5432/bearerdb
- SECRET=super secret
- POSTGRES_URI_TEST=postgres://postgres:0000@localhost:5432/testbearer

- Running the app - `npm start` 

- Endpoints: 
    - `/signup` 
        - returns Object example with `201` status if exists:<br />
        
        ```
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMCIsInRlc3QiOiJ0aGlzIGlzIGEgdGVzdCBwYXlsb2FkIiwiaWF0IjoxNjI5NzI2NjMyfQ.FgASOagcedb8E085ShkXkgGH8PnmOV1LHPXZrCs8uQQ",
            "id": 5,
            "username": "test10",
            "password": "$2b$10$DEWtlzyRvrWnj7G.kL/t6O8cTNp55YRdhGW4nZXlALmL.HEIZi/QO",
            "createdAt": "2021-08-23T12:08:37.879Z",
            "updatedAt": "2021-08-23T12:08:37.879Z"
        }
        ```

    - `/signin`
        - returns Object example with `200` status if exists:<br />
        
        ```
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMCIsInRlc3QiOiJ0aGlzIGlzIGEgdGVzdCBwYXlsb2FkIiwiaWF0IjoxNjI5NzI2NjMyfQ.FgASOagcedb8E085ShkXkgGH8PnmOV1LHPXZrCs8uQQ",
            "id": 5,
            "username": "test10",
            "password": "$2b$10$DEWtlzyRvrWnj7G.kL/t6O8cTNp55YRdhGW4nZXlALmL.HEIZi/QO",
            "createdAt": "2021-08-23T12:08:37.879Z",
            "updatedAt": "2021-08-23T12:08:37.879Z"
        }
        ```

- Tests: <br />
Unit Tests: `npm run test` <br />

- UML

<img src="/home/kztahat/401-course/week2/bearer-auth/src/BearerAuth.png"
     alt="code-challenge-1 whiteBoard"
     style="float: left; margin-right: 10px;" />