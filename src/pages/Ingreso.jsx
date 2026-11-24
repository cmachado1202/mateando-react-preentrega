import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import { auth } from '../firebase';
export default function Ingreso() {
  const { usuario } = useAuth();
  const [registro, setRegistro] = useState(false);
  const [error, setError] = useState('');
  const [ocupado, setOcupado] = useState(false);
  if (usuario) return <Navigate to="/gestion" replace />;
  async function enviar(e) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    setOcupado(true); setError('');
    try {
      const autenticar = registro ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
      await autenticar(auth, datos.get('email'), datos.get('password'));
    } catch { setError(registro ? 'No se pudo crear la cuenta. Revisá el correo y la contraseña.' : 'No se pudo ingresar. Revisá los datos y la conexión.'); }
    finally { setOcupado(false); }
  }
  return <section className="seccion"><h1>{registro ? 'Crear cuenta' : 'Ingresar'}</h1>
    {!auth && <p role="status">El acceso estará disponible cuando se conecte Firebase.</p>}
    <form onSubmit={enviar}><label>Correo electrónico<input name="email" type="email" required autoComplete="email" /></label>
    <label>Contraseña<input name="password" type="password" required minLength={6} autoComplete={registro ? 'new-password' : 'current-password'} /></label>
    <button className="boton" disabled={!auth || ocupado}>{registro ? 'Registrarme' : 'Ingresar'}</button></form>
    <button onClick={() => { setRegistro(!registro); setError(''); }}>{registro ? 'Ya tengo cuenta' : 'Crear una cuenta'}</button>
    {error && <p role="alert">{error}</p>}</section>;
}
