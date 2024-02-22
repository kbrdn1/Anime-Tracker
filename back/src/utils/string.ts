// Utils for string manipulation - string.ts
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const capitalizeFirstLetterOfEachPhrase = (str: string) => {
  return str.replace(/(^\w{1}|\.\s*\w{1})/gi, (match) => match.toUpperCase())
}

export const capitalizeFirstLetterAndLetterAfterEachHyphen = (str: string) => {
  return str.replace(/(^|-)(\w)/g, (match) => match.toUpperCase())
}