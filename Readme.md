# Coding Challenge
**Applicant: Vu Nam Nguyen**

## Intro

I have implemented all points mentioned using the prefered tech stack, linting, VUE3 etc. If there's any points you would like to see improved, please let me know. The project has been committed often each step of the way and there are tests for both the backend and frontend but coverage could still be improved.

## Requirements

Node LTS 14.5

## Instructions

1. Copy .env.sample file into a .env file. 
2. You can leave the variables as they are or set variable `NEO4J_AUTH` to `neo4j/any-password-here` if you're not using docker
3. Start neo4j through docker using the following command if needed
```
  docker run --name neo4j -p7474:7474 -p7687:7687 -d --env-file .env neo4j:latest
```
4. `npm run migrate` to migrate data to DB
5. `npm run server` first to set up the server and then `npm start`
6. `npm test` for running the tests

### Improvements with more time

1. I would have created more config etc for styles and common variables
2. More strict type checks
3. Error handling on UI
4. More test coverage


