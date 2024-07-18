import { registerRoute, registerSidebarEntry } from '@kinvolk/headlamp-plugin/lib';
import {HeaderLabel, Link, SectionBox} from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { CrdList } from './Components/CrdList';
import { CrdDetails } from './Components/CrdDetails';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {CrList} from "./Components/MyServices";


registerSidebarEntry({
    parent: null,
    name: 'plugin',
    label: 'Plugin',
    url: '/plugin',
    icon: 'mdi:comment-quote',
});
const style = {
    p: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
};
registerRoute({
    path: '/plugin',
    sidebar: 'plugin',
    name: 'plugin',
    exact: true,
    component: () => (
        <Box display="flex" justifyContent="center" alignItems="center">
            <SectionBox textAlign="center" paddingTop={2}>
                <Typography>
                    <h1>Create Services</h1>
                </Typography>

                <List sx={style} aria-label="mailbox folders">
                    <ListItem component="a" href="plugin/crd">
                        <ListItemText
                            primaryTypographyProps={{
                                align: 'center',
                                style: { color: 'white' }
                            }}
                            primary="All services"
                        />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem component="a" href="plugin/myservices">
                        <ListItemText
                            primaryTypographyProps={{
                                align: 'center',
                                style: { color: 'white' }
                            }}
                            primary="My Services"
                        />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem component="a" href="plugin/crd">
                        <ListItemText
                            primaryTypographyProps={{
                                align: 'center',
                                style: { color: 'white' }
                            }}
                            primary="Services by category"
                        />
                    </ListItem>
                </List>
            </SectionBox>
        </Box>
    ),
});
registerRoute({
    path: '/plugin/crd',
    sidebar: 'plugin',
    name: 'Services',
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
    label: 'Services',
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


registerSidebarEntry({
    parent: 'plugin',
    name: 'MyServices',
    label: 'My Services',
    url: '/plugin/myservices',
    icon: 'mdi:comment-quote',
});
registerRoute({
    path: '/plugin/myservices',
    sidebar: 'plugin',
    name: 'MyServices',
    exact: true,
    component: () => (
        <SectionBox backLink={false}>
            <CrList/>
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
