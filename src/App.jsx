import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts'
import './App.css'
import { TodoForm, ControlPanel, TodoList } from './components'

const pastelColors = [
  "#FFDFD3", // Soft Pink
  "#FFF6BD", // Soft Yellow
  "#D8F3DC", // Soft Green
  "#CAE9FF", // Soft Blue
  "#E4C1F9", // Soft Lavender
  "#FFD6E0", // Soft Rose
  "#CDEAC0", // Soft Sage
  "#F8EDEB"  // Soft Peach
]

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load todos from localStorage", error);
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = (todo) => {
    setTodos((prev) => {
      const lastColor = prev.length > 0 ? prev[0].color : null;
      const availableColors = pastelColors.filter(color => color !== lastColor);
      const color = availableColors.length > 0
        ? availableColors[Math.floor(Math.random() * availableColors.length)]
        : pastelColors[Math.floor(Math.random() * pastelColors.length)];
      return [{ id: Date.now(), ...todo, color }, ...prev];
    });
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? {
          ...prevTodo,
          completed: !prevTodo.completed
        } : prevTodo))
  }

  const completeAllTodos = () => {
    setTodos((prev) => prev.map((todo) => ({ ...todo, completed: true })))
  }

  const deleteAllTodos = () => {
    setTodos([])
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  // Filtering Logic
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.todo.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === "active") return matchesSearch && !todo.completed;
    if (filter === "completed") return matchesSearch && todo.completed;
    return matchesSearch;
  });

  return (
    <TodoProvider value={{
      todos,
      addTodo,
      deleteTodo,
      updateTodo,
      toggleComplete,
      completeAllTodos,
      deleteAllTodos,
      searchTerm,
      setSearchTerm,
      filter,
      setFilter
    }}>
      <div className="bg-linear-to-tr from-[#b8eade] to-[#e3faf4] min-h-screen py-10 px-4">
        <div className="w-full max-w-2xl mx-auto shadow-xl border border-white/20 rounded-3xl p-6 text-black bg-white/40 backdrop-blur-lg">
          <h1 className="text-3xl font-extrabold text-center mb-8 mt-2 text-gray-800 tracking-tight flex items-center justify-center gap-2">
            <span>✨</span> TaskFlow <span>✨</span>
          </h1>
          <div className="mb-6">
            <TodoForm />
          </div>
          <ControlPanel />
          <TodoList filteredTodos={filteredTodos} />
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
