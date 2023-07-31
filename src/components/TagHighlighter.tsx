import { TagHighlighterProps } from "../interfaces/interfaces";


const TagHighlighter = ({ text }: TagHighlighterProps) => {
  const parts = text.split(/(#\w+)/g);
  return (
    <div>
      {parts.map((part, index) => {
        if (part.startsWith('#')) {
          return (
            <span key={index} style={{ color: 'blue', fontWeight: 'bold' }}>
              {part}
            </span>
          );
        }
        return part;
      })}
    </div>
  );
};

export default TagHighlighter;
