// components/Column.tsx
import React, { useState } from 'react';
import Card from './Card';
import { Column as ColumnType } from '../types';
import { useKanban } from '../KanbanContext';
import { Draggable } from 'react-beautiful-dnd';

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const { addCard } = useKanban();
  const [newCardText, setNewCardText] = useState('');

  const handleAddCard = () => {
    if (newCardText) {
      addCard(column.id, newCardText);
      setNewCardText('');
    }
  };

  return (
    <div className="column">
      <div className="myCards">
        {column.cards.map((card, index) => (
          <Draggable key={card.id} draggableId={card.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  userSelect: 'none',
                  padding: '16px',
                  marginBottom: '8px',
                  backgroundColor: snapshot.isDragging ? '#f4f4f4' : 'white',
                  border: '1px solid black',
                  ...provided.draggableProps.style,
                }}
              >
                <Card key={card.id} card={card} columnId={column.id} />
              </div>
            )}
          </Draggable>
        ))}
      </div>
      <div className="add-card">
        <input
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          placeholder="New card text"
        />
        <button onClick={handleAddCard}>Add Card</button>
      </div>
    </div>
  );
};

export default Column;
