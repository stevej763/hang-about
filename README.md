Experimenting with a simple word puzzle game. Hang About shares a lot of similarities with Hangman in that you have to guess a word letter by letter, however duplicates will not be filled in and there is no limit to guesses. The challenge is to guess the word in as few guesses as possible.


You can start up the app in a dev environment just like any react app with: `npm run start`

The app is also dockerised in a production-like environment, to run this:

Build the image: `docker build -t <image-name> .`

Run the image: `docker run -p 80:80 <image-name>`


## Known bugs

final correct letter guess does not increment counter

backspace should not move the carrot position to previous letter, just delete current letter - Do I even want the backspace to be a feature (count is already added so there is no advantage to deleting the character)

## Idea for word completion modal

(this will also fix the guess counter not updating I think)

- Show stats for that round
- quickest letter to guess
- longest letter to guess
- time taken to guess whole word
- most guessed letter (the key that way pressed the most)
