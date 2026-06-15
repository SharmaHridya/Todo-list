import { useState } from "react";
import { useTodo } from '../contexts';

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setIsTodoEditable(false);
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }

    return (
        <div
            style={{
                backgroundColor: todo.completed ? "#c6e9a7" : todo.color
            }}
            className="flex border border-black/10 rounded-2xl px-4 py-2.5 gap-x-3 shadow-sm duration-300 text-black items-center transition-all hover:shadow-md"
        >
            <input
                type="checkbox"
                className="cursor-pointer h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500 accent-green-600"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg font-medium transition-all duration-200 ${
                    isTodoEditable ? "border-black/20 px-2 bg-white/40 shadow-inner" : "border-transparent"
                } ${todo.completed ? "line-through text-black/40" : "text-gray-800"}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-xl text-sm border border-black/10 justify-center items-center bg-white/80 hover:bg-white transition-all duration-200 shadow-sm shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
                title={isTodoEditable ? "Save" : "Edit"}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-xl text-sm border border-black/10 justify-center items-center bg-white/80 hover:bg-red-50 hover:border-red-200 transition-all duration-200 shadow-sm shrink-0 hover:scale-105 active:scale-95"
                onClick={() => deleteTodo(todo.id)}
                title="Delete"
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
