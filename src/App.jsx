import { useState } from 'react'
import './App.css'
import { FaPlus, FaPencilAlt, FaTrash } from 'react-icons/fa';


function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Function to add a new task
  const addTask = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { id: todos.length + 1, text: input }]);
      setInput('');
    }
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Function to handle editing task
  const editTask = (id, newText) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  // Function to handle updating the editing text
  const handleEditingTextChange = (e) => {
    setEditingText(e.target.value);
  };

  // Function to handle saving edits
  const saveEdit = (id) => {
    editTask(id, editingText);
    setEditingId(null);
    setEditingText('');
  };

  // Function to handle canceling edits
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-custom-background bg-center bg-cover'>
      <div className='bg-orange-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4'>
        <h1 className='text-5xl font-bold text-center text-orange-600 mb-4'>Todo App</h1>
        <div className='flex'>
          <input
            type="text"
            placeholder='Add to todo'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='py-2 px-4 border rounded w-full focus:outline-none mr-2'
          />
          <button
            onClick={addTask}
            className='bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded'
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className='bg-orange-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4'>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className='flex items-center justify-between bg-white p-3 rounded shadow-md mb-3'>
              {editingId === todo.id ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editingText}
                    onChange={handleEditingTextChange}
                    className='py-2 px-4 border rounded w-full focus:outline-none mr-2'
                  />
                  <div>
                    <button onClick={() => saveEdit(todo.id)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                      Save
                    </button>
                    <button onClick={cancelEdit} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-2">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <span className='text-lg'>{todo.text}</span>
              )}
              <div>
                {editingId !== todo.id && (
                  <>
                    <button onClick={() => setEditingId(todo.id)} className='mr-2 p-2 bg-gradient-to-r bg-orange-500 hover:bg-orange-600 text-white rounded'>
                      <FaPencilAlt />
                    </button>
                    <button onClick={() => deleteTask(todo.id)} className='p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded'>
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center absolute bottom-4">
        <p className="text-lg mt-2  text-white">✨ Muhammad Raihan Zulfi - 2602229673</p>
      </div>
    </div>
  );
}

export default App;
