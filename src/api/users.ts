import { BASE_API } from '../constants';
import { UserModel } from '../models/user';

const HEADERS: HeadersInit = { 'Content-type': 'application/json' };

async function fetching<T>(request: Promise<Response>) {
    const response = await request;
    const json = response.json();
    return json as T;
}

export async function createUser(body: string) {
    return fetching(fetch(BASE_API, { headers: HEADERS, method: 'POST', body }));
}

export async function getUser(id: number | string) {
    if(id === 'add') {
        return new UserModel(0, 'email@test.com', 'my user', '', {}, {}, '');
    }
    const { user } = await fetching<{ user: Record<string, any> }>(fetch(BASE_API + '/' + id));
    return UserModel.fromJson(user);
}

export async function getUsers() {
    const { users } = await fetching<{ users: Record<string, any>[] }>(fetch(BASE_API + '?limit=30'));
    return users.map((user) => UserModel.fromJson(user));
}

export async function removeUser(id: number | string) {
    return fetching(fetch(BASE_API + '/' + id, { method: 'DELETE' }));
}

export async function updateUser(id: number | string, body: string) {
    return fetching(fetch(BASE_API + '/' + id, { headers: HEADERS, method: 'PUT', body }));
}