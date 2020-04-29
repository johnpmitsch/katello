import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { STATUS } from 'foremanReact/constants';
import { getContentViewDetails } from './ContentViewDetailActions';
import { selectContentViewDetails, selectContentViewDetailStatus, selectContentViewDetailError } from './ContentViewDetailSelectors'
import Loading from '../Table/Loading';

const DetailsContainer = ({ children, cvId, isOpen }) => {
  const dispatch = useDispatch();
  const details = useSelector(state => selectContentViewDetails(state, cvId), shallowEqual);
  const status = useSelector(state => selectContentViewDetailStatus(state, cvId), shallowEqual);
  const error = useSelector(state => selectContentViewDetailError(state, cvId), shallowEqual);

  useEffect(() => {
    if (isOpen && Object.keys(details).length === 0) {
      dispatch(getContentViewDetails(cvId));
    }
  });

  if (status === STATUS.PENDING) return (<Loading size="sm"/>);
  // Can we display the error message?
  if (status === STATUS.ERROR) return (<EmptyStateMessage error={error} />);
  if (status === STATUS.RESOLVED) return (<React.Fragment>{children}</React.Fragment>);
};

export default DetailsContainer;
