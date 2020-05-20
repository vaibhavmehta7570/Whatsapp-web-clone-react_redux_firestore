import { GET_ALL_GROUPS, UPDATE_A_GROUP } from '../constants'

export const getAllGroups = groupsData => ({
  type: GET_ALL_GROUPS,
  payload: groupsData,
})

export const updateGroupData = group => ({
  type: UPDATE_A_GROUP,
  payload: group,
})