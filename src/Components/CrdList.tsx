import {Link, ResourceListView, SectionBox } from "@kinvolk/headlamp-plugin/lib/components/common";
import CRD from '@kinvolk/headlamp-plugin/lib/K8s/crd';
import {K8s} from "@kinvolk/headlamp-plugin/lib";


// In documentation, you need to go to API > Classes > Pod or Custom resource definition. The methods and attribute are described there
export function CrdList() {
    const [crds, error] = K8s.ResourceClasses.CustomResourceDefinition.useList();


    // @ts-ignore
    return (
        <SectionBox backLink={true}>
            <ResourceListView
                title="Custom Resource Definitions"
                headerProps={{
                    noNamespaceFilter: true,
                }}
                resourceClass={CRD}
                columns={[
                    {
                        label: 'Name',
                        getValue: crd => crd.metadata.name,
                        render: crd => (
                            <Link
                                routeName="/plugin/crd/:name"
                                params={{
                                    name: crd.metadata.name,
                                }}
                            >
                                {crd.metadata.name}
                            </Link>
                        ),
                    },

                    {
                        label: 'Resource',
                        getValue: crd => crd.spec.names.kind,
                        render: crd => (
                            <Link
                                routeName="customresources"
                                params={{
                                    crd: crd.metadata.name,
                                }}
                            >
                                {crd.spec.names.kind}
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
                    'age',
                ]}
            />
        </SectionBox>
    );
}