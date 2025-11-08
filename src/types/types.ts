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
  distance?: number
}

export type MyPetProps = Pick<Pet, "id" | "name"> & {
  photo: string
}

export type Order =  "normal" | "ascending" | "descending"

export type Story = {
  image: string
  human: string
  pet: string
  description: string
}

export type Member = {
  name: string;
  githubUrl: string;
  linkedinUrl: string;
  image: string;
  description: string;
  stage: string;
}

export type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string
  estado: string
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi:string;
}