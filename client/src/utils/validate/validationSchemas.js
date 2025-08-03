import * as yup from 'yup';

export const USER_VALIDATION_SCHEMA = yup.object({
    firstName: yup
    .string()
    .trim()
    .min(2)
    .max(32)
    .matches(/^[A-Z][a-z]+$/, "The name must start with a capital letter")
    .required(),
    lastName: yup
    .string()
    .trim()
    .min(2)
    .max(32)
    .matches(/^[A-Z][a-z]+$/, "The surname must start with a capital letter")
    .required(),
    email: yup
    .string()
    .email()
    .required(),
    passwordHash: yup
    .string()
    .trim()
    .min(8)
    .max(24)
    .required(),
    birthday: yup
    .date()
    .max(new Date()),
    userPhoto: yup
    .mixed(),
});

export const LOGIN_VALIDATION_SCHEMA = yup.object({
    email: yup
    .string()
    .email()
    .required(),
    password: yup
    .string()
    .trim()
    .min(8)
    .max(24)
    .required(),
});

export const CREATE_TRAINING_VALIDATION_SCHEMA = yup.object({
    title: yup
    .string()
    .min(2)
    .max(32)
    .required(),
    description: yup
    .string()
    .min(2)
    .max(255)
    .required(),
});