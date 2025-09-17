export type Pet = {
  id: number;
  name: string;
  species: string;
  gender: string;
  dob: string;
  size: string;
  location: {
    neighbourhood: string;
    city: string;
    state: string;
  };
  personality: string[];
  health: string;
  about: string;
  photos: string[];
  isFavorite: boolean;
}

export type PetCardProps = Pick<Pet, "id" | "name" | "dob" | "gender"> & {
  city: string
  photo: string
}

export type MyPetProps = Pick<Pet, "id" | "name"> & {
  photo: string
}

export type Order =  "normal" | "ascending" | "descending"