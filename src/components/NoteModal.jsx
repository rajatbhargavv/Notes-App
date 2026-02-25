import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material'
import React from 'react'

const NoteModal = ({open, selectedNote, onSubmit, onClose}) => {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [color, setColor] = React.useState('default')

  React.useEffect(()=>{
    if(selectedNote){
      setTitle(selectedNote.title)
      setContent(selectedNote.content)
      setColor(selectedNote.color)
    }else{
      setTitle('')
      setContent('')
      setColor('default')
    }
  }, [selectedNote, open])

  const handleSubmit = () => {
    const data = {title, content, color}
    onSubmit(data)
    onClose()
  }

    // Shortcut for Saving the node - Shift + Enter
  React.useEffect(()=>{
    const handleKeyDown = (e) => {
      if(!open) return;
      if(e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    }
    window.addEventListener('keydown',handleKeyDown);
    return ()=>window.removeEventListener('keydown',handleKeyDown);
  }, [open, title, content, color]);

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogContent>

        <TextField
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder='title'
          variant='standard'
          fullWidth
        />
        <TextField
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          placeholder='Take a note...'
          variant='standard'
          multiline
          fullWidth
        />
      </DialogContent>  
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default NoteModal
