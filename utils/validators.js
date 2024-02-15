export const validateEmail = (email) => {
  // este regex verifica que el email cumpla con los estándares de un email
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (!reg.test(email)) return false;

  return true;
};

let regex = /^[\w-]+$/;

const invalidCharacters = [
  `"`,
  `'`,
  `{`,
  `}`,
  `[`,
  `]`,
  `(`,
  `)`,
  `$`,
  `%`,
  "#",
  "/",
  "?",
  "¿",
  "@",
];

export const validatePassword = (password) => {
  for (let i = 0; i < invalidCharacters.length; i++) {
    if (password.includes(invalidCharacters[i])) return false;
  }

  return true;
};

export const validateUsername = (username) => {
  for (let i = 0; i < invalidCharacters.length; i++) {
    if (username.includes(invalidCharacters[i])) return false;
  }

  return true;
};
