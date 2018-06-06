export const SET_TITLE = 'SET_TITLE';
export const SET_PLACE = 'SET_PLACE';
export const SET_TAGS = 'SET_TAGS';
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const REORDER_ITEMS = 'REORDER_ITEMS';

const dispatchAndSave = (action) => (dispatch, getState, api) => {
  dispatch(action);

  const state = getState();
  if (state.canSave) api.save(state);
  return Promise.resolve();
}

export function setTitle(title) {
  return dispatchAndSave({
    type: SET_TITLE,
    title
  })
}

export function setPlace(place) {
  return dispatchAndSave({
    type: SET_PLACE,
    place
  });
}

export function setTags(tags) {
  return dispatchAndSave({
    type: SET_TAGS,
    tags
  })
}

export function addItem(item) {
  return dispatchAndSave({
    type: ADD_ITEM,
    item
  })
}

export function updateItem(item, itemIndex) {
  return dispatchAndSave({
    type: UPDATE_ITEM,
    item,
    itemIndex
  })
}

export function deleteItem(item, itemIndex) {
  return dispatchAndSave({
    type: DELETE_ITEM,
    itemIndex
  })
}

export function reorderItems(items, sourceIndex, destinationIndex) {
  return dispatchAndSave({
    type: REORDER_ITEMS,
    items,
    sourceIndex,
    destinationIndex
  })
}
