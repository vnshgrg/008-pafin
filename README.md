# Pafin code test assignment

### Objective

The goal for this assignment is to write a RESTful API for a single resource `User` which allows users to create, retrieve, update and delete data on a PostgreSQL database.

This project uses `Express.JS` framework to create a REST API. Project uses `Typescript`, `Node.JS` and `PostgreSQL` database with `Prisma` as ORM *(Prisma works quite well with `Typescript`)*.

### Implementation
The end result of this assignment is slightly different from the assignment specification. The assignment mentioned that I am supposed to create a REST API for CRUD on User resource. But, as one of the requirement the project should also be secured using JWT authentication. In this regard I thought it would make more sense to allow any user to register -> `CREATE`, login -> `READ`, additional two different endpoints to update their information and change their password -> `UPDATE` and finally delete their account -> `DELETE`. This will satisfy the requirement of the assignment while maintaining real-world scenario of an actual app.

### Prerequisite
This project is developed and tested in `node@20.3.0` and `npm@9.6.7`. There is a possibility of incompatibility based on your installed version of Node.JS and NPM. It is suggested to use `NVM` to run this project with latest version of Node.JS and NPM.

### Installation
Clone this repository to your local machine and `cd` into the project directory. Install the required dependencies by following command:

```
npm install
```

You will need to set necessary environment variables before you can run this project. I have placed a sample environment file (`.env.sample`) to this project. You can run following command to copy the sample file.
```
cp .env.sample .env
```
After copying the sample environment file open `.env` in your favorite code editor and place the values for the following environment variables.
```
DATABASE_URL=
PORT=4000
JWT_SECRET=
```
`DATABASE_URL` is the connection url to your  `PostgreSQL` server. `PORT` is set to 4000 by default but you can change it to the value of your liking. `JWT_SECRET` is your secret key string for signing JWT tokens. Please use a combination of alpha-numeric texts with special characters.

<details>
 <summary><b>Optional: Database Migration</b></summary>

  Since the assignment mentions that I should assume that the database schema and tables have already been created but does not provide any other information. If you want to run this project locally then you run migration using following command:

  ```
  npm run db:deploy
  ```

  The above command will also generate Prisma client to the project so that your database schema defined in Prisma syncs with the generated Types for Typescript. If you notice that the Prisma client's is not being generated as expected then you can manually generate Prisma client by using following command:
  ```
  npm run db:generate
  ```
</details>


### Running locally
After completing the installation you can run the application locally in your local machine:

```
npm run dev
```
The local server is up and you should see following in your terminal.
```
Server listening at http://localhost:4000
```

NOTE: If you change the value of `PORT` in the environment variable file then use the changed port at the end of above URL.

### Using the API
You can connect to the API using any REST API client such as Postman. Simply set the request method, url and necessary body and send the request.

Below are the list of endpoints available within the API:

#### CREATE - Register an account
<details>
 <summary><code>POST</code> <code><b>/user</b></code></summary>

##### Parameters

> | name  |  type | data type  | description |
> |-------|--------|------------|-------------|
> | name  |  required | string   | Full name of the user  |
> | email  |  required | string   | Email address  |
> | password  |  required | string   | Password  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | 201         | application/json        | Success |
> | 400         | application/json | Error |
</details>

#### READ - Login into an account
<details>
 <summary><code>POST</code> <code>/user/login</code> </summary>

##### Parameters

> | name  |  type | data type  | description |
> |-------|--------|------------|-------------|
> | email  |  required | string   | Email address  |
> | password  |  required | string   | Password  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | 200         | application/json        | LoginResponse |
> | 400         | application/json | Error |
</details>

#### UPDATE - Update user details
<details>
 <summary><code>PATCH</code> <code>/user</code> </summary>

##### Headers

> | name  |  type | data type  | description |
> |-------|--------|------------|-------------|
> | Authorization  |  required | Bearer Token   | JWT Token in \`Bearer ${token}\` format. |

##### Parameters

> | name  |  type | data type  | description |
> |-------|--------|------------|-------------|
> | name  |  required | string   | Name of the user  |
> | email  |  required | string   | Email of the user  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | 200         | application/json        | Success |
> | 400         | application/json | Error |
</details>



#### UPDATE - Update user's password
<details>
 <summary><code>PATCH</code> <code>/user/change-password</code> </summary>

##### Headers

> | name  |  type | data type  | description |
> |-------|--------|------------|-------------|
> | Authorization  |  required | Bearer Token   | JWT Token in \`Bearer ${token}\` format. |

##### Parameters

> | name  |  type | data type  | description |
> |-------|--------|------------|-------------|
> | currentPassword  |  required | string   | Current Password of the user  |
> | newPassword  |  required | string   | New password  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | 200         | application/json        | Success |
> | 400         | application/json | Error |
</details>


#### DELETE - Delete user's account
<details>
 <summary><code>DELETE</code> <code>/user</code> </summary>

##### Headers

> | name  |  type | data type  | description |
> |-------|--------|------------|-------------|
> | Authorization  |  required | Bearer Token   | JWT Token in \`Bearer ${token}\` format. |

##### Parameters

> | name  |  type | data type  | description |
> |-------|--------|------------|-------------|
> | password  |  required | string   | Current Password of the user  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | 200         | application/json        | Success |
> | 400         | application/json | Error |
</details>

### Custom objects
#### Object: Principal

> | name  |  type | data type  | description |
> |-------|--------|------------|-------------|
> | id  |  required | String   |  User ID |
> | name  |  required | String   | Name of the user  |
> | email  |  required | String   | Email address of the user  |

#### Object: Success

> | name  |  type | data type  | description |
> |-------|--------|------------|-------------|
> | result  |  required | Boolean   |  true |
> | message  |  required | String   | Success message  |

#### Object: LoginResponse

> | name  |  type | data type  | description |
> |-------|--------|------------|-------------|
> | result  |  required | Boolean   |  true |
> | token  |  required | String   | JWT Token  |
> | data  |  required | Principal   | User details  |

#### Object: Error

> | name  |  type | data type  | description |
> |-------|--------|------------|-------------|
> | result  |  required | Boolean   | false  |
> | message  |  required | String   | Error message  |
> | errors | optional | ValidationError[] | Validation error |


#### Object: ValidationError

> | name  |  type | data type  | description |
> |-------|--------|------------|-------------|
> | code  |  required | String   | Validation error code   |
> | path  |  required | String   | Path of validation error *(e.g. "body.name")*  |
> | message | required | String | Error message |