import { renderWithRedux, patientlyWaitFor, fireEvent } from 'react-testing-lib-wrapper';

import { cvFilterDetailsKey } from '../../../ContentViewsConstants'
import nock, { nockInstance, assertNockRequest, mockAutocomplete, mockSetting } from '../../../../../test-utils/nockWrapper';
import api from '../../../../../services/api';

const cvFilterDetails = api.getApiUrl('/content_view_filters/1');
const renderOptions = { apiNamespace: cvDetailsFiltersKey(1, 1) };

test('Can call API and show filters on page load', async (done) => {
  const scope = nockInstance
    .get(cvFilterDetails)
    .query(true)
    .reply(200, {});

  const { getByText, queryByText } =
    renderWithRedux(<ContentViewFilters cvId={1} />, renderOptions);

});