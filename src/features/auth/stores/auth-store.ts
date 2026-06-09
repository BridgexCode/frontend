export interface StoredUser {
  id: string;
  orgName: string;
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  timezone: string;
  password: string;
  role: string;
  createdAt: string;
}

const users = new Map<string, StoredUser>();
const tokens = new Map<string, string>();

export function addUser(user: StoredUser): void {
  users.set(user.id, user);
}

export function getUserByEmail(email: string): StoredUser | undefined {
  return Array.from(users.values()).find((u) => u.email === email);
}

export function getUserById(id: string): StoredUser | undefined {
  return users.get(id);
}

export function setToken(token: string, userId: string): void {
  tokens.set(token, userId);
}

export function getUserIdByToken(token: string): string | undefined {
  return tokens.get(token);
}
