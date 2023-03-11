export const symbolSplit = (key, symbol = "_") => key.split(symbol);

export function capitalizeWords(toCapitalizeArray, toUpperCaseArray = []) {
  return toCapitalizeArray.map((element) =>
    toUpperCaseArray.includes(element)
      ? element.toUpperCase()
      : element.charAt(0).toUpperCase() + element.substring(1).toLowerCase()
  );
}

export function getCapitalizedLabel(key, value = []) {
  const underScoreSplit = symbolSplit(key);
  const uppercaseList = capitalizeWords(underScoreSplit, value);
  const capitalizedLabel = uppercaseList.join(" ");

  return capitalizedLabel;
}
