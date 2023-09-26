export interface CreateProjectAction {
    type: 'create-project'
    memberId: string
    name: string
}

export interface CreateProjectResult {
	project: Project
}

export interface GetProjectAction {
    type: 'get-project'
    memberId: string
    name: string
}

export interface GetProjectResult {
	project: Project
}

export interface CreateModuleAction {
    type: 'create-module'
    projectId: string
    moduleId: string
    name: string
}

export interface CreateModuleResult {
    module: Module
}

export interface Project {
	projectId: string
	name: string
}

export interface Module {
	moduleId: string
	name: string
}