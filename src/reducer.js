import * as storyBuilderActions from './actions';
import difference from 'lodash/difference';
import isEmpty from 'lodash/isEmpty';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const canSave = (title, place) => !isEmpty(title) && !isEmpty(place);

export default function storyBuilderReducer(state = { locale: 'en', title: undefined, place: undefined, canSave: false, availableTags: [], tags: [], content_json: [], template: [] }, action) {
  switch (action.type) {
    case storyBuilderActions.SET_TITLE:
      return {
        ...state,
        title: action.title,
        canSave: canSave(action.title, state.place)
      };
    case storyBuilderActions.SET_PLACE:
      return {
        ...state,
        place: action.place,
        canSave: canSave(state.title, action.place)
      };
    case storyBuilderActions.SET_TAGS:
      return {
        ...state,
        availableTags: difference(state.availableTags, action.tags),
        tags: action.tags
      }
    case storyBuilderActions.NEW_ITEM:
      return {
        ...state,
        content_json: [
          ...state.content_json,
          {
            ...action.item,
            editing: true,
            id: `${action.item.type}-${state.content_json.filter(i => i.type === action.item.type).length + 1}`
          }
        ]
      }
    case storyBuilderActions.NEXT_TEMPLATE_ITEM:
      return {
        ...state,
        content_json: [
          ...state.content_json,
          {
            ...state.template[0],
            editing: false
          }
        ],
        template: state.template.slice(1)
      }
    case storyBuilderActions.DELETE_ITEM:
      return {
        ...state,
        content_json: state.content_json.filter((item, idx) => idx !== action.itemIndex)
      }
    case storyBuilderActions.EDIT_ITEM:
      return {
        ...state,
        content_json: [
          ...state.content_json.slice(0, action.itemIndex).map((item) => ({ ...item, editing: false })),
          { ...state.content_json[action.itemIndex], editing: true }, // undefined so that it doesn't get passed to the API
          ...state.content_json.slice(action.itemIndex + 1).map((item) => ({ ...item, editing: false }))
        ]
      }
    case storyBuilderActions.UPDATE_ITEM:
      return {
        ...state,
        content_json: [
          ...state.content_json.slice(0, action.itemIndex),
          { ...state.content_json[action.itemIndex], ...action.item, editing: undefined }, // undefined so that it doesn't get passed to the API
          ...state.content_json.slice(action.itemIndex + 1)
        ]
      }
    case storyBuilderActions.REORDER_ITEMS:
      return {
        ...state,
        content_json: reorder(
          action.items,
          action.sourceIndex,
          action.destinationIndex
        )
      }
    default:
      return state;
  }
}
