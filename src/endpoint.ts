import { match, pathname, search } from '@splitflow/core/pathname'

export interface Action {
    type: string
}

export interface Result {
    error?: Error
}

export interface Error<C extends string = string> {
    code: C
    message: string
}

export interface ActionEndpoint<A extends Action> {
    actionType: string
    pathname: string
    subdomain: string
    method?: string
    authorization?: boolean
    getAction?: (action: A) => A
}

export function actionRequestX<A extends Action>(action: A, endpoint: ActionEndpoint<A>) {
    if (action.type !== endpoint.actionType) throw new Error('action type missmatch')

    const subdomain = endpoint.subdomain
    const { type, ...body } = action
    const _pathname = pathname(endpoint.pathname, body, { consume: true })

    let port
    switch (subdomain) {
        case 'account':
            port = 49724
            break
        case 'auth':
            port = 8787
            break
        case 'design':
            port = 58032
            break
        case 'editor':
            port = 58043
            break
        case 'project':
            port = 49724
            break
        case 'orca':
            port = 49707
            break
    }

    if (_pathname) {
        let request: Request

        if (endpoint.method === 'GET') {
            request = new Request(
                `http://localhost:${port}${_pathname}${search(body)}`,
                //`https://${subdomain}.splitflow.workers.dev${_pathname}`
                {
                    credentials: 'include'
                }
            )
        } else {
            request = new Request(
                `http://localhost:${port}${_pathname}`,
                //`https://${subdomain}.splitflow.workers.dev${_pathname}`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }
            )
        }

        if (endpoint.authorization ?? true) {
            request.headers.set('authorization', 'bearer TOKEN')
        }
        return request
    }
    throw new Error(`unable to create request from action ${action.type}`)
}

export async function getActionX<A extends Action>(request: Request, endpoint: ActionEndpoint<A>) {
    if (request.method !== (endpoint.method ?? 'POST')) throw new Error('request method missmatch')

    const url = new URL(request.url)
    const pathParams = match(endpoint.pathname, url.pathname)

    if (pathParams) {
        const type = endpoint.actionType
        
        let body: any
        if (request.method === 'POST') {
            body = await request.json()
        } else {
            body = { ...url.searchParams }
        }

        return {
            ...body,
            ...pathParams,
            type
        } as A
    }

    throw new Error('unable to create action from request')
}

export function actionRequest(endpoint: string, action: Action) {
    /*
    let port
    switch (endpoint) {
        case 'account':
            port = 49724
            break
        case 'design':
            port = 58032
            break
        case 'editor':
            port = 58043
            break
        case 'project':
            port = 49724
            break
        case 'orca':
            port = 49707
            break
    }
    */

    endpoint = endpoint === 'orca' ? 'orchestra' : endpoint

    return new Request(
        //`http://localhost:${port}/${action.type}`,
        `https://${endpoint}.splitflow.workers.dev/${action.type}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action)
        }
    )
}

export async function getAction<A extends Action>(request: Request) {
    const url = new URL(request.url)
    const [, type] = url.pathname.split('/')

    const action = (await request.json()) as A
    action.type = type

    return action
}

export async function getResult<R>(response: Response | Promise<Response>) {
    response = await Promise.resolve(response)

    if (response.status === 200 || response.status === 400) {
        return response.json() as Promise<R>
    }

    throw new Error(response.statusText)
}

export async function errorResponse(status: number, error: string) {
    return new Response(JSON.stringify({ error }), { status })
}

export function firstError(results: Result[]): Result {
    for (const result of results) {
        if (result?.error) return result
    }
}
