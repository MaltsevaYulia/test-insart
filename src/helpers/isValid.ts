export const isValid = (inputValue: string, editableValue: string): boolean => {
  const isValid =
    parseFloat(inputValue) >= parseFloat(editableValue) * 0.9 &&
    parseFloat(inputValue) <= parseFloat(editableValue) * 1.1;
  return isValid;
};