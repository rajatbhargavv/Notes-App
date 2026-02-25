// app containing notes logic
import React from 'react'



export default function useNotes() {
    
    const [notes, setNotes] = React.useState([]);
    const [hydrated, setHydrated] = React.useState(false);

    React.useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
    }
    setHydrated(true);
    }, []);

    React.useEffect(() => {
    if (!hydrated) return; // ⛔ prevent overwrite
    localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes, hydrated]);


    // derived notes state
    const activeNotes = notes.filter((note)=>note.status === 'active')
    const archivedNotes = notes.filter((note)=>note.status === 'archived')
    const trashedNotes = notes.filter((note)=>note.status === 'trash')
    const pinnedNotes = notes.filter((note)=>note.isPinned && note.status === 'active')

    // creating a note
    const createNote = ({title, content, color} ) =>{
        // create a notes object
        if(title.trim() === '' && content.trim() === '') return; // prevent creating empty notes
        const newNote = {
            id: crypto.randomUUID(),
            title,
            content,
            color: color || 'default',
            isPinned: false,
            status: 'active',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            deletedAt: null,
        }
        // update the state
        setNotes((prevNotes)=>[newNote, ...prevNotes])
        // persist the state to local storage
            // it will already be done because of the useEffect having notes as dependency
    }    
    const trashNote = (noteId) => {
        // move the note to trash
            // set the trash property of note to true
            setNotes((prevNotes)=>
                prevNotes.map((note)=>{
                    if(note.id !== noteId) return note
                    return{
                        ...note,
                        status: 'trash',
                        isPinned: false,
                        deletedAt: Date.now(),
                        updatedAt: Date.now()
                    }
                })
            )
    
        // update the state
            // already done by setNotes
        // persist the state to local storage
            // already changed from the useEffect 
    }    
    const updateNote = (noteId, {title, content, color}) =>{
        // get the node to update
        setNotes((prevNotes)=>
            prevNotes.map((note)=>{
                if(note.id !== noteId) return note
                if(note.status === 'trash') return note
                
                return{
                    ...note,
                    title,
                    content,
                    color,
                    updatedAt: Date.now()
                }
            })
        )
        // update the state
            // updated by the useEffect
        // persist the state to local storage
            // done by useEffect
    }
    const restoreNotes = (noteId) =>{
        // set the status to active, deletedAt to null, and updatedAt to current date-time
        setNotes((prevNotes)=>
            prevNotes.map((note)=>{
                if(note.id !== noteId) return note
                if(note.status === 'trash')
                    return {
                        ...note,
                        status: 'active',
                        deletedAt: null,
                        updatedAt: Date.now(),
                        isPinned: false
                    }
            })
        )
    }
    const deleteNotePermanently = (noteId) =>{
        // remove the note from notes table
        setNotes((prevNotes)=>
            prevNotes.filter((note)=>!(note.id === noteId && note.status === 'trash'))
        )
    }
    const togglePin = (noteId) => {
        // set the pinned to different boolean value -> pinned = !pinned
        setNotes((prevNotes)=>
            prevNotes.map((note)=>{
                if(note.id !== noteId) return note
                if(note.status !== 'active') return note
                return{
                    ...note,
                    isPinned: !note.isPinned,
                    updatedAt: Date.now()
                }
            })
        )
    }
    const toggleArchive = (noteId) => {
        setNotes(prevNotes =>
            prevNotes.map(note => {
            if (note.id !== noteId) return note
            if (note.status === 'trash') return note

            return {
                ...note,
                status: note.status === 'active' ? 'archived' : 'active',
                isPinned: false,
                updatedAt: Date.now()
            }
            })
        )
        }


    const searchNotes = (query, scope = 'active') => {
        const lowerCaseQuery = query.toLowerCase().trim()
        if(!lowerCaseQuery) return []
        const baseNotes = scope === 'trash' ? trashedNotes : [...activeNotes, ...archivedNotes]

        return baseNotes.filter((note)=>
            (note.title || '').toLowerCase().includes(lowerCaseQuery) ||
            (note.content || '').toLowerCase().includes(lowerCaseQuery)
        )   
    }

    return {
        notes,
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
        toggleArchive
    }
}