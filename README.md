Experimenting with a simple word puzzle game. Hang About shares a lot of similarities with Hangman in that you have to guess a word letter by letter, however duplicates will not be filled in and there is no limit to guesses. The challenge is to guess the word in as few guesses as possible.


You can start up the app in a dev environment just like any react app with: `npm run start`

The app is also dockerised in a production-like environment, to run this:

Build the image: `docker build -t <image-name> .`

Run the image: `docker run -p 80:80 <image-name>`
