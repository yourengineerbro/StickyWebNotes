var myNotesArray = new Array();

(function() {

  // this removes the fragment identifier(#) from url
  function removeFragmentIdentifier(url) {
    const urlObj = new URL(url);
    urlObj.hash = '';
    return urlObj.toString();
  }
  
  const originalUrl = window.location.href;
  const cleanUrl = removeFragmentIdentifier(originalUrl);

  chrome.storage.local.get(cleanUrl, (result) => {

    if (chrome.runtime.error) {
      console.error("Error getting item:", chrome.runtime.error);
    } else {
       myNotesArray = result[cleanUrl] || [];
      // Now you can manipulate the array as needed
      for(let i = 0; i < myNotesArray.length; i++) {
        let note = myNotesArray[i];
        createNoteElement(note.id, note.text, note.position);
      }
  
    }
  })


  // Create a new note
  document.addEventListener('dblclick', (e) => {
    const id = 'note-' + new Date().getTime();
    const position = { x: e.pageX, y: e.pageY };
    createNoteElement(id, '', position);
  });

  function createNoteElement(id, text, position) {

    const container = document.createElement('div');
    container.style.width = '200px';
    container.style.backgroundColor = '#f0f0f0';
    container.style.padding = '10px';
    container.style.minHeight = '100px';
    container.style.left = position.x + 'px';
    container.style.top = position.y + 'px';
    container.style.width = '200px';
    container.style.borderRadius = '8px';
    container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.resize = 'both';
    container.style.overflow = 'auto';
    container.style.position = 'absolute';

    const header = document.createElement('div');
    header.style.cursor = 'move';
    header.style.backgroundColor = '#2196F3';
    // header.style.backgroundColor = '#d0d0d0';
    header.style.marginBottom = '10px';
    header.style.marginTop = '-15px';
    header.style.marginRight = '-10px';
    header.style.marginLeft = '-10px';
    header.style.padding = '10px';
    header.style.height = '3px';
    header.style.position = 'relative';
  

    const deleteButton = document.createElement('button');
    deleteButton.innerText='X';
    deleteButton.style.backgroundColor = 'transparent';
    deleteButton.style.position = 'absolute';
    deleteButton.style.right = '0';
    deleteButton.style.border = 'none';
    deleteButton.style.top = '5px';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.color = 'black';
    deleteButton.onclick = () => deleteNote(id, container);

    header.appendChild(deleteButton);

    const note = document.createElement('div');
    note.style.marginBottom = '0px';
    note.style.backgroundColor = '#ffff00';
    note.contentEditable = true;
    note.style.padding = '10px';
    note.textContent = 'Child 2';
    note.style.flexGrow = '1';
    note.style.marginBottom = '-10px';
    note.style.marginTop = '-10px';
    note.style.marginRight = '-10px';
    note.style.marginLeft = '-10px';
    note.innerText = text;

    container.appendChild(header);
    container.appendChild(note);
  
    note.addEventListener('input', () => saveNote(id, note.innerText, position));
  
    // Enable dragging
    let isDragging = false;
    let offsetX, offsetY;
  
    header.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - container.offsetLeft;
      offsetY = e.clientY - container.offsetTop;
    });
  
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        container.style.left = e.clientX - offsetX + 'px';
        container.style.top = e.clientY - offsetY + 'px';
      }
    });
  
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        saveNote(id, note.innerText, { x: container.offsetLeft, y: container.offsetTop });
      }
    });
  
    document.body.appendChild(container);
  }
  
  function saveNote(id, text, position) {
    const index = myNotesArray.findIndex(item => item.id === id);
    if(index != -1) {
       let updatedNote = {
          "id" : id,
          "text" : text,
          "position" : position
       };
       myNotesArray[index] = { ...myNotesArray[index], ...updatedNote };
    } else {
       let myNote = {
        "id" : id,
        "text" : text,
        "position" : position
     };
     myNotesArray.push(myNote);
    }

 
    chrome.storage.local.set({ [cleanUrl]: myNotesArray }, function() {
      if (chrome.runtime.error) {
        console.error("Error setting item:", chrome.runtime.error);
      } else {
      }
    });
  }

  function deleteNote(id, container) {
     
    container.remove();
    const index = myNotesArray.findIndex(item => item.id === id);
    myNotesArray.splice(index,1);
    chrome.storage.local.set({[cleanUrl] : myNotesArray}, ()=>{
      console.log("Note deleted");
  })
      
  }

})();
