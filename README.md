# csen-174-pantryhero
<div style="left">
  PantryHero - Rescue Your Recipes
<div>
Yi Qian Goh
Veronica Flores
Lucas Amlicke
</div>
</div>
# Getting started(for devs)

## how to work CI/CD
1. pick a ticket
2. on the ticket page click  "create a branch"
3. run `yarn format && yarn test` to check your code
4. create a Pull Request for your branch
5. After your PR passes all the tests, merge your branch into main

## prerequisites
- install yarn, npm



# About the Product
## Features
- **User Preferences**
- **Barcode Scanner**
- **Expiration date scan**
- **Recipe Get**
- **Recipe Recommendations**

##  Tech Stacks
- **webapp framework** next.js
- **barcode scanner** [zxing-react](https://stackblitz.com/edit/zxing-scanner-react?file=index.js)
- **database** [postgres-neon](https://neon.tech/docs/guides/react)
- **natural language agent** [RAG query](https://neon.tech/docs/extensions/pgrag)
- **recommendation system** [k-nearest neighbor](https://dev.to/eerk/creating-a-recommender-system-in-10-lines-of-javascript-2409)
