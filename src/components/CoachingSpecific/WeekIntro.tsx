import React, { memo } from 'react'
import styled from 'styled-components/native'
import TranslatedText from 'components/TranslatedText'
import { completeWeek } from '@actions/coaching/coaching-actions'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { PN } from '../Primitives/Primitives'
import { StyleProps, fonts, constants } from '../../styles/themes'
import { IconBold } from 'components/iconRegular'

interface Props {
  intro: string
  description: string
  habitCount: number
  lessonCount: number
  started?: string
  ended?: string
}

const WeekIntro = ({
  intro,
  description,
  habitCount,
  lessonCount,
  started,
  ended
}: Props) => {
  const startTime = started ? moment(started).format('DD.MM.') : ''
  const endTime = ended ? moment(ended).format('DD.MM.') : ''

  return (
    <Container>
      <Information>
        {habitCount > 0 && (
          <>
            <HabitIcon />
            <Habits variables={{ count: habitCount }}>
              WEEK_VIEW.HABIT_COUNT
            </Habits>
          </>
        )}
        {lessonCount > 0 && (
          <>
            <LessonIcon />
            <Habits variables={{ count: lessonCount }}>
              WEEK_VIEW.LESSON_COUNT
            </Habits>
          </>
        )}
      </Information>
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

      <Intro>{intro}</Intro>
      <PN secondary>{description}</PN>
    </Container>
  )
}

export default memo(WeekIntro)

const Container = styled.View`
  background-color: ${(props: StyleProps) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
  padding: 20px 20px 30px;
`

const Intro = styled.Text`
  margin: 10px 0px 5px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${fonts.bold};
  font-size: 17px;
`

const Information = styled.View`
  flex-direction: row;
  padding: 10px 0px 5px;
`

const Habits = styled(TranslatedText)`
  font-size: 13px;
  margin-right: 10px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const DurationRow = styled.View`
  flex-direction: row;
  padding: 10px;
`

const Started = styled(TranslatedText)`
  font-size: 13px;
  margin-right: 10px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Ended = styled(TranslatedText)`
  font-size: 13px;
  margin-right: 10px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const LessonIcon = styled(IconBold).attrs(({ theme }) => ({
  height: 15,
  width: 15,
  fill: theme.SECONDARY_TEXT_COLOR,
  name: 'bookLamp'
}))`
  margin-right: 10px;
`

const HabitIcon = styled(IconBold).attrs(({ theme }) => ({
  height: 15,
  width: 15,
  fill: theme.SECONDARY_TEXT_COLOR,
  name: 'checklist'
}))`
  margin-right: 10px;
`
