# Getting started

get started with one line:

`docker-compose up`

then head to localhost:3000 to see the app.

GraphQL endpoint is at http://localhost:3000/graphql
Interactive GraphQL playground is at http://localhost:3000/graphiql

# Development

SQL scripts are only run on container creation. This means if you add a schema
change or data change in the postgres sql directory you will need to run
`docker-compose rm` then `docker-compose up` again for the sql init scripts to
be rerun.

## TODO:
  - ~~Authentication: postgraphql JWT~~
  - Authorisation - add custom claims to firebase JWT and use these with postgres security
  - register book form
    - uniform
    - upload images
  - SEO from https://github.com/thedaviddias/Front-End-Checklist#seo
