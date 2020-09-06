export function splitToSentCase(str: string) {
  return str.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
      .replace('_', ' ')
      .split(/(?=[A-Z])/).join(' '));
}