import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';

// Interface pour le schéma CRD
export interface CRDSchema {
  description?: string;
  properties: {
    spec: {
      properties: {
        [key: string]: JSONSchemaProps;
      };
      required?: string[];
    };
  };
  required?: string[];
  type: string;
}

// Interface pour les propriétés JSON Schema compatible avec JSONSchema7
export interface JSONSchemaProps extends JSONSchema7 {
  type: JSONSchema7TypeName | JSONSchema7TypeName[];
  oneOf?: JSONSchemaProps[]; // Ajouter le support pour oneOf
}
