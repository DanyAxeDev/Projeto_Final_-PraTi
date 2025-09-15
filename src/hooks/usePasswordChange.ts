import { useState } from "react";
import { validatePassword } from "@/lib/validators";

type UsePasswordChangeProps = {
  onSaveSuccess: (message: string) => void;
};

export const usePasswordChange = ({ onSaveSuccess }: UsePasswordChangeProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChangePassword = () => {
    const newErrors = { currentPassword: "", newPassword: "" };
    let hasError = false;

    // Lógica de validação da senha atual (simulada)
    const FAKE_CORRECT_PASSWORD = "senha123";
    if (!currentPassword) {
      newErrors.currentPassword = "A senha atual é obrigatória.";
      hasError = true;
    } else if (currentPassword !== FAKE_CORRECT_PASSWORD) {
      newErrors.currentPassword = "A senha atual está incorreta.";
      hasError = true;
    }
    
    // Valida a força da nova senha
    const passwordStrengthError = validatePassword(newPassword);
    if (passwordStrengthError) {
      newErrors.newPassword = passwordStrengthError;
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    console.log("Senha alterada com sucesso!");
    onSaveSuccess("Sua senha foi alterada com sucesso!");
    setCurrentPassword("");
    setNewPassword("");
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    errors,
    handleChangePassword,
  };
};