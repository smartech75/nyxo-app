import moment from 'moment'
import { Night, Value } from '@typings/Sleepdata'
import { GarminSleepObject } from '@typings/Sleep/Garmin'
import { getNightDuration } from '@helpers/sleep/sleep'
import CONFIG from '@config/Config'
import { captureException } from '@sentry/react-native'

export const formatGarminSample = (
  garminSleepObject: GarminSleepObject
): Night[] => {
  const startDate = moment
    .unix(
      garminSleepObject.startTimeInSeconds +
        garminSleepObject.startTimeOffsetInSeconds
    )
    .toISOString()
  const endDate = moment
    .unix(moment(startDate).valueOf() + garminSleepObject.durationInSeconds)
    .toISOString()
  const timeInBed = getNightDuration(startDate, endDate)

  const inBedSample: Night = {
    id: `garming_${startDate}_${endDate}_${Value.InBed}`,
    sourceId: 'com.garmin.connect.mobile',
    sourceName: 'Garmin',
    value: Value.InBed,
    startDate,
    endDate,
    totalDuration: timeInBed
  }

  const asleepSamples: Night[] = []

  Object.values(garminSleepObject.sleepLevelsMap).forEach((value) => {
    if (value) {
      value.forEach((level) => {
        const asleepStartDate = moment
          .unix(level.startTimeInSeconds)
          .toISOString()
        const asleepEndDate = moment.unix(level.endTimeInSeconds).toISOString()
        const timeAsleep = getNightDuration(asleepStartDate, asleepEndDate)

        asleepSamples.push({
          id: `garming_${startDate}_${endDate}_${Value.Asleep}`,
          sourceId: 'com.garmin.connect.mobile',
          sourceName: 'Garmin',
          value: Value.Asleep,
          startDate: asleepStartDate,
          endDate: asleepEndDate,
          totalDuration: timeAsleep
        })
      })
    }
  })

  return [inBedSample, ...asleepSamples]
}

export const formatGarminSamples = (samples: GarminSleepObject[]): Night[] => {
  const nights: Night[] = []
  if (samples) {
    samples.forEach((sample) => {
      nights.push(...formatGarminSample(sample))
    })
  }

  return nights
}

export const generateSleepApiCall = async (
  accessToken: string,
  accessTokenSecret: string,
  uploadStartTimeInSeconds: number,
  uploadEndTimeInSeconds: number
): Promise<Response | undefined> => {
  return fetch(CONFIG.GARMIN_CONFIG.GET_SLEEP_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      accessToken,
      accessTokenSecret,
      uploadStartTimeInSeconds,
      uploadEndTimeInSeconds
    })
  }).catch((error) => {
    captureException(error)
    return undefined
  })
}
