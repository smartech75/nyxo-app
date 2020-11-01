import { selectLesson } from '@actions/coaching/coaching-actions'
import { getReadingTime } from '@helpers/reading-time'
import { useNavigation } from '@react-navigation/core'
import { CombinedLesson } from '@selectors/coaching-selectors/coaching-selectors'
import Analytics from 'appcenter-analytics'
import ROUTE from '@config/routes/Routes'
import React, { FC, memo } from 'react'
import FastImage from 'react-native-fast-image'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import colors from '../../styles/colors'
import { IconBold } from '../iconRegular'
import TranslatedText from '../TranslatedText'

type Props = {
  lesson: CombinedLesson
  locked?: boolean
}

const LessonListItem: FC<Props> = ({ lesson, locked }) => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const time = getReadingTime(lesson.lessonContent)

  const handlePress = () => {
    if (!locked) {
      Analytics.trackEvent(`Open lesson ${lesson.lessonName}`)
      dispatch(selectLesson(lesson.slug))
      navigate(ROUTE.LESSON, {})
    }
  }

  const author = lesson.authorCards
    ? {
        name: lesson?.authorCards[0]?.name
      }
    : {
        name: 'Pietari Nurmi'
      }

  return (
    <Touchable onPress={handlePress}>
      <Container>
        <LessonInfo>
          <LessonName numberOfLines={2}>{lesson.lessonName}</LessonName>
          <Author>{author.name}</Author>
          <InfoRow>
            <StyledIcon name="clockBold" height={10} width={10} />
            <ReadingTime variables={{ readingTime: time }}>
              {time === 1 ? 'READING_TIME.SINGULAR' : 'READING_TIME.PLURAL'}
            </ReadingTime>

            {lesson.exampleHabit?.length ? (
              <>
                <StyledIcon name="taskListEdit" height={10} width={10} />
                <HabitCount variables={{ habits: lesson.exampleHabit?.length }}>
                  {lesson.exampleHabit?.length > 1
                    ? 'HABITS_COUNT_SHORT'
                    : 'HABIT_COUNT_SHORT'}
                </HabitCount>
              </>
            ) : null}
          </InfoRow>
        </LessonInfo>

        <ImageContainer>
          <WeekImage
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: `https:${lesson.cover}?fm=jpg&fl=progressive&w=200`
            }}
          />
          <Completed completed={lesson.completed}>
            {lesson.completed ? (
              <IconBold
                name="checkMark"
                height={15}
                width={15}
                fill={colors.white}
              />
            ) : null}
          </Completed>
        </ImageContainer>
      </Container>
    </Touchable>
  )
}

export default memo(LessonListItem)

const StyledIcon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.SECONDARY_TEXT_COLOR
}))`
  margin-right: 5px;
`

const HabitCount = styled(TranslatedText)`
  margin: 0px 5px 0px 5px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-size: 12px;
`

const Touchable = styled.TouchableOpacity`
  padding: 16px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  box-shadow: ${({ theme }) => theme.SHADOW};
  margin: 8px 16px;
  border-radius: 8px;
`

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
`
const Author = styled.Text`
  font-size: 13px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const LessonName = styled.Text`
  font-size: 15px;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 5px;
`

const ReadingTime = styled(TranslatedText)`
  font-size: 12px;
  margin-right: 10px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

interface CompletedProps {
  readonly completed?: boolean
}
const Completed = styled.View<CompletedProps>`
  width: 25px;
  height: 25px;
  border-radius: 5px;
  position: absolute;
  left: 0px;
  bottom: 0px;
  z-index: 20;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${({ completed }: CompletedProps) =>
    completed ? colors.radiantBlue : 'transparent'};
`

const LessonInfo = styled.View`
  flex: 1;
  margin-right: 10px;
  justify-content: flex-start;
`

const ImageContainer = styled.View`
  background-color: gray;
  border-radius: 10px;
`

const WeekImage = styled(FastImage)`
  flex: 1;
  width: 60px;
  height: 60px;
  border-radius: 5px;
`

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`
