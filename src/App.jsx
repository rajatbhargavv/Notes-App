import React from 'react'
import Header from './components/Header'
import useNotes from './hooks/useNotes'
import NotesGrid from './components/NotesGrid'
import NoteModal from './components/NoteModal'

const App = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const {notes,
        activeNotes,
        archivedNotes,
        trashedNotes,
        pinnedNotes,
        createNote,
        trashNote,
        updateNote,
        restoreNotes,
        deleteNotePermanently,
        togglePin,
        toggleArchive} = useNotes();
  
  console.log(notes)
  const [currentView, setCurrentView] = React.useState('active')
  const [selectedNote, setSelectedNote] = React.useState(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  // Shortcut for new node - N
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e.key)
      if(e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA') return;
      
      if(e.key === 'n' || e.key === 'N'){
        setSelectedNote(null)
        setIsModalOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, []);

  // Shortcut for close modal - Escape
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if(!isModalOpen) return;
      if(e.key === 'Escape'){
        setIsModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen]);

  
  const handleCreateClick = () => {
    setSelectedNote(null)
    setIsModalOpen(true)
  }
  
  const handleEditNote = (note) => {
    setSelectedNote(note)
    setIsModalOpen(true)
  }
  
  const handleModalSubmit = (data) => {
    if(selectedNote){
      updateNote(selectedNote.id, data)
    }else{
      createNote(data)
    }
    
    setIsModalOpen(false)
    setSelectedNote(null)
  }
  
  const handleModalClose =() => {
    setSelectedNote(null)
    setIsModalOpen(false)
  }
  
  let notestoShow;
  if(searchQuery.trim()){
    if(currentView === 'trash'){
      notestoShow = trashedNotes.filter((note)=>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )  
    }else{
      const combinedNotes = [...activeNotes, ...archivedNotes];
      notestoShow = combinedNotes.filter((note)=>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
  }else{
    notestoShow = currentView === 'active' ? activeNotes :
                        currentView === 'archived' ? archivedNotes :
                        trashedNotes;
  }
  const sortPinnedFirst = (list) => [
  ...list.filter(n => n.isPinned),
  ...list.filter(n => !n.isPinned)
]
  notestoShow = sortPinnedFirst(notestoShow);
  // notestoShow = [...pinnedNotes, notestoShow];


  return (
    <>
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateClick={handleCreateClick}
        onCurrentViewChange = {setCurrentView}
      />
      <NotesGrid
        notes = {notestoShow}
        onEdit = {handleEditNote}
        onTrash = {trashNote}
        onRestore = {restoreNotes}
        onDeletePermanent = {deleteNotePermanently}
        onTogglePin = {togglePin}
        onToggleArchive = {toggleArchive}
      />
      <NoteModal
        open={isModalOpen}
        selectedNote={selectedNote}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </>
  )
}

export default App