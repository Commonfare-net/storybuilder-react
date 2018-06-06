export const SET_TITLE = 'SET_TITLE';
export const SET_PLACE = 'SET_PLACE';
export const SET_TAGS = 'SET_TAGS';
export const NEW_ITEM = 'NEW_ITEM';
export const NEXT_TEMPLATE_ITEM = 'NEXT_TEMPLATE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
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

export function newItem(item) {
  return dispatchAndSave({
    type: NEW_ITEM,
    item
  })
}

export function nextTemplateItem() {
  return dispatchAndSave({
    type: NEXT_TEMPLATE_ITEM
  })
}

export function editItem(itemIndex) {
  return dispatch => {
    dispatch({
      type: EDIT_ITEM,
      itemIndex
    })
    return Promise.resolve();
  }
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
