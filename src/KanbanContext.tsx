// context/KanbanContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { CardProp, Column } from './types';

interface KanbanContextProps {
  columns: Column[];
  addCard: (columnId: string, text: string) => void;
  editCard: (columnId: string, cardId: string, text: string) => void;
  deleteCard: (columnId: string, cardId: string) => void;
  moveCard: (fromColumnId: string, toColumnId: string, cardId: string) => void;
  addColumn: (title: string) => void;
  onDragEnd: (result: any) => void;
}

const KanbanContext = createContext<KanbanContextProps | undefined>(undefined);

const dummyData: Column[] = [
  {
    id: '1',
    title: 'To Do',
    cards: [{ id: 'c1', text: 'Learn React', status: 'todo', columnId: '1' }] 
  },
  {
    id: '2',
    title: 'In Progress',
    cards: [
      { id: 'c2', text: 'Build Kanban App', status: 'in-progress', columnId: '2' },
      { id: 'c21', text: 'Build Kanban App New', status: 'in-progress', columnId: '2' }
    ]
  },
  {
    id: '3',
    title: 'Done',
    cards: [{ id: 'c3', text: 'Understand TypeScript', status: 'done', columnId: '3' }]
  }
];

export const KanbanProvider = ({ children }: { children: ReactNode }) => {
  const [columns, setColumns] = useState<Column[]>(dummyData);

  const addCard = (columnId: string, text: string) => {
    const newCard: CardProp = { id: Date.now().toString(), text, status: 'todo', columnId };
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
      )
    );
  };

  const editCard = (columnId: string, cardId: string, text: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((card) =>
                card.id === cardId ? { ...card, text } : card
              )
            }
          : col
      )
    );
  };

  const deleteCard = (columnId: string, cardId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((card) => card.id !== cardId) }
          : col
      )
    );
  };

  const moveCard = (fromColumnId: string, toColumnId: string, cardId: string) => {
    const cardToMove = columns
      .find((col) => col.id === fromColumnId)
      ?.cards.find((card) => card.id === cardId);

    if (cardToMove) {
      setColumns((prevColumns) =>
        prevColumns.map((col) => {
          if (col.id === fromColumnId) {
            return { ...col, cards: col.cards.filter((card) => card.id !== cardId) };
          } else if (col.id === toColumnId) {
            return { ...col, cards: [...col.cards, cardToMove] };
          }
          return col;
        })
      );
    }
  };

  const addColumn = (title: string) => {
    const newColumn: Column = {
      id: Date.now().toString(),
      title,
      cards: []
    };
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
  
    // If there's no destination, return early
    if (!destination) return;
  
    // If the card is dropped in the same place, return early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
  
    const sourceCol = columns.find(col => col.id === source.droppableId);
    const destCol = columns.find(col => col.id === destination.droppableId);
  
    if (sourceCol && destCol) {
      const sourceCards = [...sourceCol.cards];
      const [movedCard] = sourceCards.splice(source.index, 1); // Remove card from source
  
      // Check if it's the same column
      if (sourceCol === destCol) {
        // Reorder cards in the same column
        sourceCards.splice(destination.index, 0, movedCard);
        setColumns((prevColumns) =>
          prevColumns.map((col) =>
            col.id === source.droppableId ? { ...col, cards: sourceCards } : col
          )
        );
      } else {
        // Move card to a different column
        const destCards = [...destCol.cards];
        destCards.splice(destination.index, 0, movedCard); // Add card to destination
  
        setColumns((prevColumns) =>
          prevColumns.map((col) => {
            if (col.id === source.droppableId) {
              return { ...col, cards: sourceCards };
            }
            if (col.id === destination.droppableId) {
              return { ...col, cards: destCards };
            }
            return col;
          })
        );
      }
    }
  };
  // const onDragEnd = (result: any) => {
  //   const { source, destination } = result;

  //   if (!destination) return;

  //   const sourceCol = columns.find(col => col.id === source.droppableId);
  //   const destCol = columns.find(col => col.id === destination.droppableId);
    
  //   if (sourceCol && destCol) {
  //     const sourceCards = [...sourceCol.cards];
  //     const [movedCard] = sourceCards.splice(source.index, 1);
  //     const destCards = [...destCol.cards];

  //     destCards.splice(destination.index, 0, movedCard);

  //     setColumns((prevColumns) =>
  //       prevColumns.map(col => {
  //         if (col.id === source.droppableId) {
  //           return { ...col, cards: sourceCards };
  //         }
  //         if (col.id === destination.droppableId) {
  //           return { ...col, cards: destCards };
  //         }
  //         return col;
  //       })
  //     );
  //   }
  // };

  return (
    <KanbanContext.Provider value={{ columns, addCard, editCard, deleteCard, moveCard, addColumn, onDragEnd }}>
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
};
