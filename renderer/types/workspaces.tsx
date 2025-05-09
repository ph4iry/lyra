import { createContext } from "react";

/*
terminology:
- workspace: an object containing Documents and Operations, connected with pointers (operation are just "operation"_id and documents are just slugified titles)
- document: a node in the graph, with properties like id, x, y, and source, which has information about the document's content (title, author, publisher, etc.)
- operation: a node in the graph, with properties like id, x, y, and operation, which has information about the operation type (link, summarize, etc.). these nodes are executed and produce output document nodes with links to the input documents as sources.
- node: a node in the graph, which can be either a document or an operation

available operations:
- link: asks an ai to find similarities between two documents that link them together
- summarize: asks an ai to summarize a document; takes "paragraph"/"list" as input, list by default
- query: asks an ai to find information in a document; takes a query as input
- generate: asks an ai to generate a document based on a prompt and all documents inputted to it
- contrast: asks an ai to find differences between two documents
- map: generate a mindmap from a document; takes one document as input
*/

export interface SubLyra { // a node
  id: string; // slugified title
  x: number;
  y: number;
  type: 'document' | 'operation';
}

export interface Source {
  title: string;
  publisher: string;
  author: string;
  publishedAt?: string;
}

export interface Document extends SubLyra {
  type: 'document';
  source: Source;
  createdAt: Date;
  updatedAt: Date;
}

export interface Operation extends SubLyra {
  type: 'operation';
  inputs: Document[];
  outputs: Document[];
  operation: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  documents: Document[];
  operations: Operation[];
}

export const WorkspacesContext = createContext<[Workspace[], (workspaces: Workspace[]) => void]>([
  [],
  () => {},
]);

export const ActiveWorkspaceContext = createContext<[(string | null), (ws: string | null) => void]>([
  '',
  () => {},
]);