# Trello Kanban Demo Assignment

## Overview

This project is a simple **Kanban Board demo** built with **React, TypeScript, and Context API**. The app supports core Kanban functionalities such as creating columns and cards, drag-and-drop functionality, moving cards between columns, editing and deleting cards, and persisting state across components.


# Project Structure

 ```c# src/
│
├── components/
│   ├── Card.tsx
│   ├── Column.tsx
│   └── KanbanBoard.tsx
│
├── styles/
│   └── global.css
│
├── KanbanContext.tsx
├── types.ts
└── App.tsx
```

# Data Structure used

We used an array of `Column` objects where each `Column` contains an array of `Card` objects. Each card has an `id`, `text`, `status`, and `columnId` to identify which column it belongs to.

The project utilizes structured interfaces to manage data effectively:

```typescript
interface Column {
  id: string;
  title: string;
  cards: CardProp[];
}

interface CardProp {
  id: string;
  text: string;
  status: 'todo' | 'in-progress' | 'done';
  columnId: string;
}
```

# Featrue

- **Drag and Drop:** Use of `react-beautiful-dnd` to drag and drop cards between columns.
- **Card Management:** Add, edit, move, and delete cards within columns.
- **Context API:** Manage state globally for columns and cards.
- **TypeScript Integration:** Typed data structure and components to ensure type safety.

# Dependencies

Here are the key dependencies used in this project:

```json
"dependencies": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-beautiful-dnd": "^13.1.1",
  "typescript": "^4.9.5"
},
"devDependencies": {
  "@types/react": "^18.3.11",
  "@types/react-beautiful-dnd": "^13.1.8"
}
```

# How to Run
- Clone the repository URL : `https://dharmesh351991@github.com/dharmesh351991/kanban-clone.git`.
- Install dependencies with `npm install`.
- Run the app with `npm start`.
- The app should now be running on `http://localhost:3000`.


