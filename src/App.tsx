// App.tsx
import React from 'react';
import { KanbanProvider } from './KanbanContext';
import KanbanBoard from './components/KanbanBoard';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <KanbanProvider>
      <div className="App">
        <h1>Kanban Board</h1>
        <KanbanBoard />
      </div>
    </KanbanProvider>
  );
};

export default App;
