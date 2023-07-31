import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { fetchNotes } from './store/notesSlice';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { Title } from '@mantine/core';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <div style={{ padding: 20 }}>
      <Title >Notes App</Title>
      <NoteForm />
      <NoteList />
    </div>
  );
};

export default App;

