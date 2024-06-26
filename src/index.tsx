import { registerRoute, registerSidebarEntry } from '@kinvolk/headlamp-plugin/lib';
import { Link, SectionBox } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { Typography } from '@mui/material';
import { CrdList } from './Components/CrdList';
import { CrdDetails } from './Components/CrdDetails';

registerSidebarEntry({
    parent: null,
    name: 'plugin',
    label: 'Plugin',
    url: '/plugin',
    icon: 'mdi:comment-quote',
});
registerRoute({
    path: '/plugin',
    sidebar: 'plugin',
    name: 'plugin',
    exact: true,
    component: () => (
        <SectionBox title="Plugin" textAlign="center" paddingTop={2}>
            <Typography>Fabulous plugin here</Typography>
            <Link routeName="/plugin/crd">{'CRD Table'}</Link>
        </SectionBox>
    ),
});
registerRoute({
    path: '/plugin/crd',
    sidebar: 'plugin',
    name: 'test',
    exact: true,
    component: () => (
        <SectionBox>
            <CrdList />
        </SectionBox>
    ),
});
registerSidebarEntry({
    parent: 'plugin',
    name: 'crd',
    label: 'CRDs',
    url: '/plugin/crd',
    icon: 'mdi:comment-quote',
});
registerRoute({
    path: '/plugin/crd/:name',
    sidebar: 'plugin',
    name: 'details',
    exact: true,
    component: () => (
        <SectionBox backLink={false}>
            <CrdDetails />
        </SectionBox>
    ),
});
registerRoute({
    path: '/plugin/crd/:name/:namespace/:crName',
    sidebar: 'plugin',
    name: 'details',
    exact: true,
    component: () => (
        <SectionBox backLink={false}>
            <CrdDetails />
        </SectionBox>
    ),
});

/*// Remove "Workloads" top level sidebar menu item
registerSidebarEntryFilter(entry => (entry.name === 'workloads' ? null : entry));
// Remove "/workloads" route
registerRouteFilter(route => (route.path === '/workloads' ? null : route));*/

/*
// Remove "s" second level sidebar menu item
registerSidebarEntryFilter(entry => (entry.name === 'namespaces' ? null : entry));
// Remove "/namespaces" route
registerRouteFilter(route => (route.path === '/namespaces' ? null : route));*/
