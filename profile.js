const users = {
  UniversalDragon: {
    role: 'ROOT_ADMIN',
    accessLevel: 100,
    enabledTools: ['webAudit', 'memoryRead', 'memoryWrite', 'codeReview']
  },
  Guest: {
    role: 'GUEST',
    accessLevel: 10,
    enabledTools: ['memoryRead']
  }
};

export function getUserProfile(user) {
  return users[user] || users.Guest;
}
