export const requuiredField: FieldValidatorType = value => {
    if (value) return undefined;
    return 'Field is required';
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} characters`;
    return undefined;
}

export type FieldValidatorType = (value: string) => string | undefined;
