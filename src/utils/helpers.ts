export const getAge = (dob: string) => {
  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth() + 1 // +1, pois os meses iniciam no 0
  const currentYear = today.getFullYear()

  const petBirth = new Date(dob)
  const petBirthMonth = petBirth.getMonth() + 2 // +2, para conseguir o mês real da data informada

  // Calcula a idade baseada no ano
  let age = currentYear - petBirth.getFullYear()

  // Causa um erro se o ano informado for maior que o atual
  if (age < 0) throw new Error("O ano de nascimento não pode ser maior que o ano atual.")

  // Checa se o pet não fez aniversário ainda
  if (currentMonth < petBirthMonth || (currentMonth === petBirthMonth && currentDay < petBirth.getDate())) {
    if (age > 0) age-- // se não tiver feito e a idade for maior que zero, tiramos um ano da idade
  }

  // Retorna a idade
  if (age === 0) { // Se o pet não tiver um ano completo, calculamos quantos meses ele tem
    const months = currentMonth - petBirthMonth

    if (months < 0) { // Se os meses forem negativos, o pet nasceu no ano passado
      return (petBirthMonth + months) / 10 // Então, subtraímos os meses que faltam para o pet completar um ano e retornamos a idade em decimal
    }

    return months / 10 // Senão, retornamos a idade (meses) em decimal normalmente

  } else { // Senão, retornamos a idade normal (anos)
    return age
  }
}