import React, { useEffect, useState } from 'react';
import { K8s } from '@kinvolk/headlamp-plugin/lib';
import Empty from '@kinvolk/headlamp-plugin/lib/components/common/EmptyContent';
import { Link, Loader, SectionBox } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useTranslation } from 'react-i18next';
import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents/Resource';

export function CrList() {
    const { t } = useTranslation(['glossary', 'translation']);
    const [crds, crdsError] = K8s.ResourceClasses.CustomResourceDefinition.useList();
    const [crList, setCrList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [crDictionnary, setCrDictionnary] = useState(new Map<String, Object>());

    useEffect(() => {
        if (crds) {
            const fetchCRs = async () => {
                const allCrs = [];
                const newCrDictionnary = new Map<String, Object>();
                for (const crd of crds) {
                    const crClass = crd.makeCRClass();
                    const [crItems, crError] = await new Promise((resolve) => {
                        crClass.apiList(
                            (items) => resolve([items, null]),
                            (err) => resolve([null, err])
                        )();
                    });

                    if (crItems && crItems.length > 0) {
                        allCrs.push(...crItems);
                        for (const item of crItems) {
                            newCrDictionnary.set(item.metadata.name, crd);
                        }
                    }
                }
                setCrList(allCrs);
                setCrDictionnary(newCrDictionnary); // Mettre à jour la variable d'état crDictionnary
                setLoading(false);
            };

            fetchCRs();
        }
    }, [crds]);

    if (loading) {
        return <Loader title={t('translation|Loading custom resource definitions')} />;
    }

    if (crdsError) {
        return (
            <Empty color="error">
                {t('translation|Error getting custom resource definitions: {{ errorMessage }}', {
                    errorMessage: crdsError,
                })}
            </Empty>
        );
    }

    if (crList.length === 0) {
        return (
            <Empty>
                {t('translation|No custom resources found.')}
            </Empty>
        );
    }
console.log("crList: ", crList);
    console.log("crDictionnary: ", crDictionnary);

    return (
        <SectionBox backLink={true}>
            <ResourceListView
                title="My services"
                headerProps={{
                    noNamespaceFilter: false,
                }}
                data={crList}
                columns={[
                    {
                        label: 'Instance name',
                        getValue: cr => {
                            return cr.metadata.name
                        }
                    },
                    {
                        label: 'Service',
                        getValue: cr => {return cr.metadata.name},
                        render: cr => {
                            const path = cr.kind.toString().toLowerCase()  + '.' + cr.jsonData.apiVersion.split('/')[0]; // Remove the part after '/'
                            return (
                            <Link
                                routeName='/plugin/crd/:name'
                                params={{
                                    name: `${crDictionnary.get(cr.metadata.name).metadata.name}`,
                                }}
                            >
                                {cr.kind} {/*crd.metadata.name*/}
                            </Link>
                        )
                        },
                    },
                    {
                        label: 'Categories',
                        getValue: cr => {
                            const categories = crDictionnary.get(cr.metadata.name).jsonData!.status.acceptedNames.categories;
                            return categories !== undefined ? categories.toString().split(',').join(', ') : '';
                        },
                    },
                    'namespace',

                    'age',
                ]}
            />
        </SectionBox>
    );
}
