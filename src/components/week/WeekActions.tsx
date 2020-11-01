import { PrimaryButton } from '@components/Buttons/PrimaryButton'
import Card from '@components/Card'

import TranslatedText from '@components/TranslatedText'
import { canEndCoaching } from '@helpers/coaching/coaching'
import { format } from 'date-fns'
import React, { FC } from 'react'
import styled from 'styled-components/native'

type Props = {
  started?: string
  ended?: string
  isCurrentlyActive: boolean
  startWeek: () => void
  endWeek: () => void
}

export const WeekActions: FC<Props> = ({
  started,
  ended,
  isCurrentlyActive,
  startWeek
}) => {
  const startTime = started ? format(new Date(started), 'dd.MM') : ''
  const endTime = ended ? format(new Date(ended), 'dd.MM') : ''
  const canEnd = canEndCoaching(started, 7)
  return (
    <Container>
      <Card>
        <DurationRow>
          {started && (
            <Started variables={{ started: startTime }}>
              WEEK_VIEW.START_DATE
            </Started>
          )}
          {ended && (
            <Ended variables={{ ended: endTime }}>WEEK_VIEW.END_DATE</Ended>
          )}
        </DurationRow>
        {!isCurrentlyActive && !started && (
          <PrimaryButton title="WEEK.BEGIN" onPress={startWeek} />
        )}
        {started && canEnd && !ended ? (
          <PrimaryButton title="WEEK.COMPLETE" onPress={endWeek} />
        ) : null}
      </Card>
    </Container>
  )
}

const Container = styled.View`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
  border-radius: 8px;
  padding: 0px 16px;
`
const DurationRow = styled.View`
  flex-direction: row;
  padding: 10px 0px;
`

const Started = styled(TranslatedText)`
  font-size: 13px;
  margin-right: 10px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Ended = styled(TranslatedText)`
  font-size: 13px;
  margin-right: 10px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
