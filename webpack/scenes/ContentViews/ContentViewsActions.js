import { propsToSnakeCase } from 'foremanReact/common/helpers';

import api, { orgId } from '../../services/api';
import {
  CONTENT_VIEWS_REQUEST,
  CONTENT_VIEWS_SUCCESS,
  CONTENT_VIEWS_FAILURE,
} from './ContentViewsConstants';
import { apiError } from '../../move_to_foreman/common/helpers.js';

export const createContentViewsParams = (extendedParams = {}) => ({
  ...{
    organization_id: orgId(),
    include_permissions: true,
  },
  ...propsToSnakeCase(extendedParams),
});

export const loadContentViews = (extendedParams = {}) => async (dispatch) => {
  dispatch({ type: CONTENT_VIEWS_REQUEST });

  const params = createContentViewsParams(extendedParams);

  try {
    const { data } = await api.get('/content_views', {}, params);
    return dispatch({
      type: CONTENT_VIEWS_SUCCESS,
      response: data,
      search: extendedParams.search,
    });
  } catch (error) {
    return dispatch(apiError(CONTENT_VIEWS_FAILURE, error));
  }
};

export default loadContentViews;
