type FormData = any; 

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

// --- Validação da Etapa 1 ---
export const validateRegistrationStep1 = (formData: FormData) => {
    const errors: { [key: string]: string } = {};
    const validations = {
        firstName: validateName(formData.firstName, "Nome"),
        lastName: validateName(formData.lastName, "Sobrenome"),
        birthDate: validateBirthDate(formData.birthDate),
        phone: validatePhone(formData.phone),
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
        confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
    };

    for (const [key, value] of Object.entries(validations)) {
        if (value) errors[key] = value;
    }
    
    // Validações simples de campos obrigatórios
    if (!formData.address) errors.address = "Endereço é obrigatório.";
    if (!formData.number) errors.number = "Número é obrigatório.";
    if (!formData.neighborhood) errors.neighborhood = "Bairro é obrigatório.";
    if (!formData.city) errors.city = "Cidade é obrigatória.";
    if (!formData.state) errors.state = "Estado é obrigatório.";

    return errors;
};

// --- Validação da Etapa 2 ---
export const validateRegistrationStep2 = (formData: FormData) => {
    const errors: { [key: string]: string } = {};
    if (!formData.species) errors.species = "Por favor, selecione uma espécie.";
    if (!formData.gender) errors.gender = "Por favor, selecione um gênero.";
    if (!formData.age) errors.age = "Por favor, selecione uma faixa de idade.";
    if (!formData.size) errors.size = "Por favor, selecione um porte.";
    return errors;
};