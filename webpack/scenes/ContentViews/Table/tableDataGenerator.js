import React from 'react';
import { compoundExpand } from '@patternfly/react-table';
import { ScreenIcon, FolderOpenIcon, ContainerNodeIcon } from '@patternfly/react-icons';
import IconWithCount from '../components/IconWithCount';

import DetailsExpansion from '../expansions/DetailsExpansion';
import RepositoriesExpansion from '../expansions/RepositoriesExpansion';
import EnvironmentsExpansion from '../expansions/EnvironmentsExpansion';
import VersionsExpansion from '../expansions/VersionsExpansion';
import ContentViewName from '../components/ContentViewName';

export const buildColumns = () => [
  __('Name'), __('Last Published'), __('Details'),
  { title: __('Environments'), cellTransforms: [compoundExpand] },
  { title: __('Repositories'), cellTransforms: [compoundExpand] },
  { title: __('Versions'), cellTransforms: [compoundExpand] },
];

const buildRow = (contentView, openColumn) => {
  const {
    id, composite, name, environments, repositories, versions, last_published: lastPublished,
  } = contentView;
  const row = [
    { title: <ContentViewName composite={composite ? 1 : undefined} name={name} cvId={id} /> },
    lastPublished,
    { title: __('Details'), props: { isOpen: false, ariaControls: `cv-details-expansion-${id}`, contentviewid: id } },
    {
      title: <IconWithCount Icon={ScreenIcon} count={environments.length} title={`environments-icon-${id}`} />,
      props: { isOpen: false, ariaControls: `cv-environments-expansion-${id}` },
    },
    {
      title: <IconWithCount Icon={FolderOpenIcon} count={repositories.length} title={`repositories-icon-${id}`} />,
      props: { isOpen: false, ariaControls: `cv-repositories-expansion-${id}` },
    },
    {
      title: <IconWithCount Icon={ContainerNodeIcon} count={versions.length} title={`versions-icon-${id}`} />,
      props: { isOpen: false, ariaControls: `cv-versions-expansion-${id}` },
    },
  ];
  if (openColumn) row[openColumn].props.isOpen = true;

  return row;
};

const buildDetailDropdowns = (id, rowIndex, contentViewDetails) => {
  const {
    repositories, environments, versions, ...details
  } = contentViewDetails;

  const detailDropdowns = [
    {
      compoundParent: 2,
      cells: [
        {
          title: <DetailsExpansion details={details} cvId={id} />,
          props: { colSpan: 6, className: 'pf-m-no-padding', details },
        },
      ],
    },
    {
      compoundParent: 3,
      cells: [
        {
          title: <EnvironmentsExpansion environments={environments} cvId={id} />,
          props: { colSpan: 6, className: 'pf-m-no-padding' },
        },
      ],
    },
    {
      compoundParent: 4,
      cells: [
        {
          title: <RepositoriesExpansion repositories={repositories} cvId={id} />,
          props: { colSpan: 6, className: 'pf-m-no-padding', repositories },
        },
      ],
    },
    {
      compoundParent: 5,
      cells: [
        {
          title: <VersionsExpansion versions={versions} cvId={id} />,
          props: { colSpan: 6, className: 'pf-m-no-padding', versions },
        },
      ],
    },
  ];

  // The rows are indexed along with the hidden dropdown rows, so we need to offset the parent row
  const rowOffset = detailDropdowns.length + 1;
  detailDropdowns.map((dropdown) => {
    dropdown.parent = rowIndex * rowOffset;
    return dropdown;
  });

  return detailDropdowns;
};

const tableDataGenerator = (results, detailsMap, expandedColumnMap) => {
  const data = {};
  const contentViews = results || [];
  data.columns = buildColumns();
  data.rows = [];

  contentViews.map((contentView, rowIndex) => {
    const { id } = contentView;
    const openColumn = expandedColumnMap[id];
    const contentViewDetails = detailsMap[id] || {};
    const cells = buildRow(contentView, openColumn);

    data.rows.push({ isOpen: !!openColumn, cells });
    data.rows.push(...buildDetailDropdowns(id, rowIndex, contentViewDetails));
    return contentView;
  });

  return data;
};

export default tableDataGenerator;