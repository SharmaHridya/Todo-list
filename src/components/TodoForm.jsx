import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoForm() {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!todo.trim()) return
        addTodo({ todo: todo.trim(), completed: false })
        setTodo("")
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <input
                type="text"
                placeholder="What needs to be done?"
                className="w-full bg-white/70 border border-black/10 rounded-2xl px-4 py-2.5 outline-none transition-all duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 text-gray-800 placeholder-gray-400 font-medium"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button 
                type="submit" 
                className="rounded-2xl px-6 py-2.5 bg-green-600 text-white font-semibold shadow-md transition-all duration-200 hover:bg-green-700 hover:shadow-lg active:scale-95 shrink-0 flex items-center justify-center gap-1"
            >
                <span>+</span> Add
            </button>
        </form>
    );
}

export default TodoForm;
