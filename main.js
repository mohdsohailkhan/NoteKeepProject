let noteListRootElement = document.getElementById('main')
let notes = []

renderElementsToScreen()

function renderElementsToScreen(){
  if(localStorage.getItem('notes')){
    notes = JSON.parse(localStorage.getItem('notes'))
    notes.forEach(note=>{
      renderNoteToList(note , note.uniqueId)
    })
  }
}

document.getElementById('deleteall').addEventListener('click',()=>{
   document.querySelectorAll('.note').forEach(note => {
     note.remove();
})
  localStorage.clear()
  notes = []
})

document.getElementById('nnote').addEventListener('click',()=>{
  let uniqueId = 'note' + Math.floor(Math.random() * 1000)
    let note = {
      title : document.getElementById('text').value,
      content : document.getElementById('notes').value
    }
    if( document.getElementById('text').value.length > 0 && document.getElementById('notes').value.length>0)
    {
      addNoteToLocalStorage(note,uniqueId)
      renderNoteToList(note,uniqueId)
    }
    else{alert('Fill the required title and content')}
})

function  renderNoteToList(note,uniqueId){
  
  let noteDiv = document.createElement('div')
  noteDiv.classList.add('note' , uniqueId)
  let noteTitle = document.createElement('h4')
  let noteContent = document.createElement('p')
  let noteDeleteButton = document.createElement('button')
  noteDeleteButton.id = 'delete'

  noteTitle.innerText = note.title
  noteContent.innerText = note.content
  noteDeleteButton.innerText = 'Delete Note'

  noteDiv.appendChild(noteTitle)
  noteDiv.appendChild(noteContent)
  noteDiv.appendChild(noteDeleteButton)
  
  noteDeleteButton.addEventListener('click',()=>{
    removeElementFromNotesList(uniqueId)
  })
  
  noteListRootElement.appendChild(noteDiv)

  document.getElementById('text').value = ''
  document.getElementById('notes').value = ''
  
}


function addNoteToLocalStorage(note,uniqueId){
  note = {...note , uniqueId}
  notes.push(note)
  localStorage.setItem('notes',JSON.stringify(notes))
}

function removeElementFromNotesList(id){
  document.querySelector('.'+id).remove();
  notes = JSON.parse(localStorage.getItem('notes'))
  let index = notes.findIndex(note=>note.uniqueId==id)
  notes.splice(index ,1)
  localStorage.setItem('notes' , JSON.stringify(notes));
}

