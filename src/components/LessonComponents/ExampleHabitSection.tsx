import keyExtractor from '@helpers/KeyExtractor'
import { fonts, StyleProps } from '@styles/themes'
import { ExampleHabit as ExampleHabitType } from '@typings/CoachingContentState'
import React, { memo } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import ExampleHabit, {
  EXAMPLE_HABIT_MARGIN_LEFT,
  EXAMPLE_HABIT_WIDTH
} from '../HabitCard/ExampleHabit'
import { H3Margin } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'

const ExampleHabitSection = ({
  habits
}: {
  habits: ExampleHabitType[] | undefined
}) => {
  if (!habits) return null

  const contentOffsets = habits.map(
    (_, index) => (EXAMPLE_HABIT_WIDTH + EXAMPLE_HABIT_MARGIN_LEFT) * index
  )
  const renderHabit = ({
    item: habit,
    index
  }: {
    item: ExampleHabitType
    index: number
  }) => {
    return (
      <ExampleHabit
        key={index}
        title={habit.title}
        period={habit.period}
        description={habit.description}
      />
    )
  }

  return (
    <>
      <H3>EXAMPLE_HABITS</H3>
      <TextSmall>TRY_THIS_HABIT</TextSmall>
      <FlatList
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingVertical: 20 }}
        centerContent
        horizontal
        data={habits}
        renderItem={renderHabit}
        snapToOffsets={contentOffsets}
        decelerationRate="fast"
      />
    </>
  )
}

export default memo(ExampleHabitSection)

const TextSmall = styled(TranslatedText)`
  font-family: ${fonts.medium};
  font-size: 13px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  margin: 10px 20px;
`

// EXAMPLE_HABIT_EXPLANATION

const H3 = styled(H3Margin)`
  margin-top: 20px;
`
