# Knights Challenge 

## Stack
 - [NodeJs](https://nodejs.org/en)
 - [PrismaORM](https://www.prisma.io/?via=start&gad_source=1&gclid=Cj0KCQiA19e8BhCVARIsALpFMgEJ0eOAMb4O02iUZ8ecYw_MDfk13leVIIziLB41kiJMjK4Yj4l1W6YaAp8_EALw_wcB)
 - [MongoDB](https://www.mongodb.com/pt-br/lp/cloud/atlas/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_retarget-brand_gic-null_amers-all_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=14412646314&adgroup=131761122172&cq_cmp=14412646314&gad_source=1&gclid=Cj0KCQiA19e8BhCVARIsALpFMgE1ganpjdDOnSKnsDY1DfsRlXahKEdzqRmWkIK1CSmkLmswghRN5xYaAm81EALw_wcB)
 - [Docker](https://www.docker.com/)
 - [Vue](https://vuejs.org/)
 - [Vuex](https://vuex.vuejs.org/)

## Setup
Add environment variables
```bash
cp .env.example .env
```

## Tools is required
Docker and Yarn

## Running database
Runs container with MongoDB
```bash
docker compose up db -d
```
## Running project
Install dependencies
```bash
yarn install
```

Create documents and running seed(required)
```bash
yarn prisma:push && yarn prisma:seed
```

Running backend
```bash
yarn start:backend
```

Running frontend
```bash
yarn start:frontend
```

## Endpopint
The documentation for all project endpoints is available at the /api URL.