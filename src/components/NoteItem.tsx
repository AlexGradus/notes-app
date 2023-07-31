import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { editNote, deleteNote } from '../store/notesSlice';
import TagHighlighter from './TagHighlighter';
import { Button, Textarea } from '@mantine/core';
import { NoteItemProps } from '../interfaces/interfaces';


const NoteItem = ({ id, text }: NoteItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    if (editedText.trim() !== '') {
      dispatch(editNote({ id, text: editedText }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteNote(id));
  };

  return (
    <div style={{ marginBottom: 8 }}>
      {isEditing ? (
        <>
          <Textarea
            value={editedText}
            onChange={(event) => setEditedText(event.currentTarget.value)}
          />
          <Button onClick={handleEdit}
            variant="outline"
            mt={10}
            color="dark">
            Save
          </Button>
          <Button
            variant="outline"
            mt={10}
            ml={5}
            color="dark" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <TagHighlighter text={text} />
          <Button
            variant="outline"
            color="dark"
            onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button
            variant="outline"
            ml={1}
            color="red"
            onClick={handleDelete}>
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default NoteItem;



