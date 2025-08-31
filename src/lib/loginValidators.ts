// Simula usuários cadastrados
const users: Record<string, string> = {
  "usuario1@email.com": "senha123",
  "teste@email.com": "12345678",
};

interface LoginData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

// Validações individuais
export function validateLoginEmail(email: string): string | undefined {
  if (!email) return "E-mail é obrigatório.";
  if (!/\S+@\S+\.\S+/.test(email)) return "Formato de e-mail inválido.";
  if (!users[email]) return "E-mail não cadastrado";
  return undefined;
}

export function validateLoginPassword(email: string, password: string): string | undefined {
  if (!password) return "Senha é obrigatória.";
  // Checa se o email existe no "banco" antes de comparar senha
  if (email && users[email] && users[email] !== password) return "Senha incorreta";
  return undefined;
}

// Validação completa
export function validateLogin(data: LoginData): LoginErrors {
  const errors: LoginErrors = {};
  const emailError = validateLoginEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validateLoginPassword(data.email, data.password);
  if (passwordError) errors.password = passwordError;

  return errors;
}
