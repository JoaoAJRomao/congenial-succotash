/**
 * Gera uma senha aleatória complexa que atende a critérios específicos.
 * A senha conterá pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.
 * @param length O comprimento desejado da string.
 * @returns Uma string de senha aleatória e complexa.
 */
export function generateRandomString(length: number): string {    
    if (length < 4) {
        throw new Error("O comprimento deve ser de pelo menos 4 para incluir todos os tipos de caracteres necessários.");
    }

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = upperCaseChars + lowerCaseChars + numberChars + specialChars;

    // Garante que a senha contenha pelo menos um de cada tipo de caractere
    let password = [
        upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)],
        lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)],
        numberChars[Math.floor(Math.random() * numberChars.length)],
        specialChars[Math.floor(Math.random() * specialChars.length)]
    ].join('');

    // Preenche o resto da senha com caracteres aleatórios de todos os conjuntos
    for (let i = 4; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Embaralha a senha para garantir que os caracteres obrigatórios não estejam sempre no início
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}