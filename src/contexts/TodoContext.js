import { createContext,useContext } from "react";

export const TodoContext = createContext({
    todos:
    [
        {
            id:1,
            todo:"todo msg",
            completed:false,
            color:"#FFDFD3"
        }
    ],
    addTodo: (todo) => {},
    deleteTodo: (id) => {},
    updateTodo: (id, todo) => {},
    toggleComplete: (id) => {},
    completeAllTodos: () => {},
    deleteAllTodos: () => {},
    searchTerm: "",
    setSearchTerm: () => {},
    filter: "all",
    setFilter: () => {}
})

export const useTodo=()=>{
    return useContext(TodoContext)
}

export const TodoProvider= TodoContext.Provider