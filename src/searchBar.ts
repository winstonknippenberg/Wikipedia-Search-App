import { clear, search } from './main';

export const setSearchFocus = () => {
  search!.focus();
};

export const showClearTextButton = () => {
  if (search!.value.length) {
    clear!.classList.remove('none');
    clear!.classList.add('flex');
  } else {
    clear!.classList.add('none');
    clear!.classList.remove('flex');
  }
};

export const clearSearchText = (event: Event) => {
  event.preventDefault();
  search.value = '';
  clear!.classList.add('none');
  clear!.classList.remove('flex');
  setSearchFocus();
};

export const clearPushListener = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    clear!.click();
  }
};
