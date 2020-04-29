import {
  selectAPIStatus,
  selectAPIError,
  selectAPIResponse,
} from 'foremanReact/redux/API/APISelectors';
import { CONTENT_VIEWS_KEY } from '../ContentViewsConstants';

export const selectContentViewDetails = (state, cvId) => selectAPIResponse(state, `${CONTENT_VIEWS_KEY}_${cvId}`) || {};

export const selectContentViewDetailStatus =
  (state, cvId) => selectAPIStatus(state, `${CONTENT_VIEWS_KEY}_${cvId}`);

export const selectContentViewDetailError =
  (state, cvId) => selectAPIError(state, `${CONTENT_VIEWS_KEY}_${cvId}`);
