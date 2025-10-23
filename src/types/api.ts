// Tipos baseados nos DTOs do backend

export interface Address {
    street: string;
    number: number;
    neighborhood: string;
    city: string;
    state: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    address: Address;
    email: string;
    perfis: any[]; // Será definido quando necessário
}

export interface Pet {
    id: number;
    name: string;
    species: string;
    gender: string;
    birthDate: string;
    size: string;
    castrationReceipt?: string;
    vaccinationReceipt?: string;
    street: string;
    number: number;
    neighborhood: string;
    city: string;
    state: string;
    health?: string;
    about?: string;
    photo1?: string;
    photo2?: string;
    photo3?: string;
    ownerId: number;
    ownerName: string;
    contactOption?: string;
    available: boolean;
    
    // Personalidade
    active?: boolean;
    goodWithPets?: boolean;
    calm?: boolean;
    goodWithKids?: boolean;
    extrovert?: boolean;
    introvert?: boolean;
}

export interface Preferences {
    id: number;
    userId: number;
    species: string;
    gender: string;
    age: string;
    size: string;
    active: boolean;
    goodWithPets: boolean;
    calm: boolean;
    goodWithKids: boolean;
    extrovert: boolean;
    introvert: boolean;
    maxDistance: number;
}

export interface Token {
    token: string;
    type: string;
}

export interface AdoptionApplication {
    id: number;
    userId: number;
    petId: number;
    status: string;
    message?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdoptionStory {
    id: number;
    userId: number;
    petId: number;
    title: string;
    content: string;
    approved: boolean;
    createdAt: string;
    updatedAt: string;
}

// Formulários para envio de dados
export interface LoginForm {
    email: string;
    password: string;
}

export interface UserForm {
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    address: Address;
    email: string;
    password: string;
}

export interface PetForm {
    name: string;
    species: string;
    gender: string;
    birthDate: string;
    size: string;
    castrationReceipt?: string;
    vaccinationReceipt?: string;
    street: string;
    number: number;
    neighborhood: string;
    city: string;
    state: string;
    health?: string;
    about?: string;
    photo1?: string;
    photo2?: string;
    photo3?: string;
    ownerId: number;
    contactOption?: string;
    available?: boolean;
}

export interface PreferencesForm {
    userId: number;
    species: string;
    gender: string;
    age: string;
    size: string;
    active: boolean;
    goodWithPets: boolean;
    calm: boolean;
    goodWithKids: boolean;
    extrovert: boolean;
    introvert: boolean;
    maxDistance: number;
}

export interface AdoptionApplicationForm {
    userId: number;
    petId: number;
    message?: string;
}

export interface AdoptionStoryForm {
    userId: number;
    petId: number;
    title: string;
    content: string;
}

export interface Personality {
    id: number;
    petId: number;
    active: boolean;
    goodWithPets: boolean;
    calm: boolean;
    goodWithKids: boolean;
    extrovert: boolean;
    introvert: boolean;
}

export interface PersonalityForm {
    petId: number;
    active: boolean;
    goodWithPets: boolean;
    calm: boolean;
    goodWithKids: boolean;
    extrovert: boolean;
    introvert: boolean;
}

// Respostas da API
export interface ApiResponse<T> {
    data?: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}