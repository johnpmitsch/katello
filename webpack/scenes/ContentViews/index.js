import { withRouter } from 'react-router-dom';
import ContentViewsPage from './ContentViewsPage';
import reducer from './ContentViewsReducer';

export const contentViews = reducer;

export default withRouter(ContentViewsPage);
