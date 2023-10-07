import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        // setTodos({ id: Date.now(), ...todo }, ...todos);
        setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
    };

    const updateTodo = (id, todo) => {
        setTodos((prev) =>
            prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
        );
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
    };

    const toggoleComplete = (id) => {
        setTodos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id
                    ? { ...prevTodo, completed: !prevTodo.completed }
                    : prevTodo
            )
        );
    };

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"));
        if (todos && todos.length > 0) {
            setTodos(todos);
        }
        console.log(todos);
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoProvider
            value={{ todos, addTodo, updateTodo, deleteTodo, toggoleComplete }}
        >
            <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">
                        Manage Your Todos
                    </h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-col gap-y-3">
                        {todos.length > 0 ? (
                            todos.map((todo) => (
                                <TodoItem key={todo.id} todo={todo} />
                            ))
                        ) : (
                            <div className="flex justify-center items-center min-h-[50vh]">
                                <h3 className="text-xl text-gray-400 ">
                                    Add your first Todo now
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </TodoProvider>
    );
}

export default App;
