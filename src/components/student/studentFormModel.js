export const defaultStudentForm = {
  isValid: false,
  fields: {
    studentName: {
      isValid: false,
      isTouched: false,
      errorMessage: "",
      value: "",
    },
    studentEmail: {
      isValid: false,
      isTouched: false,
      errorMessage: "",
      value: "",
    },
    statusCode: {
      isValid: true,
      isTouched: false,
      errorMessage: "",
      value: "0",
    },
    status: {
      isValid: true,
      isTouched: false,
      errorMessage: "",
      value: "",
    },
  },
};

export const errors = {
  studentName: {
    required: "Student name is required",
    pattern: "No special characters are allowed",
    generic: "Please provide a valid student name",
    tooShort: "Student name must be at least 3 characters long",
  },
  studentEmail: {
    required: "Student email is required",
    type: "Please provide a valid student email",
    generic: "Please provide a valid student email",
  },
  statusCode: {
    pattern: "Status code should be 0 for OK or 1 for hold",
  },
  status: {
    tooLong: "Status note should be up to 50 characters",
  },
};

export const patterns = {
  stundentName: "^[a-zA-Z]+(?:\\s+[a-zA-Z]+)*$",
  statusCode: "[01]",
};

export const getErrorMessage = (validityState, fieldName) => {
  const {
    valid,
    patternMismatch,
    valueMissing,
    typeMismatch,
    tooLong,
    tooShort,
  } = validityState;

  console.log(validityState);
  if (valid) return "";

  if (valueMissing) {
    return errors[fieldName].required;
  }

  if (patternMismatch) {
    return errors[fieldName].pattern;
  }

  if (typeMismatch) {
    return errors[fieldName].type;
  }

  if (tooLong) {
    return errors[fieldName].tooLong;
  }

  if (tooShort) {
    return errors[fieldName].tooShort;
  }

  return errors[fieldName].generic;
};

export const allFieldsAreValid = (fields) => {
  for (const field of Object.values(fields)) {
    if (!field.isValid) {
      return false;
    }
  }

  return true;
};
/**
 *
 * @param {*} currentFromState
 * @param {*} action -
 * action follow the interface:
 *  {
 *      type: string;
 *      intputElement: InputElement;
 *      fieldName: string;
 *  }
 */
export const nextFormState = (currentFormState, action) => {
  const { type, inputElement, fieldName } = action;
  const nextDraftState = { ...currentFormState };
  const fieldState = nextDraftState.fields[fieldName];

  switch (type) {
    case "CHANGE":
      const { value, validity: validityState } = inputElement;

      const fields = {
        ...nextDraftState.fields,
        [fieldName]: {
          ...nextDraftState.fields[fieldName],
          errorMessage: getErrorMessage(validityState, fieldName),
          isValid: value !== "" && validityState.valid,
          value,
        },
      };

      return {
        ...nextDraftState,
        isValid: allFieldsAreValid(fields),
        fields,
      };
    case "BLUR":
      // using destructuring to deeply copy the data structure
      return {
        ...nextDraftState,
        fields: {
          ...nextDraftState.fields,
          [fieldName]: {
            ...fieldState,
            isTouched: true,
          },
        },
      };
    default:
      return currentFormState;
  }
};
