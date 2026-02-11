import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery, useUpdateProfileMutation } from '../redux/api/user';
import { updateProfile } from '../redux/slices/authSlice';
import { User } from '../redux/types';
import { SelectChangeEvent } from '@mui/material/Select';
export const useUserProfile = () => {
  const dispatch = useDispatch();
  const { data: user, isLoading: isFetchingProfile } = useGetProfileQuery();
  const [updateProfileMutation, { error }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState<Partial<User>>({});
  const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'error' });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        tel: user.tel,
        adresse: user.adresse,
        fonction: user.fonction,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<"etudiant" | "employer">) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification({ open: false, message: '', severity: 'error' });
    setFormErrors({}); // Reset errors

    try {
      const updatedUser = await updateProfileMutation(formData).unwrap();
      dispatch(updateProfile(updatedUser));
      setNotification({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (err) {
      if (error && 'data' in error) {
        // Extract and set error messages from backend response
        const backendErrors = (error as any).data?.errors || {};
        setFormErrors(backendErrors);
        const errorMessages = Object.values(backendErrors).join(' ');
        setNotification({ open: true, message: errorMessages || 'An unexpected error occurred', severity: 'error' });
      } else {
        // Handle any other errors
        setNotification({ open: true, message: 'An unexpected error occurred', severity: 'error' });
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return {
    user,
    isFetchingProfile,
    formData,
    formErrors,
    notification,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleCloseNotification
  };
};
