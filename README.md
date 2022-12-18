# Hangabout

## The game

Hangabout shares a lot of similarities with Hangman in that you have to guess a word, letter by letter, however
duplicates will not be filled in and there is no limit to guesses. The challenge is to guess the word in as few guesses
as possible.

## The code

The app is 90% front-end javascript using React then 10% AWS Lamdba serverless endpoints. I haven't tried to build the
app following any particular design patterns or principles as the main goal was to simply familiarise myself with
writing JavaScript and using functional components along with React hooks. I took a more 'this will do' approach rather
than worrying about readability or scalability.

You can start up the app in a dev environment just like any react app with: `npm run start`

The app is also dockerised in a production-like environment, to run this:

Build the image: `docker build -t <image-name> .`

Run the image: `docker run -p 80:80 <image-name>`
