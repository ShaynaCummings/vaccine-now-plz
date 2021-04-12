// CVS vaccine checker node CLI tool

// Want to run this every X minutes on your command line? run `npm install node-cron` and uncomment all lines marked with 'cron' below
// const cron = require('node-cron')

const https = require('https')

// Substitute your state's abbreviation
const stateAbbrev = 'MA'

// OPTIONAL: Limit to specific cities by removing them from the array and uncommenting all references to nearbyCities
// const nearbyCities = [ "ABINGTON", "ACTON", "AGAWAM", "ALLSTON", "AMHERST", "ANDOVER", "ARLINGTON", "ASHLAND", "ATHOL", "ATTLEBORO", "BEDFORD", "BELCHERTOWN", "BELLINGHAM", "BELMONT", "BEVERLY", "BILLERICA", "BOSTON", "BOURNE", "BRAINTREE", "BRIDGEWATER", "BRIGHTON", "BROCKTON", "BROOKLINE", "BURLINGTON", "CAMBRIDGE", "CANTON", "CARVER", "CHATHAM", "CHELSEA", "CHESTNUT HILL", "CHICOPEE", "COHASSET", "CONCORD", "DANVERS", "DEDHAM", "DORCHESTER", "DRACUT", "EAST BOSTON", "EAST BRIDGEWATER", "EAST FALMOUTH", "EVERETT", "FALL RIVER", "FALMOUTH", "FITCHBURG", "FOXBOROUGH", "FRAMINGHAM", "GARDNER", "GEORGETOWN", "GLOUCESTER", "GRANBY", "GREAT BARRINGTON", "GREENFIELD", "HADLEY", "HANOVER", "HANSON", "HARWICH", "HARWICHPORT", "HAVERHILL", "HINGHAM", "HOLBROOK", "HOLLISTON", "HOLYOKE", "HOPKINTON", "HUDSON", "HYANNIS", "HYDE PARK", "IPSWICH", "KINGSTON", "LAKEVILLE", "LANESBOROUGH", "LAWRENCE", "LEOMINSTER", "LEXINGTON", "LONGMEADOW", "LOWELL", "LUNENBURG", "LYNN", "MALDEN", "MARBLEHEAD", "MARLBOROUGH", "MASHPEE", "MATTAPAN", "MAYNARD", "MEDFIELD", "MEDFORD", "MELROSE", "METHUEN", "MIDDLEBOROUGH", "MIDDLETON", "MILFORD", "MILLBURY", "MILLIS", "NATICK", "NEEDHAM", "NEW BEDFORD", "NEWBURYPORT", "NEWTON", "NORTH ANDOVER", "NORTH ATTLEBOROUGH", "NORTH BILLERICA", "NORTH DARTMOUTH", "NORTH EASTON", "NORTH GRAFTON", "NORTH READING", "NORTHAMPTON", "NORWELL", "ORLEANS", "OXFORD", "PALMER", "PEABODY", "PLAINVILLE", "PLYMOUTH", "PROVINCETOWN", "QUINCY", "RANDOLPH", "RAYNHAM", "READING", "REVERE", "ROSLINDALE", "ROWLEY", "SALEM", "SALISBURY", "SANDWICH", "SAUGUS", "SCITUATE", "SEEKONK", "SHARON", "SHREWSBURY", "SOMERVILLE", "SOUTH EASTON", "SOUTH HAMILTON", "SOUTH WEYMOUTH", "SOUTH YARMOUTH", "SOUTHBRIDGE", "SOUTHWICK", "SPRINGFIELD", "STONEHAM", "STOUGHTON", "STURBRIDGE", "SWANSEA", "TAUNTON", "WALTHAM", "WAREHAM", "WATERTOWN", "WAYLAND", "WEBSTER", "WELLESLEY", "WEST BRIDGEWATER", "WEST NEWTON", "WEST SPRINGFIELD", "WESTBOROUGH", "WESTFIELD", "WESTFORD", "WESTPORT", "WESTWOOD", "WEYMOUTH", "WILBRAHAM", "WILMINGTON", "WINCHENDON", "WINCHESTER", "WINTHROP", "WOBURN", "WOLLASTON", "WORCESTER", "WRENTHAM" ]

const stateUrl = `/immunizations/covid-19-vaccine.vaccine-status.${stateAbbrev}.json?vaccineinfo`
const options = {
  method: 'GET',
  hostname: 'www.cvs.com',
  path: stateUrl,
  headers: { Referer: 'https://www.cvs.com/immunizations/covid-19-vaccine' },
}

const everyFiveMins = '*/5 * * * *' //cron

// cron.schedule(everyFiveMins, () => { //cron
const req = https.request(options, (res) => {
  const chunks = []
  console.log(`____________ \n Checking at ${new Date()}...`)

  res.on('data', (chunk) => {
    chunks.push(chunk)
  })

  res.on('end', (chunk) => {
    const response = Buffer.concat(chunks)
    const body = JSON.parse(response)

    const openCities = body.responsePayloadData.data[stateAbbrev].filter(
      (c) => c.status == 'Available' // && nearbyCities.includes(c.city)
    )

    const lastUpdatedInPT = `${body.responsePayloadData.currentTime}-0700`
    const lastUpdatedInCurrentTimeZone = new Date(lastUpdatedInPT)

    const yellowText = '\x1b[33m%s\x1b[0m'
    const cyanText = '\x1b[36m%s\x1b[0m'
    const alertSound = '\007'

    if (openCities.length > 0) {
      const cities = openCities.map((c) => c.city)
      console.log(
        yellowText,
        `Vaccines available in ${cities} \n cvs last updated: ${lastUpdatedInCurrentTimeZone} \n BOOK NOW: https://www.cvs.com/vaccine/intake/store/covid-screener/covid-qns`,
        alertSound
      )
    } else {
      console.log(
        cyanText,
        `No CVSes in ${stateAbbrev} with vaccines, cvs last updated ${lastUpdatedInCurrentTimeZone}`
      )
    }
  })

  res.on('error', (error) => {
    console.error(error)
  })
})

req.end()
// }) //cron
