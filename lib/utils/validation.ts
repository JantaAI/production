export function validatePhone(phone: string): boolean {
  // Basic phone validation - adjust regex as needed
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
}

export function validateActivationCode(code: string): boolean {
  // 8 character alphanumeric code
  return /^[A-Z0-9]{8}$/.test(code);
}

export function validateAge(age: number): boolean {
  return age > 0 && age < 150;
}
