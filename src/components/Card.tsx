// components/Card.tsx
import React, { useState } from 'react';
import { CardProp as CardType } from '../types';
import { useKanban } from '../KanbanContext';

interface CardProps {
  card: CardType;
  columnId: string;
}

const Card: React.FC<CardProps> = ({ card, columnId }) => {
  const { editCard, deleteCard } = useKanban();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(card.text);

  const handleSave = () => {
    editCard(columnId, card.id, text);
    setIsEditing(false);
  };

  return (
    <div className="taskCard">
      {isEditing ? (
        <>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={handleSave} className='updateBtn'>Save</button>
        </>
      ) : (
        <>
          <p onClick={() => setIsEditing(true)}>{card.text}</p>
          <button onClick={() => deleteCard(columnId, card.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Card;
