import api, { orgId } from '../../services/api';
import { propsToSnakeCase } from '../../services/index';

import {
  SUBSCRIPTIONS_REQUEST,
  SUBSCRIPTIONS_SUCCESS,
  SUBSCRIPTIONS_FAILURE,
  DELETE_SUBSCRIPTIONS_REQUEST,
  DELETE_SUBSCRIPTIONS_SUCCESS,
  DELETE_SUBSCRIPTIONS_FAILURE,
} from './SubscriptionConstants';

export const loadSubscriptions = (extendedParams = {}) => (dispatch) => {
  dispatch({ type: SUBSCRIPTIONS_REQUEST });

  const params = {
    ...{ organization_id: orgId },
    ...propsToSnakeCase(extendedParams),
  };

  return api
    .get('/subscriptions', {}, params)
    .then(({ data }) => {
      dispatch({
        type: SUBSCRIPTIONS_SUCCESS,
        response: data,
        search: extendedParams.search,
      });
    })
    .catch((result) => {
      dispatch({
        type: SUBSCRIPTIONS_FAILURE,
        result,
      });
    });
};

export const deleteSubscriptions = poolIds => (dispatch) => {
  dispatch({ type: DELETE_SUBSCRIPTIONS_REQUEST });

  const params = {
    pool_ids: poolIds,
  };

  return api
    .delete(`/organizations/${orgId}/upstream_subscriptions`, {}, params)
    .then(({ data }) => {
      dispatch({
        type: DELETE_SUBSCRIPTIONS_SUCCESS,
        response: data,
      });
    })
    .catch((result) => {
      dispatch({
        type: DELETE_SUBSCRIPTIONS_FAILURE,
        result,
      });
    });
};

export default loadSubscriptions;
