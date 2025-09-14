// Tipos para os dados dos formulários
export type AdoptionPreferencesData = {
    animalTypes: { [key: string]: boolean };
    sexo: string;
    porte: string;
    idade: string;
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
    species: string;
    gender: string;
    age: string;
    size: string;
};

// --- Validações Individuais ---
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

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

export function validateConfirmPassword(password: string, confirmPassword: string) {
    if (!confirmPassword) return "Confirmação é obrigatória.";
    if (password && password !== confirmPassword) return "As senhas não coincidem.";
    return undefined;
}

export function validateRequiredField(fieldValue: string, fieldName: string) {
    if (!fieldValue || fieldValue.trim() === '') return `${fieldName} é obrigatório.`;
    return undefined;
}

export const validateAdoptionPreferences = (adoptionData: AdoptionPreferencesData) => {
    const errors = { animalTypes: "", sexo: "", porte: "", idade: "" };

    const isAnyAnimalTypeChecked = Object.values(adoptionData.animalTypes).some(value => value === true);
    if (!isAnyAnimalTypeChecked) {
      errors.animalTypes = "Selecione ao menos um tipo de animal.";
    }
    if (!adoptionData.sexo) errors.sexo = "Selecione o sexo.";
    if (!adoptionData.porte) errors.porte = "Selecione o porte.";
    if (!adoptionData.idade) errors.idade = "Selecione a idade.";
    
    return errors;
}

// --- Validação da Etapa 1 ---
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

// --- Validação da Etapa 2 ---
export const validateRegistrationStep2 = (formData: RegistrationStep2Data) => {
    const errors: { [key: string]: string } = {};
    if (!formData.species) errors.species = "Por favor, selecione uma espécie.";
    if (!formData.gender) errors.gender = "Por favor, selecione um gênero.";
    if (!formData.age) errors.age = "Por favor, selecione uma faixa de idade.";
    if (!formData.size) errors.size = "Por favor, selecione um porte.";
    return errors;
};