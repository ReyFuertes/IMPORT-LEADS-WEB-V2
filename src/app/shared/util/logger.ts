
export const logToConsoleError = (str: string) => {
  console.log('%c ' + str, 'background: red; color: white');
}
export const logToConsoleSuccess = (str: string) => {
  console.log('%c ' + str, 'background: green; color: white');
}