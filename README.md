# Tracker Backend

This is the backend for the tracker app. Is an Apollo GraphQL server with a Postgres database.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.16.1)
- [PostgreSQL](https://www.postgresql.org/) (v15.3) - Probably lower versions will work too.

### Installation

1. Clone the repo
   ```sh
   git clone
   ```
2. Install NPM packages
   ```sh
   yarn
   ```
3. Create a `.env` file in the root of the project and add variables on .env-example

4. Create a database in PostgreSQL
   ```sh
   yarn prisma:generate
   ```

## Usage

```sh
yarn start
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
