import { SearchResultItem } from './types/ui.types';
import { search } from './main';
import { Page, Pages, SearchResults } from './types/apiResults.types';

export const getSearchTerm = (): string => {
  const rawSearchTerm = search.value.trim();
  const regex = /[ ]{2,}/gi;
  //@ts-ignore
  const searchTerm = rawSearchTerm.replaceAll(regex, ' ');
  return searchTerm;
};

export const retrieveSearchResults = async (searchTerm: string) => {
  const wikiSearchString = getWikiSearchString(searchTerm);
  const wikiSearchResults = await requestData(wikiSearchString);
  if (wikiSearchResults?.query) {
    return processWikiResults(wikiSearchResults.query.pages);
  } else {
    return [];
  }
};

const getWikiSearchString = (searchTerm: string) => {
  const maxChars = getMaxChars();
  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
  const searchString = encodeURI(rawSearchString);
  return searchString;
};

const getMaxChars = () => {
  const width = window.innerWidth || document.body.clientWidth;
  let maxChars: 65 | 100 | 130;
  if (width < 414) {
    maxChars = 65;
  } else if (width >= 414 && width < 1400) {
    maxChars = 100;
  } else {
    maxChars = 130;
  }
  return maxChars;
};

const requestData = async (searchString: string) => {
  try {
    const response = await fetch(searchString);
    const data: SearchResults = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const processWikiResults = (results: Pages) => {
  const resultArray: SearchResultItem[] = [];
  Object.keys(results).forEach((pageid) => {
    const id = pageid;
    const title = results[pageid].title;
    const text = results[pageid].extract;
    const img = results[pageid].thumbnail
      ? results[pageid].thumbnail!.source
      : null;
    const item: SearchResultItem = {
      id,
      title,
      img,
      text,
    };
    resultArray.push(item);
  });
  return resultArray;
};
