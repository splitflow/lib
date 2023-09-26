export interface CreateEditorAction {
    type: 'create-editor'
    projectId: string
    name: string
}

export interface CreateUserAction {
    type: 'create-user'
    email?: string
}