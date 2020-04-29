import React from 'react';
import { useEffect } from "react";
import { getContentViewDetails } from '../ContentViewsActions';
import { useDispatch } from "react-redux";

const DetailsContainer = ({ children, cvId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContentViewDetails(cvId));
  }, []);

  return (<React.Fragment>{children}</React.Fragment>)
}

export default DetailsContainer;