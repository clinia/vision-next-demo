export const phoneFormatter = phone => {
  if (!phone) return phone
  // Only numbers
  const newValue = phone.replace(/\D/g, '')
  let formattedValue = newValue

  if (newValue.length >= 1) {
    formattedValue = `${newValue.substring(0, 3)}`
  }

  if (newValue.length > 3) {
    formattedValue = `${formattedValue} ${newValue.substring(3, 6)}`
  }
  if (newValue.length > 6) {
    formattedValue = `${formattedValue} ${newValue.substring(6, 10)}`
  }

  return formattedValue
}
