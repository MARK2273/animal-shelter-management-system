const PASSWORD_RULE: RegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const PASSWORD_Message: string =
  'Password should have one Uppercase  , Lowercase along with a nyumber and a special character';

export const REGEX = {
  PASSWORD_RULE,
};

export const MESSAGES = {
  PASSWORD_Message,
};
