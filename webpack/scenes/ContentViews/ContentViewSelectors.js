import { CONTENT_VIEWS_KEY } from './ContentViewsConstants';
import {
  selectAPIStatus,
  selectAPIError,
  selectAPIResponse,
} from 'foremanReact/redux/API/APISelectors';

export const selectItems = state => selectAPIResponse(state, CONTENT_VIEWS_KEY).results || [];

export const selectStatus = state => selectAPIStatus(state, CONTENT_VIEWS_KEY);

export const selectError = state => selectAPIError(state, CONTENT_VIEWS_KEY);