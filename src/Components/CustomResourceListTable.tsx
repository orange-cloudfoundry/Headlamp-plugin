import React, { useMemo } from 'react';
import { KubeObject } from '@kinvolk/headlamp-plugin/lib/k8s/cluster';
import { localeDate } from '@kinvolk/headlamp-plugin/lib/util';
import Empty from '@kinvolk/headlamp-plugin/lib/CommonComponents/EmptyContent';
import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents/Resource';
import { ResourceTableColumn, ResourceTableProps } from '@kinvolk/headlamp-plugin/lib/CommonComponents/Resource/ResourceTable';
import { JSONPath } from 'jsonpath-plus';
import CRD, {KubeCRD} from "@kinvolk/headlamp-plugin/lib/K8s/crd";
import CustomResourceDefinition from "@kinvolk/headlamp-plugin/lib/K8s/crd";
import {Link} from "@kinvolk/headlamp-plugin/lib/CommonComponents";

console.log("okok");
console.log("Empty: ", Empty);
console.log("ResourceListView: ", ResourceListView);
console.log("CRD: ", CRD);
console.log("CustomResourceDefinition: ", CustomResourceDefinition);

function getValueWithJSONPath(item: KubeCRD, jsonPath: string): string {
    let value: string | undefined;
    try {
        // Extract the value from the json item
        value = JSONPath({ path: '$' + jsonPath, json: item.jsonData });
    } catch (err) {
        console.error(`Failed to get value from JSONPath ${jsonPath} on CR item ${item}`);
    }

    // Make sure the value will be represented in string form (to account for
    // e.g. cases where we may get an array).
    return value?.toString() || '';
}


export interface CustomResourceTableProps {
    crd: CRD;
    title?: string;
}

function CustomResourceLink(props: { crd: CustomResourceDefinition, resource: KubeObject }) {
    return null;
}

export function CustomResourceListTable(props: CustomResourceTableProps) {
    const { crd, title = '' } = props;

    const apiGroup = React.useMemo(() => {
        return crd.getMainAPIGroup();
    }, [crd]);

    const CRClass = React.useMemo(() => {
        return crd.makeCRClass();
    }, [crd]);

    if (!CRClass) {
        return <Empty>{'No custom resources found'}</Empty>;
    }
    const additionalPrinterCols = React.useMemo(() => {
        const currentVersion = apiGroup[1];
        const colsFromSpec =
            crd.jsonData.spec.versions.find(
                (version: KubeCRD['spec']['versions'][number]) => version.name === currentVersion
            )?.additionalPrinterColumns || [];
        // @ts-ignore
        const cols: ResourceTableColumn<KubeCRD>[] = [];
        for (let i = 0; i < colsFromSpec.length; i++) {
            const idx = i;
            const colSpec = colsFromSpec[idx];
            // Skip creation date because we already show it by default
            if (colSpec.jsonPath === '.metadata.creationTimestamp') {
                continue;
            }

            cols.push({
                label: colSpec.name,
                getValue: resource => {
                    let value = getValueWithJSONPath(resource, colSpec.jsonPath);
                    if (colSpec.type === 'date') {
                        value = localeDate(new Date(value));
                    }
                    return value;
                },
                render: (resource: KubeObject) => {
                    const value = getValueWithJSONPath(resource, colSpec.jsonPath);
                    const namespace = resource.metadata.namespace;
                    if (colSpec.name === "CONNECTION-SECRET") {
                        return <Link routeName={"Secret"} params={{namespace: namespace, name: value}}>{value}</Link>

                    } else {
                        return <span>{getValueWithJSONPath(resource, colSpec.jsonPath)}</span>;
                    }
                }
            });
        }

        return cols;
    }, [crd, apiGroup]);

    const cols = React.useMemo(() => {
        // @ts-ignore
        const colsToDisplay: ResourceTableProps<KubeCRD>['columns'] = [
            {
                label: 'Name',
                getValue: resource => resource.metadata.name,
                //render: (resource: KubeObject) => <CustomResourceLink resource={resource} crd={crd} />,
    },
    ...additionalPrinterCols,
            'age',
    ];

        if (crd.isNamespaced) {
            colsToDisplay.splice(1, 0, 'namespace');
        }

        return colsToDisplay;
    }, [crd, additionalPrinterCols]);
    return (
        <ResourceListView
            title={""}
    headerProps={{
        noNamespaceFilter: true,
    }}
    resourceClass={CRClass}
    columns={cols}
    />
);
}