import { CONTENT_VIEWS_KEY } from './ContentViewsConstants';
import {
  selectAPIStatus,
  selectAPIError,
  selectAPIResponse,
} from 'foremanReact/redux/API/APISelectors';

export const selectContentViews = state => selectAPIResponse(state, CONTENT_VIEWS_KEY).results || [];

export const selectContentViewStatus = state => selectAPIStatus(state, CONTENT_VIEWS_KEY);

export const selectContentViewError = state => selectAPIError(state, CONTENT_VIEWS_KEY);

export const selectContentViewDetails = (state, cvId) => {
  return selectAPIResponse(state, `${CONTENT_VIEWS_KEY}_${cvId}`).response || {};
}

export const selectContentViewDetailStatus =
  (state, cvId) => selectAPIStatus(state, `${CONTENT_VIEWS_KEY}_${cvId}`);

export const selectContentViewDetailError =
  (state, cvId) => selectAPIError(state, `${CONTENT_VIEWS_KEY}_${cvId}`);