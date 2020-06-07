import { updateTagQuestionSuccess, addTagQuestionSuccess, deleteTagQuestionSuccess } from './../actions/tag-question.action';
import { loadTagsSuccess, addTagSuccess, deleteTagSuccess, updateTagSuccess } from '../actions/tags.actions';
import { ITag, ITagQuestion } from './../../tags.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { sortByDesc } from 'src/app/shared/util/sort';
import * as _ from 'lodash';

export interface TagsState extends EntityState<ITag> {
}
export const adapter: EntityAdapter<ITag> = createEntityAdapter<ITag>({});
export const initialState: TagsState = adapter.getInitialState({

});
const tagsReducer = createReducer(
  initialState,
  on(deleteTagQuestionSuccess, (state, action) => {
    const tags = Object.values(Object.assign([], state.entities));
    let tag = tags.find(t => t.questions.find(tg => tg.id === action.deleted.id));
    /* mutate the state, hack it 😁 */
    if (tag) {
      _.remove(tag.questions, (o) => o.id === action.deleted.id);
    }
    return state;
  }),
  on(addTagQuestionSuccess, (state, action) => {
    /* insert tag question to tag item */
    let tags = Object.values(state.entities);
    const tag = tags.find(t => t.id === action.created.tag.id);

    let newTag: ITag;
    if (tag && !tag.questions.includes(action.created)) {
      newTag = Object.assign({}, tag, tag.questions.push(action.created));
      return adapter.addOne(newTag, state)
    }
  }),
  on(updateTagQuestionSuccess, (state, action) => {
    /* update the question inside the tag object, so that we dont need to refresh the whole tag list */
    let tags = Object.values(state.entities);
    const changes = tags.find(t => t.questions.find(tg => tg.id === action.updated.id));
    changes.questions.forEach(question => {
      if (question.id === action.updated.id) {
        question = action.updated;
      }
    });
    /* just return if it has changes or not, just to prevent the ui from refreshing */
    return adapter.updateOne({ id: action.updated.id, changes }, state);
  }),
  on(updateTagSuccess, (state, action) => {
    return adapter.updateOne({ id: action.updated.id, changes: action.updated }, state)
  }),
  on(deleteTagSuccess, (state, action) => {
    return adapter.removeOne(action.deleted.id, state)
  }),
  on(addTagSuccess, (state, action) => {
    return adapter.addOne(action.created, state)
  }),
  on(loadTagsSuccess, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  })
);
export function TagsReducer(state: TagsState, action: Action) {
  return tagsReducer(state, action);
}
export const getTags = (state: TagsState) => {
  const contracts: ITag[] = state && state.entities ? Object.values(state.entities) : null;
  return contracts && contracts.sort((a: ITag, b: ITag) => sortByDesc(a, b, 'created_at'));
};
