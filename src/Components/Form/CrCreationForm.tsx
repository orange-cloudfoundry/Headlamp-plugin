import { useState, useEffect } from 'react';
import DynamicForm from './DynamicForm';
import { Loader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { CRDSchema } from './types';
import CRD from '@kinvolk/headlamp-plugin/lib/K8s/crd';

// TODO change in order to get the actual CRD name (from the url for exemple)

const getCrdSchema = async crdName => {
  const response = await fetch(
    `/apis/apiextensions.k8s.io/v1/customresourcedefinitions/${crdName}`
  );
  const crd = await response.json();
  return crd.spec.versions[0].schema.openAPIV3Schema;
};

// TODO Change in order to use same functions as in the editorDialog
const createCustomResource = async (namespace, crdName, resource) => {
  const response = await fetch(`/apis/${crdName}/v1/namespaces/${namespace}/${resource.kind}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resource),
  });
  return response.json();
};

const handleFormSubmit = async formData => {
  const resource = {
    apiVersion: 'example.com/v1',
    kind: 'ExampleResource',
    metadata: {
      name: formData.name,
    },
    spec: formData,
  };
  const namespace = 'default'; // or get it dynamically
  const crdName = 'examplecrd.example.com'; // or get it dynamically
  await createCustomResource(namespace, crdName, resource);
  alert('Resource created successfully');
};

export function CustomResourceForm({ crd }: { crd: CRD }) {
  const [schema, setSchema] = useState<CRDSchema | null>(null);

  useEffect(() => {
    if (crd) {
      setSchema(crd.jsonData!.spec.versions[0].schema.openAPIV3Schema);
    }
  }, [crd]);
  console.log('schema: ', schema);
  //console.log('crd: ', crd);
  console.log('jsonData: ', crd.jsonData!.spec.versions[0]);
  if (!schema) return <Loader title={'Loading form...'} />;

  return <DynamicForm schema={schema} onSubmit={handleFormSubmit} crd={crd} />;
}
