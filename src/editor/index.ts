export interface CreateEditorAction {
    type: 'create-editor'
    editorId: string
}

export interface CreateEditorResult {
    editor: Editor
}

export interface MergeNodeAction {
    type: 'merge-node'
    documentId: string
    node: any
}

export interface Editor {
    editorId: string
}