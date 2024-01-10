import { Error } from '../endpoint'

export interface CreateEditorAction {
    type: 'create-editor'
    accountId: string
    editorId: string
    documentJson?: string
}

export interface CreateEditorResult {
    editor: Editor
}

export const CreateEditorEndpoint = {
    actionType: 'create-editor',
    pathname: '/accounts/:accountId/createEditor',
    subdomain: 'editor',
    getAction: (action: CreateEditorAction) => action
}

export interface GetDocumentAction {
    type: 'get-document'
    accountId: string
    editorId: string
    documentId: string
}

export interface GetDocumentResult {
    document?: any
    error?: Error
}

export const GetDocumentEndpoint = {
    actionType: 'get-document',
    pathname: '/accounts/:accountId/editors/:editorId/documents/:documentId',
    subdomain: 'editor',
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
    error?: Error
}

export const MergeDocumentEndpoint = {
    actionType: 'merge-document',
    pathname: '/accounts/:accountId/editors/:editorId/documents/:documentId/merge',
    subdomain: 'editor',
    getAction: (action: MergeDocumentAction) => action
}

export interface Editor {
    editorId: string
}
