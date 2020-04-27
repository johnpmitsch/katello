import api, { orgId } from '../../services/api';
import {
  CONTENT_VIEW_DETAILS_REQUEST,
  CONTENT_VIEW_DETAILS_SUCCESS,
  CONTENT_VIEW_DETAILS_FAILURE,
  CONTENT_VIEWS_KEY,
} from './ContentViewsConstants';
import { apiError } from '../../move_to_foreman/common/helpers.js';
import { API_OPERATIONS } from 'foremanReact/redux/API';
import { get } from 'foremanReact/redux/API';

const createContentViewsParams = () => ({
  organization_id: orgId(),
  nondefault: true,
});

export const getData = url => {
  return get({
    type: API_OPERATIONS.GET,
    key: CONTENT_VIEWS_KEY,
    url,
    params: createContentViewsParams(),
  })
};

export const loadContentViewDetails = contentViewId => async (dispatch) => {
  dispatch({
    contentViewId,
    type: CONTENT_VIEW_DETAILS_REQUEST,
  });

  try {
    const { data } = await api.get(`/content_views/${contentViewId}`);
    return dispatch({
      type: CONTENT_VIEW_DETAILS_SUCCESS,
      response: data,
      contentViewId,
    });
  } catch (error) {
    return dispatch({ contentViewId, ...apiError(CONTENT_VIEW_DETAILS_FAILURE, error) });
  }
};
