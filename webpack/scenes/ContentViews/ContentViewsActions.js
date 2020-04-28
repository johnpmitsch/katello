import{ orgId } from '../../services/api';
import {
  CONTENT_VIEWS_KEY,
} from './ContentViewsConstants';
import { API_OPERATIONS } from 'foremanReact/redux/API';
import { get } from 'foremanReact/redux/API';

const createContentViewsParams = () => ({
  organization_id: orgId(),
  nondefault: true,
});

export const getContentViews = () => {
  return get({
    type: API_OPERATIONS.GET,
    key: CONTENT_VIEWS_KEY, 
    url: '/katello/api/content_views',
    params: createContentViewsParams(),
  })
};

export const getContentViewDetails = (cvId) => {
  return get({
    type: API_OPERATIONS.GET,
    key: `${CONTENT_VIEWS_KEY}_${cvId}`,
    url: `/katello/api/content_views/${cvId}`,
    params: {},
  })
};
