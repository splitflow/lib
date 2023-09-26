export interface GetAccountAction {
    type: 'get-account'
    accountId?: string
    email?: string
}

export interface GetAccountResult {
    account: Account
}

export interface CreateAccountAction {
    type: 'create-account'
    email?: string
}

export interface CreateAccountResult {
    account: Account
}

export interface Account {
    accountId: string
    email: string
}