export default interface Record {
  id: string
  name?: string
  type?: string
  address?: Address
  phones?: Phone[]
  openingHours?: OpeningHours[][]
  distance?: number
  documentType?: string
  onlineBookingUrl?: string
}

export interface Address {
  country: string
  countryCode: string
  locality: string
  neighborhood: string
  place: string
  postalCode: string
  region: string
  regionCode: string
  streetAddress: string
  suiteNumber: string
}

export interface Phone {
  countryCode: string
  extension: string
  number: string
  type: string
}

export interface OpeningHours {
  start: string
  end: string
}
