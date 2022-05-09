export function formDataToJSON(formData: FormData) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formJSON: { [key: string]: any } = {}
  for (const key of formData.keys()) {
    formJSON[key] = formData.get(key)
  }
  return formJSON
}
