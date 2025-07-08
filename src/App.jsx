import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './context'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

function App() {
  const [todos, setTodos] = useState([])

  const particlesInit = async (main) => {
    await loadFull(main)
  }

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updatedTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    )
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updatedTodo, deleteTodo, toggleComplete }}>
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen py-8 relative overflow-hidden">
        {/* Floating Grid Pattern */}
        <div className="absolute inset-0 opacity-10 -z-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Animated Gradient Circles */}
        <div className="absolute -top-64 -left-64 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-violet-600/20 to-purple-600/20 -z-10 animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute -bottom-96 -right-96 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 -z-10 animate-[spin_25s_linear_infinite]"></div>
        
        {/* Particles Background */}
        <div className="absolute inset-0 -z-0 opacity-70">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 100,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: ["#3a86ff", "#8338ec", "#ff006e", "#fb5607", "#ffbe0b"],
                },
                links: {
                  color: "#64748b",
                  distance: 150,
                  enable: true,
                  opacity: 0.4,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 1.5,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 60,
                },
                opacity: {
                  value: 0.7,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 4 },
                },
              },
              detectRetina: true,
            }}
          />
        </div>

        {/* Floating Stars */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/80 animate-pulse"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                opacity: Math.random() * 0.5 + 0.3
              }}
            />
          ))}
        </div>

        <div className="w-full max-w-2xl mx-auto rounded-lg px-4 py-6 text-white relative z-10 backdrop-blur-sm bg-white/10 border border-white/10 shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-8 mt-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Task Manager
          </h1>
          <div className="mb-6">
            <TodoForm />
          </div>
          
          {todos.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-300">No tasks yet</h3>
              <p className="text-gray-500">Add your first task to get started</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-6 text-center text-sm text-gray-400">
            {todos.length > 0 && (
              <p>{todos.filter(t => t.completed).length} of {todos.length} tasks completed</p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App