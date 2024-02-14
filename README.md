# Retention Report

## Description

A simple api to demonstrate how we could get a retention report given an appointment list from a reference month

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)

## Installation

Please use node 20 or later

Put a sqlite file at the root of the project\
The database should respect this schema
```
CREATE TABLE CLIENTS ( 
client_id INTEGER PRIMARY KEY,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
gender TEXT NOT NULL);

CREATE TABLE EMPLOYEES (
employee_id INTEGER PRIMARY KEY,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL);

CREATE TABLE APPOINTMENTS ( 
appointment_id INTEGER PRIMARY KEY, 
employee_id INTEGER, 
client_id INTEGER, 
date TEXT NOT NULL, 
FOREIGN KEY(client_id) REFERENCES CLIENTS(client_id), 
FOREIGN KEY(employee_id) REFERENCES EMPLOYEES(employee_id));
```

Create an `.env` file at the root of the project
```
DATABASE_FILE={name of your sqlite file, required}
APP_PORT={port of the express application, default to 3000}
```

Install the needed packages
```
npm install
```

Run the application (development)
```
npm run dev
```

## Usage

Once the server is up and running, on route will be available:
```
http://localhost:3000/api/stats/clientRetention?referenceMonth=2023-03
```

`referenceMonth` and `lastMonth` should be of the format `'YYYY-MM'`.\
`referenceMonth` is required and should be before `lastMonth`.\
`lastMonth` is optional, default to current month.

Shape of the response:
```
[
    {
        "month": "2023-03",
        "employees": [
            {
                "employeeId": 42
                "employeeName": "John Do",
                "initialNumberOfClients": 72,
                "clientsRetention": 35
            },
        ]
    }
]
```

## Tests

```
npm run test
```
Only utils are unit tested for now