/**
 *
 * @param {Object} fieldData
 * @returns Object
 */
export const validateField = (fieldData) => {
  let _fieldData = JSON.parse(JSON.stringify(fieldData))
  let fieldValid = true

  try {
    let keys = _fieldData.validate ? Object.keys(_fieldData.validate) : []

    let __value = undefined
    let __message = undefined

    if (keys.includes('trim')) {
      _fieldData.value = _fieldData.value.trim()
    }

    if (keys.includes('required')) {
      __value = Array.isArray(_fieldData.validate['required'])
        ? _fieldData.validate['required'][0]
        : _fieldData.validate['required']
      __message = Array.isArray(_fieldData.validate['required'])
        ? _fieldData.validate['required'][1]
        : 'Required.'

      if (__value) {
        if (
          _fieldData.value === undefined ||
          _fieldData.value === null ||
          _fieldData.value === ''
        ) {
          throw new Error(__message)
        }
      }
    }

    if (keys.includes('minlength')) {
      __value = Array.isArray(_fieldData.validate['minlength'])
        ? _fieldData.validate['minlength'][0]
        : _fieldData.validate['minlength']
      __message = Array.isArray(_fieldData.validate['minlength'])
        ? _fieldData.validate['minlength'][1]
        : `The minimum number of characters is ${__value} characters.`

      if (typeof _fieldData.value !== 'string') {
        throw new Error('Invalid value, value type must be string.')
      }

      if (_fieldData.value.length < __value) {
        throw new Error(__message)
      }
    }

    if (keys.includes('maxlength')) {
      __value = Array.isArray(_fieldData.validate['maxlength'])
        ? _fieldData.validate['maxlength'][0]
        : _fieldData.validate['maxlength']
      __message = Array.isArray(_fieldData.validate['maxlength'])
        ? _fieldData.validate['maxlength'][1]
        : `The maximum number of characters is ${__value} characters.`

      if (typeof _fieldData.value !== 'string') {
        throw new Error('Invalid value, value type must be string.')
      }

      if (_fieldData.value.length > __value) {
        throw new Error(__message)
      }
    }

    if (keys.includes('min')) {
      __value = Array.isArray(_fieldData.validate['min'])
        ? _fieldData.validate['min'][0]
        : _fieldData.validate['min']
      __message = Array.isArray(_fieldData.validate['min'])
        ? _fieldData.validate['min'][1]
        : `The minimum number is ${__value}.`

      if (isNaN(_fieldData.value)) {
        throw new Error('Invalid value, value type must be numeric.')
      }

      _fieldData.value = parseInt(_fieldData.value)

      if (_fieldData.value < __value) {
        throw new Error(__message)
      }
    }

    if (keys.includes('max')) {
      __value = Array.isArray(_fieldData.validate['max'])
        ? _fieldData.validate['max'][0]
        : _fieldData.validate['max']
      __message = Array.isArray(_fieldData.validate['max'])
        ? _fieldData.validate['max'][1]
        : `The maximum number is ${__value}.`

      if (isNaN(_fieldData.value)) {
        throw new Error('Invalid value, value type must be numeric.')
      }

      _fieldData.value = parseInt(_fieldData.value)

      if (_fieldData.value > __value) {
        throw new Error(__message)
      }
    }

    if (keys.includes('pattern')) {
      __value = Array.isArray(_fieldData.validate['pattern'])
        ? _fieldData.validate['pattern'][0]
        : _fieldData.validate['pattern']
      __message = Array.isArray(_fieldData.validate['pattern'])
        ? _fieldData.validate['pattern'][1]
        : `Invaild value.`

      let pattern = new RegExp(__value)
      if (!pattern.test(_fieldData.value)) {
        throw new Error(__message)
      }
    }
  } catch (error) {
    fieldValid = false
    _fieldData.error = error.message
  } finally {
    return { fieldValid, validFieldData: _fieldData }
  }
}

/**
 *
 * @param {Object} formData
 * @returns Object
 */
export const validateForm = (formData) => {
  let _formData = JSON.parse(JSON.stringify(formData))
  let formValid = true
  let message = ''

  try {
    const keys = Object.keys(_formData)

    // validate field data
    for (let i = 0, leng = keys.length; i < leng; i++) {
      let key = keys[i]

      const { fieldValid, validFieldData } = validateField(_formData[key])
      _formData[key] = validFieldData

      if (formValid && !fieldValid) {
        formValid = false
      }
    }
  } catch (error) {
    formValid = false
    message = error.message
  } finally {
    return { formValid, validFormData: _formData, message }
  }
}
