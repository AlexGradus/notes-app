import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import NoteItem from './NoteItem';
import { Checkbox, Text, Badge, Flex } from '@mantine/core';

const NoteList = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const getTagsFromText = (text: string) => {
    const tags = text.match(/#\w+/g);
    return tags ? tags.map((tag) => tag.slice(1)) : [];
  };

  const allTags = notes.reduce((tags, note) => {
    const noteTags = getTagsFromText(note.text);
    return [...tags, ...noteTags];
  }, [] as string[]);

  const uniqueTags = Array.from(new Set(allTags));

  return (
    <div>
      <div style={{ marginTop: 16 }}>
        {uniqueTags.length > 0 ? (
          uniqueTags.map((tag) => (
            <div key={tag} style={{ display: 'inline-block', marginRight: 5 }}>
              <Flex>
                <Checkbox
                  color="dark"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                />
                <Badge color="dark" ml={3}>
                  {tag}
                </Badge>
              </Flex>

            </div>
          ))
        ) : (
          <Text>No tags</Text>
        )}
      </div>
      {notes
        .filter((note) => {
          const tags = getTagsFromText(note.text);
          return !selectedTags.length || tags.some((tag) => selectedTags.includes(tag));
        })
        .map((note) => (
          <NoteItem key={note.id} id={note.id} text={note.text} />
        ))}
    </div>
  );
};

export default NoteList;

