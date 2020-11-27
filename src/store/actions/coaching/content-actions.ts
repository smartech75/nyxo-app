import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { actionCreators as contentActions } from '@reducers/content-reducer/content-reducer'
import CONFIG from '@config/Config'
import { ContentfulClientApi, Entry } from 'contentful'
import I18n from 'i18n-js'
import {
  AuthorCard,
  ContentLesson,
  ContentWeek,
  ExampleHabit,
  Section
} from '@typings/CoachingContentState'
import {
  ICoachingWeekFields,
  ILessonFields
} from '@typings/generated/contentful'
import { Dispatch, Thunk } from '@typings/redux-actions'

const { createClient } = require('contentful/dist/contentful.browser.min.js')

export const contentfulClient: ContentfulClientApi = createClient({
  space: CONFIG.CONTENTFUL_SPACE,
  accessToken: CONFIG.CONTENTFUL_SPACE_ACCESS_TOKEN
})

const getFieldValue = (
  entry: Entry<any>,
  fieldToGet: string,
  object: any,
  callback?: (args: any) => void,
  fieldToSet?: string
) => {
  if (entry.fields[fieldToGet]) {
    object[fieldToSet || fieldToGet] = callback
      ? callback(entry.fields[fieldToGet])
      : entry.fields[fieldToGet]
  }
}

export const getAllWeeks = (): Thunk => async (dispatch: Dispatch) => {
  const locale = I18n.locale === 'en' ? 'en-US' : 'fi-FI'
  const weeks: ContentWeek[] = []
  const lessons: any = []
  const sections: Section[] = []
  const exampleHabits: ExampleHabit[] = []

  await dispatch(contentActions.updateContentStart())

  try {
    const coachingWeeks: any = await contentfulClient.getEntries({
      locale,
      content_type: 'coachingWeek',
      'fields.slug[ne]': 'introduction',
      include: 3
    })

    coachingWeeks.items.forEach((coachingWeek: Entry<ICoachingWeekFields>) => {
      const weekObject: ContentWeek = {}

      weekObject.contentId = coachingWeek.sys.id

      getFieldValue(coachingWeek, 'weekName', weekObject)
      getFieldValue(coachingWeek, 'duration', weekObject)
      getFieldValue(
        coachingWeek,
        'locked',
        weekObject,
        undefined,
        'defaultLocked'
      )
      if (coachingWeek.fields.coverPhoto) {
        weekObject.coverPhoto = coachingWeek.fields.coverPhoto.fields.file.url
      }

      if (coachingWeek.fields.slug) {
        weekObject.slug = coachingWeek.fields.slug
      }
      getFieldValue(coachingWeek, 'order', weekObject)
      getFieldValue(coachingWeek, 'intro', weekObject)
      getFieldValue(
        coachingWeek,
        'weekDescription',
        weekObject,
        documentToPlainTextString
      )

      if (coachingWeek.fields.lessons) {
        const weekLessons: string[] = []

        coachingWeek.fields.lessons.forEach((lesson: Entry<ILessonFields>) => {
          const lessonObject: ContentLesson = { contentId: lesson.sys.id }

          if (lesson.fields.slug) {
            lessonObject.slug = lesson.fields.slug
          }
          getFieldValue(lesson, 'lessonName', lessonObject)
          getFieldValue(lesson, 'additionalInformation', lessonObject)

          getFieldValue(lesson, 'author', lessonObject)
          getFieldValue(lesson, 'lessonName', lessonObject)
          getFieldValue(lesson, 'stage', lessonObject)
          getFieldValue(lesson, 'lessonContent', lessonObject)

          lessonObject.authorCards = mapAuthors(lesson)

          if (lesson.fields.cover) {
            lessonObject.cover = lesson.fields.cover.fields.file.url
          }

          if (lesson.fields.keywords) {
            lessonObject.tags = lesson.fields.keywords
          }

          if (lesson.fields.section) {
            const section: Section = {
              title: lesson.fields.section.fields.title,
              order: lesson.fields.section.fields.order,
              description: lesson.fields?.section?.fields?.description
            }
            lessonObject.section = section
            sections.push(section)
          }

          if (lesson.fields.habit) {
            const habits: ExampleHabit[] = []

            lesson.fields.habit.forEach((habit) => {
              const exampleHabit: ExampleHabit = {
                title: habit.fields.title,
                period: habit.fields.period,
                description: habit.fields.description
              }
              habits.push(exampleHabit)
              exampleHabits.push(exampleHabit)
            })

            lessonObject.exampleHabit = habits
          }

          lessonObject.weekId = weekObject.contentId

          weekLessons.push(lesson.fields.slug)
          lessons.push(lessonObject)
        })

        weekObject.lessons = weekLessons
      }

      if (coachingWeek.fields.taskCount) {
        weekObject.taskCount = coachingWeek.fields.taskCount
      }

      weeks.push(weekObject)
    })

    const sorted = weeks.sort((a, b) => a.order - b.order)

    await dispatch(
      contentActions.updateContentSuccess({
        weeks: sorted,
        lessons,
        sections,
        habits: exampleHabits
      })
    )
  } catch (error) {
    await Promise.all([dispatch(contentActions.updateContentError())])
  }
}

const mapAuthors = (lesson: Entry<any>): AuthorCard[] => {
  const authorArray: AuthorCard[] = []

  if (lesson.fields.authorCard) {
    lesson.fields.authorCard.forEach((card: Entry<any>) => {
      const author: any = {}

      if (card.fields.name) {
        author.name = card.fields.name
      }

      getFieldValue(card, 'name', author)
      getFieldValue(card, 'credentials', author)

      if (card.fields.avatar.fields.file.url) {
        author.avatar = card.fields.avatar.fields.file.url
      }
      authorArray.push(author)
    })
  }
  return authorArray
}
