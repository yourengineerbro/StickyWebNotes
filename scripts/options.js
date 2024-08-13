let expandableList = document.getElementById('expandableList');
let count = 1;

chrome.storage.local.get(null, (listData) => {
    
    function createListItem(key, value) {

        const listItem = document.createElement('li');
        listItem.classList.add('expandable-item');
      
        const link = document.createElement('a');
        link.href = key;
        link.target = "_blank";
        link.textContent = key;
        const heading = document.createElement('h3');
        heading.classList.add('heading');
        heading.style.display = 'flex'; // Use flexbox to align divs in a row
        heading.style.justifyContent = 'space-between'; // Optional: space between divs
        heading.style.width = '100%';
        heading.style.alignItems = 'center';

        const numbering = document.createElement('div');
        numbering.innerText = count + ". ";
        numbering.style.width = '20px';
        
        const downloadButton = document.createElement('div');
        downloadButton.id = key;
        downloadButton.innerHTML = '<a href="#">download notes</a>';
        downloadButton.style.marginLeft = 'auto';
        downloadButton.style.right = '0';
        downloadButton.style.float = 'right';
        downloadButton.style.width = '7%';
        downloadButton.addEventListener('click', downloadNotes);
     
        heading.append(numbering);
        heading.append(link);
        heading.append(downloadButton);
      
        const noteArray = document.createElement('ol');
        

        value.forEach((noteText) =>{
            const note = document.createElement('li');
            note.classList.add('itemNote')
            note.textContent = noteText.text;
            noteArray.appendChild(note);
        })
      
        listItem.appendChild(heading);
        listItem.appendChild(noteArray);
      
        listItem.addEventListener('click', () => {
          listItem.classList.toggle('expanded');
        });
      
        return listItem;
      }

      function downloadNotes(event) {
         const id = event.currentTarget.id;
         const notesData = JSON.stringify(listData[id]);
         const blob = new Blob([notesData], { type: 'application/json' });
         const url = URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.href = url;
         a.download = 'stickyNotes.json';
         a.click();
         URL.revokeObjectURL(url);
      }
      
      function populateList(data) {
        Object.keys(data).forEach(key => {
              const listItem = createListItem(key, data[key]);
              expandableList.appendChild(listItem);
              count++;
        });
       
      }
      
      populateList(listData);
})
  

