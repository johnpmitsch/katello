export const SUBSCRIPTIONS_REQUEST = 'SUBSCRIPTIONS_REQUEST';
export const SUBSCRIPTIONS_SUCCESS = 'SUBSCRIPTIONS_SUCCESS';
export const SUBSCRIPTIONS_FAILURE = 'SUBSCRIPTIONS_FAILURE';

export const DELETE_SUBSCRIPTIONS_REQUEST = 'DELETE_SUBSCRIPTIONS_REQUEST';
export const DELETE_SUBSCRIPTIONS_SUCCESS = 'DELETE_SUBSCRIPTIONS_SUCCESS';
export const DELETE_SUBSCRIPTIONS_FAILURE = 'DELETE_SUBSCRIPTIONS_FAILURE';


export const BLOCKING_FOREMAN_TASK_TYPES = [
  'Actions::Katello::Organization::ManifestImport',
  'Actions::Katello::Organization::ManifestRefresh',
  'Actions::Katello::Organization::ManifestDelete',
  'Actions::Katello::UpstreamSubscriptions::RemoveEntitlements',
];

export const MANIFEST_TASKS_BULK_SEARCH_ID = 'activeManifestTasksSearch';
