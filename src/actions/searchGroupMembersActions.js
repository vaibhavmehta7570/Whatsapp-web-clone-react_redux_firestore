import { GET_SEARCHED_MEMBERS, ADD_GROUP_MEMBER, REMOVE_GROUP_MEMBER } from '../constants'

export const getSearchedMembers = members => ({
  type: GET_SEARCHED_MEMBERS,
  payload: members,
})

export const addGroupMember = members => ({
  type: ADD_GROUP_MEMBER,
  payload: members,
})

export const removeGroupMember = members => ({
  type: REMOVE_GROUP_MEMBER,
  payload: members,
})