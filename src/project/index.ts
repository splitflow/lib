import { Error } from "../gateway"

export interface CreateProjectAction {
    type: 'create-project'
    memberId: string
    name: string
}

export interface CreateProjectResult {
	project?: Project
}

export interface GetProjectAction {
    type: 'get-project'
    memberId: string
    name: string
}

export interface GetProjectResult {
	project?: Project
    error?: Error<'not-found'>
}

export interface CreateAppAction {
    type: 'create-app'
    appId: string
    projectId?: string
    name: string
}

export interface CreateAppResult {
    app?: App
    error?: Error<'unknown-project'>
}

export interface CreateModuleAction {
    type: 'create-module'
    moduleId: string
    name: string
    projectId?: string
    memberId?: string
    projectName?: string
}

export interface CreateModuleResult {
    module?: Module
    error?: Error<'unknown-project'>
}

export interface Project {
	projectId: string
	name: string
}

export interface App {
	appId: string
	name: string
}

export interface Module {
	moduleId: string
	name: string
}