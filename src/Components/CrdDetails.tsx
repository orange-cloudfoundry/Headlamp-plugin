import { useParams } from 'react-router-dom';
import { ApiError } from '@kinvolk/headlamp-plugin/lib/ApiProxy';
import CRD from '@kinvolk/headlamp-plugin/lib/K8s/crd';
import {Loader, MainInfoSection, NameValueTableRow, SectionBox} from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { CustomResourceListTable } from './CustomResourceListTable';
import React from 'react';
import { NewCrButton } from './Form/NewCrButton';
import {K8s} from "@kinvolk/headlamp-plugin/lib";

export function CrdDetails() {
    const { name } = useParams<{ name: string }>();
    const [error, setError] = React.useState<ApiError | null>(null);
    const [crd, setCrd] = React.useState<CRD | null>(null);

    K8s.ResourceClasses.CustomResourceDefinition.useApiGet(setCrd, name, undefined, setError);


    const categoriesValue = crd
        ? crd.jsonData!.status.acceptedNames.categories?.toString().split(',').join(', ') || ''
        : '';
    const description = crd?.metadata.description ?crd?.metadata.description:'No description provided';


    const categories:NameValueTableRow[] = [
        {
            name: 'Categories',
            value: categoriesValue,
        },
        {
            name: 'Description',
            value: description,
        },
    ]

    return !crd ? (
        <Loader title={`Loading CRD ${name}`} />
    ) : (
        <SectionBox title={crd.metadata.name} backLink={true}>
            <MainInfoSection resource={crd}  backLink={null} extraInfo={categories} actions={[<NewCrButton crd={crd} />]} />
            <SectionBox title="Objects" >
                <CustomResourceListTable crd={crd} />
            </SectionBox>
        </SectionBox>
    );
}
