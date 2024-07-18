import { Link, ResourceListView, SectionBox } from '@kinvolk/headlamp-plugin/lib/components/common';
import { K8s } from '@kinvolk/headlamp-plugin/lib';
import logo from './image/no_image_icon.png'
import React, { useMemo } from 'react';

// In documentation, you need to go to API > Classes > Pod or Custom resource definition. The methods and attribute are described there
export function CrdList() {


    // @ts-ignore
    return (
        <SectionBox backLink={true}>
            <ResourceListView
                title="List of services"
                headerProps={{
                    noNamespaceFilter: true,
                }}
                resourceClass={K8s.ResourceClasses.CustomResourceDefinition}
                columns={[
                    {
                        label: 'Logo',
                        gridTemplate: '80px',
                        render: crd => {
                            const annotations = crd.jsonData!.metadata?.annotations;
                            let src = "./image/stop_lock_icon.svg"; // default src
                            if (annotations !== undefined) {
                                src = annotations['logo-url'];
                            }
                            return (
                                <img
                                    src={logo}
                                    alt={"alt"}
                                    style={{height: '24px', width: '24px'}}
                                />
                            );
                        }
                    },
                    {
                        label: 'Name',
                        gridTemplate: '250px',
                        getValue: crd => {return crd.metadata.name},
                        render: crd => (
                            <Link
                                routeName="/plugin/crd/:name"
                                params={{
                                    name: crd.metadata.name,
                                }}
                            >
                                {crd.spec.names.kind} {/*crd.metadata.name*/}
                            </Link>
                        ),
                    },

                    {
                        label: 'Versions',
                        getValue: crd => crd.spec.versions.map(version => version.name).join(', '),
                    },
                    {
                        label: 'Categories',
                        getValue: crd => {
                            const categories = crd.jsonData!.status.acceptedNames.categories;
                            return categories !== undefined ? categories.toString().split(',').join(', ') : '';
                        },
                    },
                    {
                        label: 'Scope',
                        getValue: crd => crd.spec.scope,
                    },
                    'age',
                ]}
            />
        </SectionBox>
    );
}
