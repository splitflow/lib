import { match, pathname, search } from '@splitflow/core/pathname'

const browser = typeof document !== 'undefined'

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
    credentials?: boolean
    getAction?: (action: A) => A
    getRequest?: (request: Request) => Request
}

export function actionRequestX<A extends Action>(
    action: A,
    endpoint: ActionEndpoint<A>,
    request?: Request
) {
    if (action.type !== endpoint.actionType) throw new Error('action type missmatch')

    let subdomain = endpoint.subdomain
    const { type, ...body } = action
    const _pathname = pathname(endpoint.pathname, body, { consume: true })

    /*
    let port: number
    switch (subdomain) {
        case 'account':
            port = 49738
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
    */

    subdomain = subdomain === 'orca' ? 'orchestra' : subdomain

    if (_pathname) {
        let _request: Request
        let init: RequestInit = {}

        if (browser && (endpoint.credentials ?? false)) {
            // credentials is not supported in cloudflare workers
            // only use it in a browser
            init.credentials = 'include'
        }

        if (endpoint.method === 'GET') {
            _request = new Request(
                //`http://localhost:${port}${_pathname}${search(body)}`,
                `https://${subdomain}.splitflow.workers.dev${_pathname}${search(body)}`,
                init
            )
        } else {
            _request = new Request(
                //`http://localhost:${port}${_pathname}`,
                `https://${subdomain}.splitflow.workers.dev${_pathname}`,
                {
                    ...init,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }
            )
        }

        if (endpoint.authorization ?? true) {
            _request.headers.set(
                'authorization',
                request?.headers.get('authorization') ?? 'bearer TOKEN'
            )
        }
        return endpoint.getRequest?.(_request) ?? _request
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
            body = Object.fromEntries(url.searchParams)
        }

        return {
            ...body,
            ...pathParams,
            type
        } as A
    }

    throw new Error('unable to create action from request')
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

// unable to use Record for typing https://github.com/microsoft/TypeScript/issues/15300
export function firstError(results: Result[] | object): Error {
    const _results = (Array.isArray(results) ? results : Object.values(results)) as Result[]

    for (const result of _results) {
        if (result?.error) return result.error
    }
}

// unable to use Record for typing https://github.com/microsoft/TypeScript/issues/15300
export function firstErrorResult(results: Result[] | object): Result {
    const _results = (Array.isArray(results) ? results : Object.values(results)) as Result[]

    for (const result of _results) {
        if (result?.error) return result
    }
}
