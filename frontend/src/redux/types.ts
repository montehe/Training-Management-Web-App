
//USER
export interface User {
  _id: string;
  username: string;
  email: string;
  name?: string; 
  tel?: string;
  adresse?: string;
  fonction?: 'etudiant' | 'employer';
}
//FORMATIONS RESPONSE
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
//FORMATION
export interface Formation {
  _id: string;
  titre: string;
  description: string;
  prix: number;
  photo: string;
}

//FORM VALUES
export interface FormationFormValues {
  titre: string;
  description: string;
  prix: number;
  photo: string;
}

// REGISTRATION
export interface Registration {
  _id: string;
  userId: {
    email: string;
    tel:string;
  };
  formationId: {
    titre: string;
  };
  discountedPrice: number;
    date: string; 
}

// REGISTRATION RESPONSE
export interface RegistrationResponse {
  registrations: Registration[];
}

// Type for the mutation input
export interface DeleteRegistrationInput {
  registrationId: string;
}
