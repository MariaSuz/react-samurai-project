export const requuiredField = value => {
    if (value) return undefined;
    return 'Field is required';
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} characters`;
    return undefined;
}

