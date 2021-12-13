# covid-19-web

Live demo hosted on heroku: https://covid-tracking-web.herokuapp.com/

- Languages: HTML, CSS, JavaScript
- Environment: NodeJS, ran using Express
- Database: COVID19

Setup:
- install node modules: `npm install`
- install session: `npm install express-session`
- install sql: `npm install --save mysql`

Start website
- First, open two terminals
- In the first one: `cd {folderPath}/COVID19/`
- In the second one:
  - `sql_start;`
  - `mysql --host=127.0.0.1`
  - `use COVID19;`

Default user credentials
- email: default@covid19web.danhle0711.com
- password: password
