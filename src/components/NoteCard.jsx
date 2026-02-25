import React from "react";
import { Box, IconButton, Typography } from "@mui/material";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

const NoteCard = ({ note, ...callbacks }) => {
  const { status, isPinned, title, content } = note;

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid #ddd",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {/* ACTION BUTTONS */}
      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
        {/* ACTIVE NOTE ACTIONS */}
        {status === "active" && (
          <>
            <IconButton onClick={() => callbacks.onEdit(note)}>
              <EditIcon />
            </IconButton>

            <IconButton onClick={() => callbacks.onTogglePin(note.id)}>
              {isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
            </IconButton>

            <IconButton onClick={() => callbacks.onToggleArchive(note.id)}>
              <ArchiveIcon />
            </IconButton>

            <IconButton onClick={() => callbacks.onTrash(note.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}

        {/* ARCHIVED NOTE ACTIONS */}
        {status === "archived" && (
          <>
            <IconButton onClick={() => callbacks.onEdit(note)}>
              <EditIcon />
            </IconButton>

            <IconButton onClick={() => callbacks.onToggleArchive(note.id)}>
              <UnarchiveIcon />
            </IconButton>

            <IconButton onClick={() => callbacks.onTrash(note.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}

        {/* TRASH NOTE ACTIONS */}
        {status === "trash" && (
          <>
            <IconButton onClick={() => callbacks.onRestore(note.id)}>
              <RestoreIcon />
            </IconButton>

            <IconButton
              onClick={() => callbacks.onDeletePermanent(note.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Box>

      {/* NOTE CONTENT */}
      {title && (
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
      )}

      {content && (
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      )}
    </Box>
  );
};

export default NoteCard;