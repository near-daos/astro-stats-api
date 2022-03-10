# Astro Stats API

### Local Development

1. Clone the repo:
```
git clone git@bitbucket.org:magicpowered/dao-stats-api.git
```

2. Open the repo folder:
```
cd dao-stats-api
```

3. Install dependencies:
```
yarn
```

4. Add `.env.local` to the root folder with required environment variables described in `.env`.

5. Run dev docker compose:
```
docker-compose -f docker-compose-dev.yml up
```
Please make sure that Docker has been installed on your local machine.

6. Run all services in dev mode:
```
yarn start-dev
```

Or run specific service you need:

- Aggregator: `yarn start-aggregator:dev`
- API: `yarn start-api:dev`