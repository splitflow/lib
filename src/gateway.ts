export interface Action {
    type: string
}

export function actionRequest(_: string, action: Action) {
    return new Request(
        `http://localhost:8787/${action.type}` /*`https://${endpoint}.splitflow.workers.dev/${action.type}`*/,
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

export async function getResult<R>(response: Response) {
    if (response.status === 200) {
        return response.json() as Promise<R>
    }
    throw new Error(response.status + '' + JSON.stringify(await response.json()))
}

export async function errorResponse(status: number, error: string) {
    return new Response(JSON.stringify({ error }), { status })
}
