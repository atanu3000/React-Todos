import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo msg",
            completed: false
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggoleComplete: (id) => {},
})

export const TodoProvider = TodoContext.Provider

export const useTodo = () => {  // custom hook for maintaining todos
    return useContext(TodoContext);
}