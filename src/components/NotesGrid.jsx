import { Grid } from '@mui/material'
import React from 'react'
import NoteCard from './NoteCard.jsx'

const NotesGrid = ({notes, ...callbacks }) => {
  return (
    <Grid container spacing={2} padding={2} margin={1}>
      {notes.map((note)=>(
        <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
          <NoteCard note={note} {...callbacks} />
        </Grid>
      ))}
    </Grid>
  )
}

export default NotesGrid
