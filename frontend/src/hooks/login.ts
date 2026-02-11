import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../redux/api/user'; 
import { login as loginAction } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';


export const useLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'error' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isError, error }] = useLoginMutation();

  const handleClickShowPassword = () => setShowPassword(prev => !prev);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleCloseNotification = () => setNotification(prev => ({ ...prev, open: false }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotification({ open: false, message: '', severity: 'error' });

    if (!email) {
      setNotification({ open: true, message: 'Email requis!', severity: 'error' });
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setNotification({ open: true, message: 'S\'il vous plaît, mettez une adresse email valide!', severity: 'warning' });
      return;
    } else if (!password) {
      setNotification({ open: true, message: 'Mot de passe requis!', severity: 'error' });
      return;
    } else if (password.length < 6) {
      setNotification({ open: true, message: 'Le mot de passe doit contenir au moins 6 caractères!', severity: 'error' });
      return;
    }

    try {
      const { user, token } = await login({ email, password }).unwrap();
      if (user && token) {
        dispatch(loginAction({ user, token }));
        navigate(user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard');
      } else {
        throw new Error('Données manquantes');
      }
    } catch (err) {
      const errorMessage = isError && error ? (error as any).data?.message || 'Erreur inattendue' : 'Erreur inattendue';
      setNotification({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  return {
    email,
    password,
    showPassword,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleLogin,
    notification,
    handleCloseNotification,
  };
};
