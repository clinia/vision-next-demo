export const getGoogleMapItinearyLink = address => {
  if (!address) return null

  return `https://www.google.ca/maps/dir/current+position/${address.replace(
    ' ',
    '+',
  )}`.toLowerCase()
}
