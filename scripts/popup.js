document.addEventListener('DOMContentLoaded', () => {
    const linkToAllNotes = document.getElementById('allnotes');
    const linkToGithub = document.getElementById('contribute');

    linkToAllNotes.addEventListener('click', (event) => {
    
      chrome.tabs.create({ url: '../html/options.html' });
    });

    linkToGithub.addEventListener('click', (event) => {
       chrome.tabs.create({url: "https://github.com/yourengineerbro/StickyWebNotes"});
    })
  });