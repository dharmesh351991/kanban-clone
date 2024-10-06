// components/KanbanBoard.tsx
import React, { useState } from 'react';
import { useKanban } from '../KanbanContext';
import Column from './Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const KanbanBoard: React.FC = () => {
  const { columns, addColumn, onDragEnd } = useKanban();
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const handleAddColumn = () => {
    if (newColumnTitle) {
      addColumn(newColumnTitle);
      setNewColumnTitle('');
    }
  };

  return (
    <div className="kanban-board">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board-wrap">
          {columns.map((column) => (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="category"
                >
                  <h2>{column.title}</h2>
                  <Column key={column.id} column={column} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <div className="add-column">
        <input
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
          placeholder="New column title"
        />
        <button onClick={handleAddColumn}>Add Column</button>
      </div>
    </div>
  );
};

export default KanbanBoard;
