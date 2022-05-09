/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-character-class */
export const validate = {
  name: { required: true, minLength: 4 },
  email: {
    required: true,
    pattern:
      /([!#-'*+\/-9=?A-Z^-~-]+(.[!#-'*+\/-9=?A-Z^-~-]+)*|"([]!#-[^-~ \t]|(\[\t -~]))+")@([!#-'*+\/-9=?A-Z^-~-]+(.[!#-'*+\/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])/
  },
  password: { required: true, minLength: 7 }
}
