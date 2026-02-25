import React from 'react'
import {Box, Typography, TextField, Button, IconButton} from '@mui/material'
import DehazeIcon from '@mui/icons-material/Dehaze';
const Header = ({searchQuery, onSearchChange, onCreateClick, onCurrentViewChange}) => {
  return (
    <Box
      display={'flex'}
      gap={2}
      padding={2}
      // justifyContent={'center'}
      justifyContent={'space-between'}
      alignItems={'center'}
      borderBottom='2px solid rgb(0,0,0,0.3)'
    >
      <Box display={'flex'} gap={5}>
        <DehazeIcon />
        <Typography textOverflow={'no-wrap'}>My Notes</Typography>
        <TextField
          label='Search'
          value={searchQuery}
          onChange={(e)=>onSearchChange(e.target.value)}
          size='small'
          color='text.secondary'
          variant='outlined'
          fullWidth
          sx={{maxWidth: '450px'}}
        />
      </Box>
      <Box>
        <IconButton onClick={onCreateClick} variant='contained' color='primary'>
          Create Note
        </IconButton>
      </Box>
      <Box display={'flex'} gap={2}>
        <Button onClick={()=>onCurrentViewChange('active')} variant='contained'>Active</Button>
        <Button onClick={()=>onCurrentViewChange('archived')} variant='contained'>Archived</Button>
        <Button onClick={()=>onCurrentViewChange('trash')} variant='contained'>Trash</Button>
      </Box>
    </Box>
  )
}

export default Header
