
export const filterHot = state => {
  return state.hot
    ? state.hot
    : []
}

export const filterLatest = state => {
  return state.latest
    ? state.latest
    : []
}

export const filterFind = state => {
  return state.find
    ? state.find
    : []
}

export const menulist = state => {
  return state.menulist
    ? state.menulist
    : []
}

export const tablist = state => {
  return state.tabList
    ? state.tabList
    : []
}

export const popupVisible = state => {
  return state.popupVisible
    ? state.popupVisible
    : false
}

export const active = state => {
  return state.active
    ? state.active
    : 0
}
