import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(Boolean(auth));
  useEffect(() => auth ? onAuthStateChanged(auth, user => { setUsuario(user); setCargando(false); }) : undefined, []);
  return <AuthContext.Provider value={{ usuario, cargando }}>{children}</AuthContext.Provider>;
}
export function Privada({ children }) {
  const { usuario, cargando } = useAuth();
  if (cargando) return <p role="status">Verificando sesión…</p>;
  return usuario ? children : <Navigate replace to="/ingresar" />;
}
