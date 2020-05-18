import { GET_ALL_GROUPS } from '../constants'

export const getAllGroups = groupsData => ({
  type: GET_ALL_GROUPS,
  payload: groupsData,
})