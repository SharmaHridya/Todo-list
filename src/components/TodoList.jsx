import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ filteredTodos }) {
    if (filteredTodos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-white/40 border border-white/20 rounded-2xl text-center shadow-inner transition-all duration-300">
                <span className="text-4xl mb-3 animate-bounce">📝</span>
                <p className="text-gray-500 font-medium">No todos found matching your criteria.</p>
                <p className="text-gray-400 text-xs mt-1">Try adding a new todo or clearing filters.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 w-full transition-all duration-300">
            {filteredTodos.map((todo) => (
                <div key={todo.id} className="w-full transform transition-all duration-300 hover:-translate-y-0.5">
                    <TodoItem todo={todo} />
                </div>
            ))}
        </div>
    );
}

export default TodoList;
