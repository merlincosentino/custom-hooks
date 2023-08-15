import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/TodoReducer";

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = () => {
    
    const [todos, dispatch] = useReducer(todoReducer, [], init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])
    

    const handleTodo = ( todo ) => {
        const action = {
            type: 'Add Todo',
            payload: todo
        }

        dispatch(action);
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: 'Remove Todo',
            payload: id
        });
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: 'Toggle Todo',
            payload: id
        });
    }

    return {
        todos,
        todosCount: todos.length,
        todosPendingCount: todos.filter(todo => !todo.done).length,
        handleTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}
