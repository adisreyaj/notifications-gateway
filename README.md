# Node Notificaitons Gateway

## How to get started

1. Install the packages

```bash
npm install
```

2. Run the server

```bash
npm run start
```

3. Done. Check the status of the server

```
http://localhost:3000/api/v1/health
```

You will be able to see this response:

```json
{
  "status": "up"
}
```

This means you are good to go.

### Running Test

The project use **Jest** as the test runner and also uses **chai** and **supertest**

```bash
npm run test
```

**Enjoy**
