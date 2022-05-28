import { SearchResultItem } from './types/ui.types';

export const deleteSearchResults = () => {
  const parentElement = document.getElementById('searchResults');
  if (parentElement) {
    let child = parentElement.lastElementChild;
    while (child) {
      parentElement.removeChild(child);
      child = parentElement.lastElementChild;
    }
  }
};

export const buildSearchResults = (resultArray: SearchResultItem[]) => {
  resultArray.forEach((result) => {
    const resultItem = createResultItem(result);
    const resultContents = document.createElement('div');
    resultContents.classList.add('resultContents');
    if (result.img) {
      const resultImage = createResultImage(result);
      resultContents.append(resultImage);
    }
    const resultText = createResultText(result);
    resultContents.append(resultText);
    resultItem.append(resultContents);
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
      searchResults.append(resultItem);
    }
  });
};

const createResultItem = (result: SearchResultItem) => {
  const resultItem = document.createElement('div');
  resultItem.classList.add('resultItem');
  const resultTitle = document.createElement('div');
  resultTitle.classList.add('resultTitle');
  const link = document.createElement('a');
  link.href = `https://en.wikipedia.org/?curid=${result.id}`;
  link.textContent = result.title;
  link.target = '_blank';
  resultTitle.append(link);
  resultItem.append(resultTitle);
  return resultItem;
};

const createResultImage = (result: SearchResultItem) => {
  const resultImage = document.createElement('div');
  resultImage.classList.add('resultImage');
  const img = document.createElement('img');
  img.src = result.img!;
  img.alt = result.title;
  resultImage.append(img);
  return resultImage;
};

const createResultText = (result: SearchResultItem) => {
  const resultText = document.createElement('div');
  resultText.classList.add('result');
  const resultDescription = document.createElement('p');
  resultDescription.classList.add('resultDescription');
  resultDescription.textContent = result.text;
  resultText.append(resultDescription);
  return resultText;
};

export const clearStatsLine = () => {
  document.getElementById('stats')!.textContent = '';
};

export const setStatsLine = (numberOfResults: number) => {
  const statsLine = document.getElementById('stats')!;
  if (numberOfResults) {
    statsLine.textContent = `Displaying ${numberOfResults} results.`;
  } else {
    statsLine.textContent = 'Sorry, no results.';
  }
};
