import {
  setSearchFocus,
  showClearTextButton,
  clearSearchText,
  clearPushListener,
} from './searchBar.js';
import { getSearchTerm, retrieveSearchResults } from './dataFunctions.js';
import {
  deleteSearchResults,
  buildSearchResults,
  clearStatsLine,
  setStatsLine,
} from './searchResults.js';

document.addEventListener('readystatechange', (event) => {
  //@ts-ignore
  event.target.readyState === 'complete' && initApp();
});

export const clear = document.getElementById('clear');
const form = document.getElementById('searchBar');
export const search = <HTMLInputElement>document.getElementById('search');

const initApp = () => {
  setSearchFocus();
  search!.addEventListener('input', showClearTextButton);
  clear!.addEventListener('click', clearSearchText);
  clear!.addEventListener('keydown', clearPushListener);
  form!.addEventListener('submit', submitTheSearch);
};

const submitTheSearch = (event: SubmitEvent) => {
  event.preventDefault();
  deleteSearchResults();
  processTheSearch();
  setSearchFocus();
};

const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === '') return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) {
    buildSearchResults(resultArray);
  }
  setStatsLine(resultArray.length);
};
