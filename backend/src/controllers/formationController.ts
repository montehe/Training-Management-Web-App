import { Request, Response } from 'express';
import Formation from '../models/formation';

// Add a new Formation
export const addFormation = async (req: Request, res: Response): Promise<void> => {
  const { titre, description, prix , photo} = req.body;

  if ( !titre || !description || !prix || !photo) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  try {
    const newFormation = new Formation({
      titre,
      description,
      prix,
      photo
    });

    const savedFormation = await newFormation.save();
    res.status(201).json(savedFormation);
  } catch (error) {
    res.status(500).json({ message: 'Error adding formation', error });
  }
};

// Update a Formation
export const updateFormation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { titre, description, prix, photo } = req.body;

  try {
    const updatedFormation = await Formation.findByIdAndUpdate(
      id,
      { titre, description, prix, photo },
      { new: true, runValidators: true }
    );

    if (!updatedFormation) {
      res.status(404).json({ message: 'Formation not found' });
      return;
    }

    res.status(200).json(updatedFormation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating formation', error });
  }
};

// Delete a Formation
export const deleteFormation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedFormation = await Formation.findByIdAndDelete(id);

    if (!deletedFormation) {
      res.status(404).json({ message: 'Formation not found' });
      return;
    }

    res.status(200).json({ message: 'Formation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting formation', error });
  }
};

// Fetch all Formations
export const getAllFormations = async (req: Request, res: Response): Promise<void> => {
  try {
    const formations = await Formation.find();
    res.status(200).json(formations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching formations', error });
  }
};

// Search Formations
export const searchFormations = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;

  if (!query) {
    res.status(400).json({ message: 'Search query is required' });
    return;
  }

  try {
    const formations = await Formation.find({
      $or: [
        { titre: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(formations);
  } catch (error) {
    res.status(500).json({ message: 'Error searching formations', error });
  }
};
//GET FORMATION BYID
export const getFormationById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const formation = await Formation.findById(id);

    if (!formation) {
      res.status(404).json({ message: 'Formation not found' });
      return;
    }

    res.status(200).json(formation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching formation', error });
  }
};