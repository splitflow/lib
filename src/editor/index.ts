export interface CreateEditorAction {
    type: 'create-editor'
    editorId: string
    documentJsonNode?: string
}

export interface CreateEditorResult {
    editor: Editor
}

export interface GetNodeAction {
    type: 'get-node'
    documentId: string
}

export interface GetNodeResult {
    node: any
}

export interface MergeNodeAction {
    type: 'merge-node'
    documentId: string
    node: any
}

export interface Editor {
    editorId: string
}