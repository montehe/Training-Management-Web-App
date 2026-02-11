import { Request, Response } from 'express';
import Registration from '../models/registration';
import User from '../models/User';
import Formation from '../models/formation';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// Add a new registration
export const addRegistration = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const { formationId } = req.body;

  if (!formationId) {
    res.status(400).json({ message: 'Formation ID is required' });
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.role === 'admin') {
      res.status(403).json({ message: 'Admins cannot register for formations' });
      return;
    }

    const formation = await Formation.findById(formationId);

    if (!formation) {
      res.status(404).json({ message: 'Formation not found' });
      return;
    }

    // Calculate discounted price
    let discountedPrice = formation.prix;
    if (user.fonction === 'etudiant') {
      discountedPrice = formation.prix * 0.9; 
    } 

    const newRegistration = new Registration({
      userId,
      formationId,
      discountedPrice, 
    });

    const savedRegistration = await newRegistration.save();
    res.status(201).json({ ...savedRegistration.toObject(), discountedPrice });
  } catch (error) {
    res.status(500).json({ message: 'Error adding registration', error });
  }
};

// Récupérer toutes les inscriptions
export const getAllRegistrations = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const registrations = await Registration.find()
      .populate({
        path: 'userId',
        select: 'email tel',
      })
      .populate({
        path: 'formationId',
        select: 'titre',
      });

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations', error });
  }
};

//GET USER 
export const getUserRegistrations = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const registrations = await Registration.find({ userId }).populate('formationId', 'titre');
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations', error });
  }
};
//DELEYE
export const deleteRegistration = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; 

  if (!id) {
    res.status(400).json({ message: 'Registration ID is required' });
    return;
  }

  try {
    const result = await Registration.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Registration not found' });
      return;
    }

    res.status(200).json({ message: 'Registration deleted successfully' });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ message: 'Error deleting registration' });
  }
};

// Search registrations by formation title
export const searchRegistrationsByTitle = async (req: Request, res: Response): Promise<void> => {
  const { titre} = req.query;

  if (!titre || typeof titre !== 'string') {
    res.status(400).json({ message: 'Title query parameter is required' });
    return;
  }

  try {
    const formations = await Formation.find({ titre: new RegExp(titre, 'i') }); 

    if (!formations.length) {
      res.status(200).json([]); 
      return;
    }

    const formationIds = formations.map(f => f._id);

    const registrations = await Registration.find({ formationId: { $in: formationIds } })
      .populate({ path: 'userId', select: 'email' })
      .populate({ path: 'formationId', select: 'titre' });

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Error searching registrations', error });
  }
};
