/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSleepData = /* GraphQL */ `
  query GetSleepData($id: ID!) {
    getSleepData(id: $id) {
      id
      userId
      user {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      date
      rating
      night {
        value
        sourceName
        sourceId
        startDate
        endDate
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listSleepDatas = /* GraphQL */ `
  query ListSleepDatas(
    $filter: ModelSleepDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSleepDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        date
        rating
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getRequest = /* GraphQL */ `
  query GetRequest($id: ID!) {
    getRequest(id: $id) {
      id
      requesterName
      requesterId
      userName
      userId
      accepted
      createdAt
      updatedAt
    }
  }
`;
export const listRequests = /* GraphQL */ `
  query ListRequests(
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        requesterName
        requesterId
        userName
        userId
        accepted
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      connectionId
      id
      email
      nickname
      darkMode
      intercomId
      activeCoaching {
        id
        userId
        stage
        activeWeek
        started
        ended
        lessons
        createdAt
        updatedAt
        owner
      }
      sleepPoints {
        efficiency
        duration
        socialJetLag
        timing
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCoachingData = /* GraphQL */ `
  query GetCoachingData($id: ID!) {
    getCoachingData(id: $id) {
      id
      userId
      user {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      stage
      active {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      activeWeek
      started
      ended
      weeks {
        started
        ended
        locked
        slug
      }
      lessons
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listCoachingDatas = /* GraphQL */ `
  query ListCoachingDatas(
    $filter: ModelCoachingDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoachingDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        stage
        activeWeek
        started
        ended
        lessons
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getHabit = /* GraphQL */ `
  query GetHabit($id: ID!) {
    getHabit(id: $id) {
      id
      userId
      user {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      dayStreak
      longestDayStreak
      latestCompletedDate
      title
      description
      date
      days {
        key
        value
      }
      archived
      period
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listHabits = /* GraphQL */ `
  query ListHabits(
    $filter: ModelHabitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHabits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        dayStreak
        longestDayStreak
        latestCompletedDate
        title
        description
        date
        archived
        period
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getLikedContent = /* GraphQL */ `
  query GetLikedContent($id: ID!) {
    getLikedContent(id: $id) {
      id
      name
      type
      slug
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listLikedContents = /* GraphQL */ `
  query ListLikedContents(
    $filter: ModelLikedContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikedContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        slug
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getNightRating = /* GraphQL */ `
  query GetNightRating($id: ID!) {
    getNightRating(id: $id) {
      id
      userId
      user {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      rating
      date
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listNightRatings = /* GraphQL */ `
  query ListNightRatings(
    $filter: ModelNightRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNightRatings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        rating
        date
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getFeedbackContent = /* GraphQL */ `
  query GetFeedbackContent($id: ID!) {
    getFeedbackContent(id: $id) {
      id
      type
      slug
      rating
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listFeedbackContents = /* GraphQL */ `
  query ListFeedbackContents(
    $filter: ModelFeedbackContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeedbackContents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        slug
        rating
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getComments = /* GraphQL */ `
  query GetComments($id: ID!) {
    getComments(id: $id) {
      id
      type
      slug
      firstName
      lastName
      comment
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listCommentss = /* GraphQL */ `
  query ListCommentss(
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        slug
        firstName
        lastName
        comment
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getNightNote = /* GraphQL */ `
  query GetNightNote($id: ID!) {
    getNightNote(id: $id) {
      id
      userId
      user {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      date
      dateTime
      content
      meta {
        tags
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listNightNotes = /* GraphQL */ `
  query ListNightNotes(
    $filter: ModelNightNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNightNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        date
        dateTime
        content
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const userByConnectionId = /* GraphQL */ `
  query UserByConnectionId(
    $connectionId: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByConnectionId(
      connectionId: $connectionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const coachingByUser = /* GraphQL */ `
  query CoachingByUser(
    $userId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCoachingDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    coachingByUser(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        stage
        activeWeek
        started
        ended
        lessons
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const likedContentBySlug = /* GraphQL */ `
  query LikedContentBySlug(
    $slug: String
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLikedContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    likedContentBySlug(
      slug: $slug
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        type
        slug
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const feedbackContentBySlug = /* GraphQL */ `
  query FeedbackContentBySlug(
    $slug: String
    $id: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFeedbackContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    feedbackContentBySlug(
      slug: $slug
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        slug
        rating
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const commentsBySlug = /* GraphQL */ `
  query CommentsBySlug(
    $slug: String
    $id: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsBySlug(
      slug: $slug
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        slug
        firstName
        lastName
        comment
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getNight = /* GraphQL */ `
  query GetNight($id: ID!) {
    getNight(id: $id) {
      id
      userId
      user {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      sourceId
      sourceName
      value
      startDate
      endDate
      totalDuration
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listNights = /* GraphQL */ `
  query ListNights(
    $filter: ModelNightFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNights(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        sourceId
        sourceName
        value
        startDate
        endDate
        totalDuration
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
