import {useParams} from "react-router-dom";
import {ApiError} from "@kinvolk/headlamp-plugin/lib/ApiProxy";
import CRD from "@kinvolk/headlamp-plugin/lib/K8s/crd";
import {Loader, MainInfoSection, SectionBox} from "@kinvolk/headlamp-plugin/lib/CommonComponents";
import {CustomResourceListTable} from "./CustomResourceListTable";
import React from "react";


export function CrdDetails() {
    const {name} = useParams<{ name: string }>();
    const [error, setError] = React.useState<ApiError | null>(null);
    const [crd, setCrd] = React.useState<CRD | null>(null);

    CRD.useApiGet(setCrd, name, undefined, setError);

    console.log('item: ', crd);
    console.log('crd: ', crd);

    return !crd ? (
        <Loader title={`Loading CRD ${name}`}/>
    ) : (
        <SectionBox title={crd.metadata.name} backLink={true}>
            <MainInfoSection resource={crd}/>
            <SectionBox title="Objects">
                <CustomResourceListTable crd={crd}/>
            </SectionBox>
        </SectionBox>
    );
}