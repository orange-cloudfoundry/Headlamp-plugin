import {
    registerRoute,
    registerRouteFilter,
    registerSidebarEntry,
    registerSidebarEntryFilter,
    K8s,
} from '@kinvolk/headlamp-plugin/lib';
import { SectionBox } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import Typography from '@mui/material/Typography';
import React from 'react';

registerSidebarEntry({
    parent: null,
    name: 'CRD',
    label: "CRD List",
    url: '/crd',
    icon: 'mdi:list-box-outline',
});


// In documentation, you need to go to API > Classes > Pod or Custom resource definition. The methods and attribute are described there
function PodCounter() {
    const [crds, error] = K8s.ResourceClasses.CustomResourceDefinition.useList();

    return (
        <div>
            {!error ? (
                crds?.map((crd) => (
                    <Typography key={crd.metadata.uid} color="textPrimary" sx={{fontStyle: 'italic'}}>
                        {crd.metadata.name}
                    </Typography>
                ))
            ) : (
                <Typography color="error">Uh, something went wrong while fetching CRDs!</Typography>
            )}
        </div>
    );
}
// Add components and routes for the three different side bar items.
// This component rendered at URL: /c/mycluster/feedback2
registerRoute({
    path: '/crd',
    sidebar: 'cluster',
    name: 'CRD',
    exact: true,
    component: () => (
        <SectionBox title="CRD" textAlign="center" paddingTop={2}>
            <PodCounter />
        </SectionBox>
    ),
});


// Remove "Workloads" top level sidebar menu item
registerSidebarEntryFilter(entry => (entry.name === 'workloads' ? null : entry));
// Remove "/workloads" route
registerRouteFilter(route => (route.path === '/workloads' ? null : route));

// Remove "Namespaces" second level sidebar menu item
registerSidebarEntryFilter(entry => (entry.name === 'namespaces' ? null : entry));
// Remove "/namespaces" route
registerRouteFilter(route => (route.path === '/namespaces' ? null : route));