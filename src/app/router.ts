import { createBrowserRouter, redirect } from 'react-router';
import App from './App';
import { createUser, getUser, getUsers, removeUser, updateUser } from '../api/users';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import WelcomeScreen from '../components/WelcomeScreen';
import PageError from '../components/PageError';

export default createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '',
                Component: WelcomeScreen,
            },
            {
                action: async ({ request }) => {
                    const formData = await request.formData();
                    const id = formData.get('id') as string;
                    await removeUser(id);
                    return redirect('/users');
                },
                path: '/users',
                children: [
                    {
                        path: '',
                        loader: getUsers,
                        Component: UserList,
                    },
                    {
                        action: async ({ params, request }) => {
                            const formData = await request.formData();

                            if(params.id) {
                                const value = formData.get('value') as string;

                                params.id !== 'add' ?  
                                    await updateUser(params.id, value):
                                    await createUser(value);
                            }                            
                            
                            return redirect('/users');
                        },
                        path: ':id',
                        loader: (args: any) => getUser(args.params.id),
                        Component: UserForm,
                    },
                ],
                ErrorBoundary: PageError
            },
        ],
    },
]);
