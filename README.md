# Overview

Playground for graphQL, apollo server.

## Installation

First, clone this repo and change to the directory:
```bash
git clone git@github.com:pmtargosz/<project>.git
cd <project>
```

### Install

```bash
npm install
```

And also you have to local install redis server.

### Config

Creat `config.js` file inside project root folder and add this code changing `<your_data>`:
```js
const config = {
    PORT: process.env.PORT || 3000,
    ENV: process.env.NODE_ENV || 'development',
    PATH: '/graphql'
}

module.exports = config;
```


### Run Dev Environment

```bash
npm run server
# http://localhost:3000/graphql
```

## Resources
* [graphql](https://graphql.org) - GraphQL.
* [apollo](https://www.apollographql.com/) - GraphQL server.

## License
[MIT](https://opensource.org/licenses/MIT)