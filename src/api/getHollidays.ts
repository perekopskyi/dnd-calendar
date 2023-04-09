const BASE_URL = `https://date.nager.at/api`

interface GetHolidaysInterface {
  year: number
  countryCode: string
}

interface PublicHoliday {
  date: string
  localName: string
  name: string
  countryCode: string
  fixed: boolean
  global: boolean
  counties?: string[] | null
  launchYear?: number | null
  type: string
}

export const fetchPublicHolidays = async ({
  year,
  countryCode,
}: GetHolidaysInterface): Promise<PublicHoliday[]> => {
  const url = `${BASE_URL}/v3/publicholidays/${year}/${countryCode}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch public holidays: ${response.status} ${response.statusText}`
    )
  }
  const data = await response.json()
  return data as PublicHoliday[]
}
