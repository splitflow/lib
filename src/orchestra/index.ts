import { Editor } from '../editor'

export interface CreateEditorAction {
    type: 'create-editor'
    accountEmail: string
    editorId: string
    editorName: string
    documentJsonNode?: string
    styleJsonNode?: string
    configJsonNode?: string
}

export interface CreateEditorResult {
    editor: Editor
}

export interface CreateUserAction {
    type: 'create-user'
    email?: string
}
