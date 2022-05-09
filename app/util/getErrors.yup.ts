/* eslint-disable @typescript-eslint/no-explicit-any */
export const getValidationErrors = (err: any) => {
  const validationErrors = {} as any

  err.inner.forEach((error: any) => {
    if (error.path) {
      validationErrors[error.path] = error.message
    }
  })

  return validationErrors
}
