import { Editor } from '../editor'
import { Error } from '../gateway'
import { App, Project } from '../project'

export interface CreateAppAction {
    type: 'create-app'
    appId: string
    projectId: string
    name: string
}

export interface CreateAppResult {
    app?: App
    error?: Error
}

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
    editor?: Editor
    error?: Error
}

export interface CreateProjectAction {
    type: 'create-project'
    memberId: string
    name: string
}

export interface CreateProjectResult {
    project?: Project
    error?: Error
}

export interface CreateUserAction {
    type: 'create-user'
    email?: string
}
