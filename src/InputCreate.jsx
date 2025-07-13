import React, { useState } from 'react';

const InputCreate = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!title.trim()) {
      setMessage('El título no puede estar vacío.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      if (response.ok) {
        setMessage('Tarea creada correctamente.');
        setTitle('');
      } else {
        setMessage('Error al crear la tarea.');
      }
    } catch (error) {
      setMessage('Error de conexión con el servidor.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400 }}>
      <input
        type="text"
        placeholder="Nueva tarea"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button type="submit">Crear tarea</button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default InputCreate;
