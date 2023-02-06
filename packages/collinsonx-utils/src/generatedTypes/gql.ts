/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query Lounge($id: String!) {\n    lounge(id: $id) {\n      name\n      location\n      openingHours\n      conditions\n      facilities\n      id\n      images {\n        url\n        height\n        width\n      }\n    }\n  }\n": types.LoungeDocument,
    "\n  query Lounges {\n    lounges {\n      id\n      name\n      location\n      images {\n        url\n      }\n    }\n  }\n": types.LoungesDocument,
    "\n  query getLoungesByName($loungeName: String!) {\n    getLoungesByName(loungeName: $loungeName) {\n      name\n      location\n      openingHours\n      conditions\n      facilities\n      id\n      images {\n        url\n        height\n        width\n      }\n    }\n  }\n": types.GetLoungesByNameDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Lounge($id: String!) {\n    lounge(id: $id) {\n      name\n      location\n      openingHours\n      conditions\n      facilities\n      id\n      images {\n        url\n        height\n        width\n      }\n    }\n  }\n"): (typeof documents)["\n  query Lounge($id: String!) {\n    lounge(id: $id) {\n      name\n      location\n      openingHours\n      conditions\n      facilities\n      id\n      images {\n        url\n        height\n        width\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Lounges {\n    lounges {\n      id\n      name\n      location\n      images {\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  query Lounges {\n    lounges {\n      id\n      name\n      location\n      images {\n        url\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getLoungesByName($loungeName: String!) {\n    getLoungesByName(loungeName: $loungeName) {\n      name\n      location\n      openingHours\n      conditions\n      facilities\n      id\n      images {\n        url\n        height\n        width\n      }\n    }\n  }\n"): (typeof documents)["\n  query getLoungesByName($loungeName: String!) {\n    getLoungesByName(loungeName: $loungeName) {\n      name\n      location\n      openingHours\n      conditions\n      facilities\n      id\n      images {\n        url\n        height\n        width\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;