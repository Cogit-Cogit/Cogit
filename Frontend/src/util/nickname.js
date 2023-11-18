export const convertNickName = (nickname) => {
  if (nickname.length <= 1) {
    return nickname;
  }

  const check = /[a-zA-Z]/;

  if (check.test(nickname)) {
    return nickname[0] + nickname[1];
  }

  return nickname[0];
};