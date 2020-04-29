import { CONTENT_VIEWS_KEY } from './ContentViewsConstants';
import {
  selectAPIStatus,
  selectAPIError,
  selectAPIResponse,
} from 'foremanReact/redux/API/APISelectors';

export const selectContentViews = state => selectAPIResponse(state, CONTENT_VIEWS_KEY).results || [];

export const selectContentViewStatus = state => selectAPIStatus(state, CONTENT_VIEWS_KEY);

export const selectContentViewError = state => selectAPIError(state, CONTENT_VIEWS_KEY);
