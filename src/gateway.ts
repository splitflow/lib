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
