import type { FormErrors } from "@/hooks/useForm";

const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

export type Species = 'cão' | 'gato' | 'no-preference';
export type Gender = 'male' | 'female' | 'no-preference';
export type Size = 'small' | 'medium' | 'large' | 'no-preference';
export type Age = 'filhote' | 'jovem' | 'adulto' | 'idoso' | 'no-preference';

export type AdoptionPreferencesData = {
    species: Species | '';
    gender: Gender | '';
    size: Size | '';
    age: Age | '';
    personality: { [key: string]: boolean };
};

export type RegistrationStep1Data = {
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
};

export type RegistrationStep2Data = {
    species: Species | '';
    gender: Gender | '';
    size: Size | '';
    age: Age | '';
    personality: { [key: string]: boolean };
};

export type PetRegistrationData = {
    name: string;
    species: string;
    gender: Gender;
    dob: string;
    size: Size;
    petAddress: string;
    petNumber: string;
    petNeighborhood: string;
    petCity: string;
    petState: string;
    health: string;
    about: string;
    castrationReceipt: File | null;
    vaccinationReceipt: File | null;
    personality: { [key: string]: boolean };
    photo1: File | null;
    photo2: File | null;
    photo3: File | null;
    contactOption: string;
    latitude: number | null;
    longitude: number | null;
};

export interface PasswordChangeData {
    currentPassword: string;
    newPassword: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginErrors {
    email?: string;
    password?: string;
}

// Simulação de tipos de dados para o formulário de história
export interface IStoryData {
    nome: string;
    nomePet: string;
    historia: string;
    foto: File | null;
}

// validações específicas para o formulário de registro do pet
export function validatePetBirthDate(dateStr: string) {
    if (!dateStr) return "Data de nascimento é obrigatória.";
    const birthDate = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (birthDate > today) {
        return "A data não pode ser no futuro.";
    }
    return undefined;
}

export function validateFile(file: File | null, fieldName: string) {
    if (!file) return `${fieldName} é obrigatório.`;
    return undefined;
}

export function validateName(name: string, fieldName: string = "Nome") {
    if (!name) return `${fieldName} é obrigatório.`;
    if (!nameRegex.test(name)) return `${fieldName} deve conter apenas letras e espaços.`;
    return undefined;
}

export function validateEmail(email: string) {
    if (!email) return "E-mail é obrigatório.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Formato de e-mail inválido.";
    return undefined;
}

export function validatePhone(phone: string) {
    const phoneDigits = phone.replace(/\D/g, '');
    if (!phone) return "Telefone é obrigatório.";
    if (phoneDigits.length < 10 || phoneDigits.length > 11) return "O telefone deve ter 10 ou 11 dígitos.";
    return undefined;
}

export function validateBirthDate(birthDateStr: string) {
    if (!birthDateStr) return "Data de nascimento é obrigatória.";
    const birthDate = new Date(birthDateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (birthDate > today) {
        return "A data não pode ser no futuro.";
    }
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())))) {
        return "Você precisa ser maior de 18 anos.";
    }
    return undefined;
}

export function validatePassword(password: string) {
    if (!password) return "Senha é obrigatória.";
    if (
        password.length < 8 || !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) || !/\d/.test(password) ||
        !/[^A-Za-z0-9]/.test(password)
    ) {
        return "Deve conter 8+ caracteres, maiúscula, minúscula, número e símbolo.";
    }
    return undefined;
}

// Confirma se a senha e a confirmação coincidem
export function validateConfirmPassword(password: string, confirmPassword: string) {
    if (!confirmPassword) return "Confirmação é obrigatória.";
    if (password && password !== confirmPassword) return "As senhas não coincidem.";
    return undefined;
}

export function validateRequiredField(fieldValue: string, fieldName: string) {
    if (!fieldValue || fieldValue.trim() === '') return `${fieldName} é obrigatório.`;
    return undefined;
}

// Valida os dados do formulário de compartilhar história
export const validateShareStory = (formData: IStoryData): FormErrors<IStoryData> => {
    const errors: FormErrors<IStoryData> = {};

    const nameError = validateName(formData.nome, "Este campo");
    if (nameError) { errors.nome = nameError; }

    const petNameError = validateName(formData.nomePet, "Este campo");
    if (petNameError) { errors.nomePet = petNameError; }

    const storyError = validateRequiredField(formData.historia, "O campo história");
    if (storyError) { errors.historia = storyError; }

    const fileError = validateFile(formData.foto, "O campo foto");
    if (fileError) { errors.foto = fileError; }

    return errors;
};


export const validatePasswordChange = (data: PasswordChangeData) => {
    const errors: Partial<PasswordChangeData> = {};

    // Lógica de validação da senha atual (simulada)
    const FAKE_CORRECT_PASSWORD = "senha123";
    if (!data.currentPassword) {
        errors.currentPassword = "A senha atual é obrigatória.";
    } else if (data.currentPassword !== FAKE_CORRECT_PASSWORD) {
        errors.currentPassword = "A senha atual está incorreta.";
    }

    // Reutiliza a validação de força da nova senha
    const passwordStrengthError = validatePassword(data.newPassword);
    if (passwordStrengthError) {
        errors.newPassword = passwordStrengthError;
    }

    return errors;
};

// Valida os dados de login - apenas validação de formato, autenticação via backend
export function validateLogin(data: LoginData): LoginErrors {
    const errors: LoginErrors = {};

    // Validação apenas de formato - autenticação será feita pelo backend
    if (!data.email) {
        errors.email = "E-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Formato de e-mail inválido.";
    }

    if (!data.password) {
        errors.password = "Senha é obrigatória.";
    }

    return errors;
}

// Valida os dados das preferências de adoção
export const validateAdoptionPreferences = (adoptionData: AdoptionPreferencesData) => {
    const errors: { [key: string]: string } = {};
    const validationMap = {
        species: "espécie",
        gender: "sexo",
        size: "porte",
        age: "idade",
    };

    (Object.keys(validationMap) as (keyof typeof validationMap)[]).forEach(key => {
        const value = adoptionData[key as keyof typeof adoptionData];
        if (!value) {
            errors[key] = `Por favor, selecione uma opção de ${validationMap[key]}.`;
        }
    });

    const isAnyPersonalityChecked = Object.values(adoptionData.personality).some(value => value === true);
    if (!isAnyPersonalityChecked) {
        errors.personality = "Selecione ao menos uma característica de personalidade.";
    }

    return errors;
};

// Valida os dados do primeiro passo do registro (informações pessoais)
export const validateRegistrationStep1 = (formData: RegistrationStep1Data) => {
    const errors: { [key: string]: string } = {};
    const validations = {
        firstName: validateName(formData.firstName, "Nome"),
        lastName: validateName(formData.lastName, "Sobrenome"),
        birthDate: validateBirthDate(formData.birthDate),
        phone: validatePhone(formData.phone),
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
        confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
        address: validateRequiredField(formData.address, "Endereço"),
        number: validateRequiredField(formData.number, "Número"),
        neighborhood: validateRequiredField(formData.neighborhood, "Bairro"),
        city: validateRequiredField(formData.city, "Cidade"),
        state: validateRequiredField(formData.state, "Estado"),
    };
    for (const [key, value] of Object.entries(validations)) {
        if (value) errors[key] = value;
    }
    return errors;
};

// Valida os dados do segundo passo do registro (preferências de adoção)
export const validateRegistrationStep2 = (formData: RegistrationStep2Data) => {
    const errors: { [key: string]: string } = {};
    if (!formData.species) errors.species = "Por favor, selecione uma espécie.";
    if (!formData.gender) errors.gender = "Por favor, selecione um gênero.";
    if (!formData.age) errors.age = "Por favor, selecione uma faixa de idade.";
    if (!formData.size) errors.size = "Por favor, selecione um porte.";

    const isAnyPersonalityChecked = Object.values(formData.personality).some(value => value === true);
    if (!isAnyPersonalityChecked) {
        errors.personality = "Selecione ao menos uma característica de personalidade.";
    }

    return errors;
};

// Valida os dados do registro do pet
export const validatePetRegistration = (formData: PetRegistrationData): Partial<Record<keyof PetRegistrationData, string>> => {
    const errors: Partial<Record<keyof PetRegistrationData, string>> = {};

    const nameError = validateName(formData.name, "O nome do pet");
    if (nameError) errors.name = nameError;

    if (!formData.species) errors.species = "Por favor, selecione uma espécie.";
    if (!formData.gender) errors.gender = "Por favor, selecione um gênero.";
    if (!formData.size) errors.size = "Por favor, selecione um porte.";

    const dobError = validatePetBirthDate(formData.dob);
    if (dobError) errors.dob = dobError;

    const addressError = validateRequiredField(formData.petAddress, "Endereço");
    if (addressError) errors.petAddress = addressError;

    const numberError = validateRequiredField(formData.petNumber, "Número");
    if (numberError) errors.petNumber = numberError;

    const neighborhoodError = validateRequiredField(formData.petNeighborhood, "Bairro");
    if (neighborhoodError) errors.petNeighborhood = neighborhoodError;

    const cityError = validateRequiredField(formData.petCity, "Cidade");
    if (cityError) errors.petCity = cityError;

    const stateError = validateRequiredField(formData.petState, "Estado");
    if (stateError) errors.petState = stateError;

    const healthError = validateRequiredField(formData.health, "Descrição de saúde");
    if (healthError) {
        errors.health = healthError;
    } else if (formData.health.trim().length < 200) {
        errors.health = "A descrição precisa ter pelo menos 200 caracteres.";
    }

    const aboutError = validateRequiredField(formData.about, "História do pet");
    if (aboutError) {
        errors.about = aboutError;
    } else if (formData.about.trim().length < 200) {
        errors.about = "A história precisa ter pelo menos 200 caracteres.";
    }

    const castrationError = validateFile(formData.castrationReceipt, "Comprovante de castração");
    if (castrationError) errors.castrationReceipt = castrationError;
    if (formData.castrationReceipt && !formData.castrationReceipt.type.startsWith('image/')) {
        errors.castrationReceipt = "Formato inválido.";
    }

    const vaccinationError = validateFile(formData.vaccinationReceipt, "Comprovante de vacinação");
    if (vaccinationError) errors.vaccinationReceipt = vaccinationError;
    if (formData.vaccinationReceipt && !formData.vaccinationReceipt.type.startsWith('image/')) {
        errors.vaccinationReceipt = "Formato inválido.";
    }

    const photos = [formData.photo1, formData.photo2, formData.photo3];
    const hasAtLeastOnePhoto = photos.some(p => p !== null);
    const hasInvalidFileType = photos.some(p => p && !p.type.startsWith('image/'));

    if (!hasAtLeastOnePhoto) {
        const photoError = "Envie pelo menos uma foto do pet.";
        errors.photo1 = photoError;
        errors.photo2 = photoError;
        errors.photo3 = photoError;
    } else if (hasInvalidFileType) {
        const photoError = "Formato inválido. Apenas imagens.";
        if (formData.photo1 && !formData.photo1.type.startsWith('image/')) errors.photo1 = photoError;
        if (formData.photo2 && !formData.photo2.type.startsWith('image/')) errors.photo2 = photoError;
        if (formData.photo3 && !formData.photo3.type.startsWith('image/')) errors.photo3 = photoError;
    }

    if (!formData.contactOption) errors.contactOption = "Por favor, escolha uma forma de contato.";

    const isAnyPersonalityChecked = Object.values(formData.personality).some(value => value === true);
    if (!isAnyPersonalityChecked) {
        errors.personality = "Selecione ao menos uma característica de personalidade.";
    }

    return errors;
};

// Valida os dados de atualização do usuário, excluindo senha e confirmação
export const validateUpdateData = (formData: Omit<RegistrationStep1Data, 'password' | 'confirmPassword'>) => {
    const errors: { [key: string]: string } = {};
    const validations = {
        firstName: validateName(formData.firstName, "Nome"),
        lastName: validateName(formData.lastName, "Sobrenome"),
        birthDate: validateBirthDate(formData.birthDate),
        phone: validatePhone(formData.phone),
        email: validateEmail(formData.email),
        address: validateRequiredField(formData.address, "Endereço"),
        number: validateRequiredField(formData.number, "Número"),
        neighborhood: validateRequiredField(formData.neighborhood, "Bairro"),
        city: validateRequiredField(formData.city, "Cidade"),
        state: validateRequiredField(formData.state, "Estado"),
    };
    for (const [key, value] of Object.entries(validations)) {
        if (value) errors[key] = value;
    }
    return errors;
};

// Valida os dados do formulário de candidatura para adoção
export interface AdoptionApplicationData {
    message: string;
    contactMethod: string;
}

export const validateAdoptionApplication = (formData: AdoptionApplicationData): FormErrors<AdoptionApplicationData> => {
    const errors: FormErrors<AdoptionApplicationData> = {};
    const messageError = validateRequiredField(formData.message, "O campo mensagem");
    if (messageError) {
        errors.message = messageError;
    } else if (formData.message.trim().length < 300) {
        errors.message = "A mensagem precisa ter pelo menos 300 caracteres.";
    }
    return errors;
};
