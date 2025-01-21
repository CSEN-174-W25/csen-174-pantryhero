# csen-174-pantryhero
<div style="left">
  PantryHero - Rescue Your Recipes
<div>
Yi Qian Goh
Veronica Flores
Lucas Amlicke
</div>
</div>

## getting started
1. cd into /pantryhero and run `yarn install`
2. check package.json to find all the scripts to develop(start with 'yarn dev')
2. please do not commit to main, Only use PRs (more in the CI/CD section)

## tech stack
**Jest**: For testing the Next.js components
**Prisma**: For interacting with the database(try the prisma cmds in paackage.json)
**Supabase**: For storing data in the cloud

## how to commit work with CI/CD
1. go to the github project page -> pick a ticket
2. on the right side ticket page click  "create a branch" -> "use Github Desktop"
3. run `yarn test` to check your code
4. create a Pull Request for your branch(PLEASE WRITE A SHORT DESC OF CHANGES)
5. After your PR passes all the tests on github, merge your branch into main

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
