import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Formation, FormationFormValues } from '../../../../redux/types';
import {
  StyledModal,
  ModalContent,
  StyledTextField,
  ActionButtonsContainer,
  SubmitButton,
  CancelButton
} from '../../../../styles/FormationModal';

interface AddFormationModalProps {
  open: boolean;
  onClose: () => void;
  onAddFormation: (formation: Formation) => void;
  onUpdateFormation?: (formation: Formation) => void; 
  existingFormation?: Formation | null; 
}

// Define Yup schema 
const schema = Yup.object().shape({
  titre: Yup.string().required('Titre est obligatoire'),
  description: Yup.string().required('Description est obligatoire'),
  prix: Yup.number().required('Prix est obligatoire').positive('Prix doit être positif'),
  photo: Yup.string().url('URL invalide').required('URL Photo est obligatoire'),
});

const AddFormationModal: React.FC<AddFormationModalProps> = ({ open, onClose, onAddFormation, onUpdateFormation, existingFormation }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormationFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      titre: '',
      description: '',
      prix: 0,
      photo: '',
    }
  });

  useEffect(() => {
    if (existingFormation) {
      reset({
        titre: existingFormation.titre,
        description: existingFormation.description,
        prix: existingFormation.prix,
        photo: existingFormation.photo,
      });
    } else {
      reset({
        titre: '',
        description: '',
        prix: 0,
        photo: '',
      });
    }
  }, [existingFormation, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: FormationFormValues) => {
    const formation: Formation = {
      _id: existingFormation ? existingFormation._id : new Date().toISOString(),
      ...data,
    };

    if (existingFormation) {
      if (onUpdateFormation) {
        onUpdateFormation(formation);
      }
    } else {
      onAddFormation(formation);
    }

    handleClose();
  };

  return (
    <StyledModal open={open} onClose={handleClose}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="titre"
            control={control}
            render={({ field }) => (
              <StyledTextField
                label="Title"
                fullWidth
                {...field}
                error={!!errors.titre}
                helperText={errors.titre?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <StyledTextField
                label="Description"
                fullWidth
                {...field}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
          <Controller
            name="prix"
            control={control}
            render={({ field }) => (
              <StyledTextField
                label="Price"
                type="number"
                fullWidth
                {...field}
                error={!!errors.prix}
                helperText={errors.prix?.message}
              />
            )}
          />
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <StyledTextField
                label="Photo URL"
                fullWidth
                {...field}
                error={!!errors.photo}
                helperText={errors.photo?.message}
              />
            )}
          />
          <ActionButtonsContainer>
            <SubmitButton type="submit" variant="contained" color="primary">
              {existingFormation ? 'Update Formation' : 'Add Formation'}
            </SubmitButton>
            <CancelButton variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </CancelButton>
          </ActionButtonsContainer>
        </form>
      </ModalContent>
    </StyledModal>
  );
};

export default AddFormationModal;
