import { GET_GROUP_MEMBERS, GET_GROUP_ADMIN, GET_GROUP_NAME, GET_GROUP_PIC } from '../constants'

export const getGroupMembers = (groupMembers) => {
  const membersIdArray = groupMembers.map(member => member.user_id)
  return {
  type: GET_GROUP_MEMBERS,
  payload: {
    groupMembers,
    membersIdArray,
  }
}
}

export const getGroupAdmin = (groupAdmin) => ({
  type: GET_GROUP_ADMIN,
  payload: groupAdmin
})

export const getGroupName = (groupName) => ({
  type: GET_GROUP_NAME,
  payload: groupName
})

export const getGroupPic = (groupPic) => ({
  type: GET_GROUP_PIC,
  payload: groupPic
})
