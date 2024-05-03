import { Error } from '../endpoint'

export interface CreateEditorAction {
    type: 'create-editor'
    accountId: string
    editorId: string
    docJson?: string
}

export interface CreateEditorResult {
    editor: Editor
}

export const CreateEditorEndpoint = {
    actionType: 'create-editor',
    pathname: '/accounts/:accountId/create-editor',
    subdomain: 'editor',
    getAction: (action: CreateEditorAction) => action
}

export interface CreateDocumentAction {
    type: 'create-document'
    accountId: string
    editorId: string
    documentId: string
}

export interface CreateDocumentResult {
    document?: Document
    error?: Error<'unknown-editor'>
}

export const CreateDocumentEndpoint = {
    actionType: 'create-document',
    pathname: '/accounts/:accountId/editors/:editorId/create-document',
    subdomain: 'editor',
    authorization: false,
    getAction: (action: CreateDocumentAction) => action
}

export interface UpdateDocumentAction {
    type: 'update-document'
    accountId: string
    editorId: string
    documentId: string
    name?: string
}

export interface UpdateDocumentResult {
    document?: Document
    error?: Error<'unknown-document'>
}

export const UpdateDocumentEndpoint = {
    actionType: 'update-document',
    pathname: '/accounts/:accountId/editors/:editorId/documents/:documentId/update',
    subdomain: 'editor',
    authorization: false,
    getAction: (action: UpdateDocumentAction) => action
}

export interface ListDocumentsAction {
    type: 'list-documents'
    accountId: string
    editorId: string
}

export interface ListDocumentsResult {
    documents?: any[]
}

export const ListDocumentsEndpoint = {
    actionType: 'list-documents',
    pathname: '/accounts/:accountId/editors/:editorId/documents',
    subdomain: 'editor',
    method: 'GET',
    authorization: false,
    getAction: (action: ListDocumentsAction) => action
}

export interface GetDocAction {
    type: 'get-doc'
    accountId: string
    editorId: string
    documentId: string
}

export interface GetDocResult {
    doc?: any
    error?: Error<'unknown-document'>
}

export const GetDocEndpoint = {
    actionType: 'get-doc',
    pathname: '/accounts/:accountId/editors/:editorId/documents/:documentId/doc',
    subdomain: 'editor',
    method: 'GET',
    authorization: false,
    getAction: (action: GetDocAction) => action
}

export interface MergeDocAction {
    type: 'merge-doc'
    accountId: string
    editorId: string
    documentId: string
    doc: any
}

export interface MergeDocResult {
    error?: Error<'unknown-document'>
}

export const MergeDocEndpoint = {
    actionType: 'merge-doc',
    pathname: '/accounts/:accountId/editors/:editorId/documents/:documentId/merge-doc',
    subdomain: 'editor',
    authorization: false,
    getAction: (action: MergeDocAction) => action
}

export interface Editor {
    editorId: string
    accountId: string
}

export interface Document {
    documentId: string
    editorId: string
    accountId: string
    name?: string
}

// to remove
export interface GetDocumentAction {
    type: 'get-document'
    accountId: string
    editorId: string
    documentId: string
}

export interface GetDocumentResult {
    document?: any
    error?: Error<'unknown-document'>
}

export const GetDocumentEndpoint = {
    actionType: 'get-document',
    pathname: '/accounts/:accountId/editors/:editorId/documents/:documentId',
    subdomain: 'editor',
    method: 'GET',
    authorization: false,
    getAction: (action: GetDocumentAction) => action
}

export interface MergeDocumentAction {
    type: 'merge-document'
    accountId: string
    editorId: string
    documentId: string
    document: any
}

export interface MergeDocumentResult {
    error?: Error<'unknown-document'>
}

export const MergeDocumentEndpoint = {
    actionType: 'merge-document',
    pathname: '/accounts/:accountId/editors/:editorId/documents/:documentId/merge',
    subdomain: 'editor',
    authorization: false,
    getAction: (action: MergeDocumentAction) => action
}