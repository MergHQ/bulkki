# Bulkki

Script I use for sending personalized bulk email.

## Using

1. Do `cp .env.example .env`. After that fill in your secrets to `.env`
2. Do `cp template/template.js.example template/teamplate.js`. Modify this copied file to your liking. The `params` argument contains a map of the column values for the current row.
3. Run `npm start [input file path]`, where the input file is a CSV file with the first row containing the name of the column.

## Example

csv file named data.csv in the repository root:

```
name,email,greeting
Bob,bob@bob.io,this is obviously a test.
Bob2,bob@bob.io,this is serious shit mate.
```

1. Set up the template file:

```js
export default params => ({
  from: 'my.email@here.com',
  to: '${params.email}',
  subject: `Greetings, ${params.name}`,
  text: `Hello
  ${params.greeting}
  
  regards,
  Secret Person
  `,
})
```

2. Run `yarn start data.csv`
