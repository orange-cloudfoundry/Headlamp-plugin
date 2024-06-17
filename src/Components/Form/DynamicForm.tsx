import { useState, useEffect } from 'react';
import {CRDSchema, JSONSchemaProps} from './types';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Form from '@rjsf/core';
import { DescriptionFieldProps, RJSFSchema } from '@rjsf/utils';
import { JSONSchema7, JSONSchema7Definition  } from 'json-schema';
import validator from '@rjsf/validator-ajv8';
import {Loader} from "@kinvolk/headlamp-plugin/lib/CommonComponents";
import excludeProperties from "../../../excludeProperties.json";
import {KubeObjectInterface, KubeObject} from "@kinvolk/headlamp-plugin/lib/K8s/cluster";
import CRD from '@kinvolk/headlamp-plugin/lib/K8s/crd';
import {apply} from "@kinvolk/headlamp-plugin/lib/ApiProxy";

interface DynamicFormProps {
  schema: CRDSchema;
  crd: CRD
  onSubmit: (formData: { [key: string]: any }) => void;
}
interface CRDSpec {
  [key: string]: any;
}

/*interface CRD {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
  };
  spec: CRDSpec;
}*/
const generateLabel = (fieldName: string): string => {
  return fieldName
      .replace(/^spec\./, '') // Remove the "spec." prefix
      .replace(/([A-Z])/g, ' $1') // Add a space before each uppercase letter
      .replace(/\./g, ' ') // Replace dots with spaces
      .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
};

async function handleSave(crd:CRD, items: KubeObject){
  const item = generateCR(crd,items);
  console.log("Result: ",item);

  try {

    apply(item);
  } catch (err) {
    throw err;
  }
}

/*const generateFormFields = (schema: CRDSchema): FormField[] => {
  const processProperties = (properties: any, requiredFields: string[], parentKey: string = ''): FormField[] => {
    return Object.entries(properties).map(([key, value]) => {
      const fullName = parentKey ? `${parentKey}.${key}` : key;

      // Check if the current field is required
      const isRequired = requiredFields.includes(key);

      if (value.type === 'object' && value.properties) {
        const childRequiredFields = value.required || [];
        return [
          ...(isRequired ? [{
            name: fullName,
            type: value.type,
            description: value.description || '',
            required: isRequired,
            default: value.default,
          }] : []),
          ...processProperties(value.properties, childRequiredFields, fullName)
        ];
      }

      return isRequired ? [{
        name: fullName,
        type: value.type,
        description: value.description || '',
        required: isRequired,
        default: value.default,
      }] : [];
    }).reduce((acc, val) => acc.concat(val), []); // Flatten the array
  };

  const requiredFields = schema.required || [];
  const specProperties = schema.properties.spec ? schema.properties.spec.properties : {};
  const specRequiredFields = schema.properties.spec ? schema.properties.spec.required || [] : [];

  return processProperties(specProperties, specRequiredFields, 'spec');
};*/

const transformOneOfAnyOfAllOf = (subSchemas: JSONSchema7Definition[]): { [key: string]: JSONSchema7 } => {
  return subSchemas.reduce((acc, subSchema) => {
    if (typeof subSchema === 'object' && subSchema !== null) {
      const pattern = (subSchema as any).pattern;
      if (pattern) {
        const key = pattern.replace(/^\^|\$$/g, ''); // Remove ^ and $ from pattern
        acc[key] = { type: 'string' }; // Assuming the type is 'string'
      }
    }
    return acc;
  }, {} as { [key: string]: JSONSchema7 });
};

const transformSchema = (schema: CRDSchema, excludeList: string[]): JSONSchema7 => {
  // Only keep the spec part of the schema
  const specProperties = schema.properties.spec ? schema.properties.spec.properties : {};
  const specRequiredFields = schema.properties.spec ? schema.properties.spec.required || [] : [];

  // Exclude ResourceRef property
  const filteredProperties = Object.entries(specProperties)
      .filter(([key]) => !excludeList.includes(key))
      .reduce((acc, [key, value]) => {
        if (typeof value === 'object' && value !== null) {
          // Handle oneOf, anyOf, allOf transformations
          if (value.oneOf) {
            Object.assign(acc, transformOneOfAnyOfAllOf(value.oneOf as JSONSchema7Definition[]));
          } else if (value.anyOf) {
            Object.assign(acc, transformOneOfAnyOfAllOf(value.anyOf as JSONSchema7Definition[]));
          } else if (value.allOf) {
            Object.assign(acc, transformOneOfAnyOfAllOf(value.allOf as JSONSchema7Definition[]));
          } else {
            acc[key] = value as JSONSchema7Definition;
          }
        }
        return acc;
      }, {} as { [key: string]: JSONSchema7Definition  });


  return {
    type: "object",
    properties: {
      spec: {
        type: "object",
        properties: filteredProperties,
        required: specRequiredFields
      }
    }
  };
};



function generateCR(crd: CRD, specContent: CRDSpec): KubeObject {
  const apiVersion = crd.spec.versions?crd.spec.group +"/"+crd.spec.versions[0].name:crd.spec.group +"/V0";
 if(!crd){
   return null
 }
  console.log("crd inside: ",crd);

  const cr = {
    apiVersion: apiVersion,
    kind: crd.spec.names.kind ,
    metadata: {
      name: 'new-custom-resource', // replace with the desired name
      creationTimestamp: new Date().toISOString(), // add creation timestamp
      uid: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), // generate a random uid
    },
    spec: specContent.spec,
  };

  return cr;
}

const DescriptionFieldTemplate = (props: DescriptionFieldProps) => {
  const { description, id } = props;
  if (!description) {
    return (<div></div>);
  }else{
    return (
        <Tooltip title={description}>
            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall  css-f5io2" width={"15px"} focusable="false"
                 aria-hidden="true"
                 viewBox="0 0 24 24" data-testid="DescriptionIcon" aria-label="fontSize small">
              <path
                  d="M11.07 12.85c.77-1.39 2.25-2.21 3.11-3.44.91-1.29.4-3.7-2.18-3.7-1.69 0-2.52 1.28-2.87 2.34L6.54 6.96C7.25 4.83 9.18 3 11.99 3c2.35 0 3.96 1.07 4.78 2.41.7 1.15 1.11 3.3.03 4.9-1.2 1.77-2.35 2.31-2.97 3.45-.25.46-.35.76-.35 2.24h-2.89c-.01-.78-.13-2.05.48-3.15M14 20c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2"></path>
            </svg>
        </Tooltip>

    );
  }

};


const DynamicForm = ({schema,crd, onSubmit}: DynamicFormProps) => {
  const [formSchema, setFormSchema] = useState<JSONSchema7 | null>(null);

  useEffect(() => {
    // Transform the schema to JSONSchema7 format
    const jsonSchema = transformSchema(schema, excludeProperties.excludedProperties);    setFormSchema(jsonSchema);
  }, [schema]);

  if (!formSchema) {
    return <Loader title={'Loading form...'} />
  }

  return (
      <Form
          schema={formSchema}
          onSubmit={({ formData }) => handleSave(crd,formData)}
          validator={validator} // Adding the validator prop
          templates={{DescriptionFieldTemplate}} // Use the custom field template
      >
        <button type="submit">Create</button>
      </Form>
  );
};

export default DynamicForm;
