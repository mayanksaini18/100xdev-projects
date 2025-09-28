import { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const API = 'http://localhost:3000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);

  // Load todos from the server when the component mounts
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to load todos:", error);
    }
  };

  const handleAddTodo = async (text) => {
    try {
      await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      loadTodos(); // Refresh the list
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: 'PUT' });
      loadTodos(); // Refresh the list
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      loadTodos(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div>
      <h1>My Todo App</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}

export default App;