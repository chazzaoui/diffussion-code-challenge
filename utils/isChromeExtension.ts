declare const chrome: any;

export const isChromeExtension = () => {
  return (
    typeof chrome !== 'undefined' &&
    chrome.runtime &&
    chrome.runtime.id
  );
};
