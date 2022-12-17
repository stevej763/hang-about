import {testWords} from '../utils/wordGeneratorUtil'

const API_URL: string = process.env.REACT_APP_LAMBDA_ENDPOINT || "BROKEN";

export async function getRandomWord(): Promise<string> {
  if (isProduction()) {
    return await fetch(API_URL)
        .then(response => response.json())
        .then(response => {
          return response.wordOfTheDay
        }).catch(() => {
          return "BROKEN"
        })
  }
  return getTestWord();
}

export async function getShortDailyWord(): Promise<string> {
  if (isProduction()) {
    const shortLengthWord = "/?mode=" + process.env.REACT_APP_MODE_ONE;
    return await getWordFromApi(shortLengthWord);
  }
  return "A";
}

export async function getMediumDailyWord(): Promise<string> {
  if (isProduction()) {
    const mediumLengthWord = "/?mode=" + process.env.REACT_APP_MODE_TWO;
    return await getWordFromApi(mediumLengthWord)
  }
  return "B";
}

export async function getLongDailyWord(): Promise<string> {
  if (isProduction()) {
    const longLengthWord = "/?mode=" + process.env.REACT_APP_MODE_THREE;
    return await getWordFromApi(longLengthWord);
  }
  return "C";
}

async function getWordFromApi(uri: string) {
  return await fetch(API_URL + uri)
      .then((response) => response.json())
      .then(response => {
        return response.wordOfTheDay
      }).catch(() => {
        return "BROKEN"
      });
}

function getTestWord() {
  return testWords[(Math.floor(Math.random() * testWords.length))].toUpperCase();
}

function isProduction() {
  return process.env.REACT_APP_ENVIRONMENT === "production";
}

export {}