import { toggleNewHabitModal } from '@actions/modal/modal-actions'
import CoachingSectionHeader from '@components/CoachingSpecific/CoachingSectionHeader'
import EmptyState from '@components/EmptyState'
import HabitCard from '@components/HabitCard/HabitCard'
import { IconBold } from '@components/iconRegular'
import EditHabitModal from '@components/modals/HabitModal/EditHabitModal'
import {
  Container,
  P,
  PageTitle,
  SafeAreaView
} from '@components/Primitives/Primitives'
import {
  getActiveHabits,
  getArchivedHabits
} from '@selectors/habit-selectors/habit-selectors'
import NewHabitModal from '@components/modals/HabitModal/NewHabitModal'
import React, { FC } from 'react'
import { SectionList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import colors from '@styles/colors'
import { Habit } from '@typings/state/habit-state'

const HabitView: FC = () => {
  const activeHabits = useSelector(getActiveHabits)
  const archivedHabits = useSelector(getArchivedHabits)
  const dispatch = useDispatch()

  const renderItem = ({ item }: { item: Habit }) => {
    return <HabitCard key={item.id} habit={item} />
  }

  const toggleModal = () => {
    dispatch(toggleNewHabitModal())
  }

  const sections = [
    {
      title: 'HABIT.ACTIVE',
      subtitle: 'HABIT.ACTIVE_SUBTITLE',
      data: activeHabits
    },
    {
      title: 'HABIT.ARCHIVED',
      subtitle: 'HABIT.ARCHIVED_SUBTITLE',
      data: archivedHabits
    }
  ]

  const habitKeyExtractor = (item: Habit) => {
    return item.id
  }

  return (
    <SafeAreaView>
      <SectionList
        ListHeaderComponent={() => (
          <>
            <TitleRow>
              <PageTitle adjustsFontSizeToFit>HABIT.HABIT_TITLE</PageTitle>
              <NewHabitButton onPress={toggleModal}>
                <IconBold
                  width={20}
                  height={20}
                  name="circleAdd"
                  fill={colors.radiantBlue}
                />
              </NewHabitButton>
            </TitleRow>

            <Container>
              <P>HABIT.EXPLANATION_1</P>
              <P>HABIT.EXPLANATION_2</P>
            </Container>
          </>
        )}
        renderSectionHeader={({ section: { title, data, subtitle } }) => (
          <CoachingSectionHeader
            data={data}
            title={title}
            subtitle={subtitle}
          />
        )}
        sections={sections}
        ListEmptyComponent={<EmptyState />}
        renderItem={renderItem}
        keyExtractor={habitKeyExtractor}
      />

      <EditHabitModal />
      <NewHabitModal />
    </SafeAreaView>
  )
}

export default HabitView

const TitleRow = styled.View`
  padding-right: 20px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const NewHabitButton = styled.TouchableOpacity`
  padding: 3px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`

const ActiveHabits = styled.View`
  margin: 20px;
`

const Text = styled.Text`
  font-size: 15px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`
