import React, { useEffect, useState } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { Split, SplitItem, GridItem, TextContent, Text, TextVariants, Label } from '@patternfly/react-core';
import { STATUS } from 'foremanReact/constants';

import {
  selectCVFilterDetails,
  selectCVFilterDetailStatus,
  selectCVFilterDetailError,
} from '../ContentViewDetailSelectors';
import { getCVFilterDetails } from '../ContentViewDetailActions';
import { capitalize } from '../../../../utils/helpers';
//import { Loading } from '../../../../components/Loading';

const ContentViewFilterDetailsHeader = ({ cvId, filterId }) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const response = useSelector(state => selectCVFilterDetails(state, cvId, filterId), shallowEqual);
  const status = useSelector(state => selectCVFilterDetailStatus(state, cvId, filterId), shallowEqual);
  const error = useSelector(state => selectCVFilterDetailError(state, cvId, filterId), shallowEqual);
  const loaded = status === STATUS.RESOLVED;

  useEffect(() => {
    dispatch(getCVFilterDetails(cvId, filterId))
  }, [])

  useEffect(() => {
    if (loaded) setDetails(response);
  }, [JSON.stringify(response), loaded])

  const { name, inclusion, description, type } = details;

  if (loaded) {
    return (
      <>
        <GridItem span={12}>
          <TextContent>
            <Text component={TextVariants.h2}>{name}</Text>
          </TextContent>
        </GridItem>
        <GridItem span={10}>
          <Split hasGutter>
            <SplitItem>
              <Label color="blue">{inclusion ? "Include" : "Exclude" }</Label>
            </SplitItem>
            <SplitItem>
              <Text component={TextVariants.p}>
                {type ? capitalize(type.replaceAll("_", " ")) : ''}
              </Text>
            </SplitItem>
          </Split>
        </GridItem>
        <GridItem span={12}>
          <TextContent>
            <Text component={TextVariants.p}>{description}</Text>
          </TextContent>
        </GridItem>
      </>
    );
  } else {
    // TODO figure out why spinner isn't working here
    return (<div>{'Loading...'}</div>);
  }
}

export default ContentViewFilterDetailsHeader;