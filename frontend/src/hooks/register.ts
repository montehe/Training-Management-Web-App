import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../redux/api/user'; // Adjust this import based on your actual API slice setup

export const useRegister = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const [adresse, setAdresse] = useState<string>('');
  const [fonction, setFonction] = useState<string>('');
  const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'error' });

  const navigate = useNavigate();
  const [register, { isError, error }] = useRegisterMutation(); // Adjust this to match your API call

  const handleClickShowPassword = () => setShowPassword(prev => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const handleCloseNotification = () => setNotification(prev => ({ ...prev, open: false }));

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotification({ open: false, message: '', severity: 'error' });

    if (!username || !email || !password || !confirmPassword || !tel || !adresse || !fonction) {
      setNotification({ open: true, message: 'Tous les champs sont requis!', severity: 'error' });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setNotification({ open: true, message:'S\'il vous plaît, mettez une adresse email valide!', severity: 'warning' });
      return;
    }
    if (password.length < 6) {
      setNotification({ open: true, message: 'Le mot de passe doit contenir au moins 6 caractères!', severity: 'error' });
      return;
    }
    if (password.length < 6) {
      setNotification({ open: true, message: 'Le mot de passe doit contenir au moins 6 caractères!', severity: 'error' });
      return;
    }
    
   if (password !== confirmPassword) {
      setNotification({ open: true, message: 'Les mots de passe ne correspondent pas', severity: 'error' });
      return;
    }

    try {
      await register({
        username,
        email,
        password,
        confirmPassword,
        name,
        tel,
        adresse,
        fonction
      }).unwrap();
      setNotification({ open: true, message: 'User registered successfully', severity: 'success' });
      navigate('/login');
    } catch (err) {
      console.error("Registration error:", err);
      const errorMessage = isError && error ? (error as any).data?.message || 'Unexpected error' : 'Unexpected error';
      setNotification({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'tel':
        setTel(value);
        break;
      case 'adresse':
        setAdresse(value);
        break;
      case 'fonction':
        setFonction(value);
        break;
      default:
        break;
    }
  };

  return {
    username,
    email,
    password,
    confirmPassword,
    showPassword,
    name,
    tel,
    adresse,
    fonction,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleRegister,
    notification,
    handleCloseNotification,
  };
};
