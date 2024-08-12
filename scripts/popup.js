document.addEventListener('DOMContentLoaded', () => {
    const link = document.querySelector('a');
    link.addEventListener('click', (event) => {
    
      chrome.tabs.create({ url: '../html/options.html' });
    });
  });