import React from 'react';
import axios from 'axios';
import { renderWithApiRedux, waitFor } from 'react-testing-lib-wrapper';

import ContentViewsPage from '../../ContentViews';
import CONTENT_VIEWS_KEY from '../ContentViewsConstants';
import { mockReset, mock as mockApi } from '../../../mockRequest';

const cvIndexData = require('./contentViewList.fixtures.json');

let firstCV;
beforeEach(() => {
  const { results } = cvIndexData;
  [firstCV] = results;
});

afterEach(() => {
  mockReset();
});

test('Can call API for CVs and show on screen on page load', async () => {
  const cvIndexPath = '*/katello/api/content_views';
  // Spying on axios so we can ensure the API call was made
  const apiSpy = jest.spyOn(axios, 'get');
  // Mocking API call so it retuns the fixture data
  mockApi.onGet(cvIndexPath).reply(200, cvIndexData);
  // Using a custom rendering function that sets up both redux and react-router.
  // This allows us to use the component as it is normally used
  const renderOptions = { namespace: CONTENT_VIEWS_KEY };
  const { queryByText } = renderWithApiRedux(<ContentViewsPage />, renderOptions);

  // Assert that the CV is not showing by searching by name and the query returning null
  expect(queryByText(firstCV.name)).toBeNull();
  // Assert that the API was called with the correct path and allow any parameters
  await waitFor(() => expect(apiSpy).toHaveBeenCalledWith(cvIndexPath, expect.anything()));
  // Assert that the CV name is now showing on the screen, but wait for it to appear.
  await waitFor(() => expect(queryByText(firstCV.name)).toBeTruthy());
});
