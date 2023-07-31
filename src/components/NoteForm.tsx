import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addNote } from '../store/notesSlice';
import { Button, Textarea } from '@mantine/core';

const NoteForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [noteText, setNoteText] = useState('');

  const handleSubmit = () => {
    if (noteText.trim() !== '') {
      dispatch(addNote(noteText));
      setNoteText('');
    }
  };

  return (
    <div>
      <Textarea
        placeholder="Your note"
        value={noteText}
        onChange={(event) => setNoteText(event.currentTarget.value)} />
      <Button
        variant="outline"
        mt={10}
        color="dark"
        onClick={handleSubmit}>Add Note</Button>
    </div>
  );
};

export default NoteForm;


