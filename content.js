(function() {
    let notes = JSON.parse(localStorage.getItem('stickyNotes')) || {};
  
    // Load existing notes
    Object.keys(notes).forEach(id => {
      createNoteElement(id, notes[id].text, notes[id].position);
    });
  
    // Create a new note
    document.addEventListener('dblclick', (e) => {
      const id = 'note-' + new Date().getTime();
      const position = { x: e.pageX, y: e.pageY };
      createNoteElement(id, '', position);
    });
  
    function createNoteElement(id, text, position) {
      const note = document.createElement('div');
      note.className = 'sticky-note';
      note.contentEditable = true;
      note.innerText = text;
      note.style.left = position.x + 'px';
      note.style.top = position.y + 'px';
      note.addEventListener('input', () => saveNote(id, note.innerText, position));
      note.addEventListener('dragend', (e) => saveNote(id, note.innerText, { x: e.pageX, y: e.pageY }));
  
      document.body.appendChild(note);
    }
  
    function saveNote(id, text, position) {
      notes[id] = { text, position };
      localStorage.setItem('stickyNotes', JSON.stringify(notes));
    }
  })();
  