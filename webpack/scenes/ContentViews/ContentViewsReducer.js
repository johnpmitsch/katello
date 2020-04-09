import Immutable from 'seamless-immutable';

import { initialApiState } from '../../services/api';

import {
  CONTENT_VIEWS_REQUEST,
  CONTENT_VIEWS_SUCCESS,
  CONTENT_VIEWS_FAILURE,
} from './ContentViewsConstants';

const initialState = Immutable({
  ...initialApiState,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case CONTENT_VIEWS_REQUEST:
      return state.set('loading', true);

    case CONTENT_VIEWS_SUCCESS: {
      const {
        page,
        per_page, // eslint-disable-line camelcase
        subtotal,
        results,
      } = action.response;

      return state.merge({
        results,
        loading: false,
        pagination: {
          page: Number(page),
          // eslint-disable-next-line camelcase
          perPage: Number(per_page || state.pagination.perPage),
        },
        itemCount: Number(subtotal),
      });
    }

    case CONTENT_VIEWS_FAILURE:
      return state
        .set('loading', false)
        .set('results', []);

    default:
      return state;
  }
};
