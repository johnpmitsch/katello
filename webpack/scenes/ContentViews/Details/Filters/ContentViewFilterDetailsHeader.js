import React, { useEffect, useState } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { Split, SplitItem, GridItem, TextContent, Text, TextVariants, Label } from '@patternfly/react-core';
import { STATUS } from 'foremanReact/constants';

import RepoIcon from '../Repositories/RepoIcon';
import {
  selectCVFilterDetails,
  selectCVFilterDetailStatus,
  selectCVFilterDetailError,
} from '../ContentViewDetailSelectors';
import { getCVFilterDetails } from '../ContentViewDetailActions';
import { capitalize } from '../../../../utils/helpers';
//import { Loading } from '../../../../components/Loading';

const ContentViewFilterDetailsHeader = ({ cvId, filterId, repoType }) => {
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

  const { type, name, inclusion, description } = details;

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
              <RepoIcon type={repoType} />
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
    return (<div>{'Loading...'}</div>);
  }
}

export default ContentViewFilterDetailsHeader;