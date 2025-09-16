import { useState } from 'react';
import {
  validateRegistrationStep1,
  validateBirthDate,
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
  validatePhone,
  validateRequiredField,
} from '@/lib/validators';

import type {
  RegistrationStep1Data,
  Gender,
  Age,
  Size,
  AnimalType,
} from '@/lib/validators';

type UserFormData = RegistrationStep1Data & {
  animalType: AnimalType | '';
  gender: Gender | '';
  age: Age | '';
  size: Size | '';
  personality: {
    active: boolean;
    goodWithPets: boolean;
    calm: boolean;
    goodWithKids: boolean;
    extrovert: boolean;
    introvert: boolean;
  };
  maxDistance: number;
};

const initialFormData: UserFormData = {
  // Dados do usuário
  firstName: "",
  lastName: "",
  birthDate: "",
  phone: "",
  address: "",
  number: "",
  neighborhood: "",
  city: "",
  state: "",
  email: "",
  password: "",
  confirmPassword: "",
  // Preferências
  animalType: "",
  gender: "",
  age: "",
  size: "",
  personality: {
    active: false,
    goodWithPets: false,
    calm: false,
    goodWithKids: false,
    extrovert: false,
    introvert: false,
  },
  maxDistance: 20,
};

export const useUserRegisterForm = () => {
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: any }>({});

  const handleChange = (eventOrValue: any) => {
    let name: string;
    let value: any;

    if (eventOrValue && eventOrValue.target) {
      const { id, name: targetName, value: targetValue, type, checked } = eventOrValue.target;
      name = targetName || id;
      value = type === 'checkbox' ? checked : targetValue;
    } else {
      name = eventOrValue.name;
      value = eventOrValue.value;
    }

    setFormData(currentFormData => {
      const nextFormData = { ...currentFormData };

      if (name.startsWith('personality-')) {
        const personalityKey = name.replace('personality-', '') as keyof typeof nextFormData.personality;
        nextFormData.personality[personalityKey] = value;
      } else {
        (nextFormData as any)[name] = value;
      }

      setErrors(currentErrors => {
        const newErrors = { ...currentErrors };
        delete (newErrors as any)[name];

        if (name.startsWith('personality-')) {
          const isAnyPersonalityChecked = Object.values(nextFormData.personality).some(
            (isChecked) => isChecked === true
          );
          if (isAnyPersonalityChecked) {
            delete newErrors.personality;
          } else {
            newErrors.personality = "Selecione ao menos uma característica de personalidade.";
          }
        }

        let error: string | undefined;
        switch (name) {
          // -------- Registro --------
          case 'firstName':
            error = validateName(value, "Nome");
            break;
          case 'lastName':
            error = validateName(value, "Sobrenome");
            break;
          case 'birthDate':
            error = validateBirthDate(value);
            break;
          case 'phone':       
            error = validatePhone(value);
            break;
          case 'email':
            error = validateEmail(value);
            break;
          case 'password':
            error = validatePassword(value);
            break;
          case 'confirmPassword':
            error = validateConfirmPassword(nextFormData.password, value);
            break;
          case 'address':
            error = validateRequiredField(value, "Endereço");
            break;
          case 'number':
            error = validateRequiredField(value, "Número");
            break;
          case 'neighborhood':
            error = validateRequiredField(value, "Bairro");
            break;
          case 'city':
            error = validateRequiredField(value, "Cidade");
            break;
          case 'state':
            error = validateRequiredField(value, "Estado");
            break;

          // -------- Preferências --------
          case 'animalType':
            if (!value) error = "Selecione um tipo de animal.";
            break;
          case 'gender':
            if (!value) error = "Selecione uma preferência de gênero.";
            break;
          case 'age':
            if (!value) error = "Selecione uma preferência de idade.";
            break;
          case 'size':
            if (!value) error = "Selecione uma preferência de porte.";
            break;
        }

        if (error) {
          (newErrors as any)[name] = error;
        }

        return newErrors;
      });

      return nextFormData;
    });
  };

  const validateRegistrationForm = () => {
    const step1Data: RegistrationStep1Data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate,
      phone: formData.phone,
      address: formData.address,
      number: formData.number,
      neighborhood: formData.neighborhood,
      city: formData.city,
      state: formData.state,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };
    const validationErrors = validateRegistrationStep1(step1Data);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validatePreferenceForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.animalType) {
      newErrors.animalType = "Selecione um tipo de animal.";
    }
    if (!formData.gender) {
      newErrors.gender = "Selecione uma preferência de gênero.";
    }
    if (!formData.age) {
      newErrors.age = "Selecione uma preferência de idade.";
    }
    if (!formData.size) {
      newErrors.size = "Selecione uma preferência de porte.";
    }

    const isAnyPersonalityChecked = Object.values(formData.personality).some(
      (isChecked) => isChecked === true
    );
    if (!isAnyPersonalityChecked) {
      newErrors.personality = "Selecione ao menos uma característica de personalidade.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { formData, errors, handleChange, validateRegistrationForm, validatePreferenceForm };
};
