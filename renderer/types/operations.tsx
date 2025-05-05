export type DocumentOperation = 'link' | 'question' | 'cite' | 'unknown' | 'nullish'

export interface Operation<T> {
  operation: DocumentOperation;
  action: (documents: Document[], params: T ) => void;
  description?: string;
  params: T;
  accent: string; // color!
}

/** constant to turn params/operations to capitalized & human readable */
export const HUMAN_READABLE_OPERATIONS_AND_KEYS = {
  displayAs: 'Display as',
  query: 'Query',
  prompt: 'Prompt',
  contrast: 'Contrast',
  map: 'Map'
}

export const OPERATIONS: { [key: string]: Operation<any> } = {
  link: {
    operation: 'link',
    action: (documents: Document[], params: { displayAs: string }) => {
      console.log('linking documents', documents, 'with params', params);
    },
    params: {
      displayAs: {
        type: 'select',
        values: ['list', 'paragraph'],
        default: 'list'
      }
    },
    accent: 'bg-rose-500',
  },
  question: {
    operation: 'question',
    action: (documents: Document[], params: {}) => {
      console.log('asking question to documents', documents, 'with params', params);
    },
    params: {
      query: {
        type: 'text',
        default: '',
        placeholder: 'What do you want to ask?'
      }
    },
    accent: 'bg-sky-500'
  },
  cite: {
    operation: 'cite',
    action: (documents: Document[], params: {}) => {
      console.log('citing documents', documents, 'with params', params);
    },
    params: {},
    accent: 'bg-emerald-500'
  },
  'nullish': {
    operation: 'nullish',
    action: (documents: Document[], params: {}) => {
      console.log('no operation selected', documents, 'with params', params);
    },
    description: 'No operation selected. Please select an operation from the dropdown.',
    params: {},
    accent: 'bg-neutral-700'
  }
}