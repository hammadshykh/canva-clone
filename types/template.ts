// types/templates.ts
export interface Template {
 _id: string;
 _creationTime: number;
 name: string;
 jsonTemplate: any; // Consider using a more specific type if possible
 imagePreview: string;
 active: boolean;
}

// For creating new templates (without system fields)
export interface NewTemplate {
 name: string;
 jsonTemplate: any;
 imagePreview: string;
 active?: boolean; // Optional with default value
}

// For updating templates (all fields optional)
export interface TemplateUpdate {
 name?: string;
 jsonTemplate?: any;
 imagePreview?: string;
 active?: boolean;
}
