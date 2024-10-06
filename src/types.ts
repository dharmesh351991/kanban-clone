// types.ts
export  interface CardProp {
    id: string;
    text: string;
    status: 'todo' | 'in-progress' | 'done';
    columnId: string;
  };
  
  export  interface Column {
    id: string;
    title: string;
    cards: CardProp[];
  }
  