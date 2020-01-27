import qs from 'qs'

export const createQuery = searchParams =>
  `${qs
    .stringify(searchParams, {
      encode: true,
      arrayFormat: 'comma',
      skipNulls: true,
    })
    .toLowerCase()}`

export const getQueryFromPath = path => {
  var queryParams = path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {}
  var decodedQueryParams = {
    location: queryParams.location,
    query: queryParams.query,
    boundingBox: null,
  }

  if (queryParams.boundingbox) {
    decodedQueryParams.boundingBox = {}
    if (queryParams.boundingbox.northeast) {
      const { lat, lng } = queryParams.boundingbox.northeast
      decodedQueryParams.boundingBox.northEast = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      }
    }

    if (queryParams.boundingbox.southwest) {
      const { lat, lng } = queryParams.boundingbox.southwest
      decodedQueryParams.boundingBox.southWest = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      }
    }
  }

  return decodedQueryParams
}
