export type Pet = {
  id: number;
  name: string;
  species: string;
  gender: string;
  dob: string;
  size: string;
  neighbourhood: string;
  city: string;
  personality: string[];
  health: string;
  about: string;
  photos: string[];
  isFavorite: boolean;
}

export type PetCardProps = Pick<Pet, "id" | "name" | "dob" | "gender" | "city"> & {
  photo: string
}