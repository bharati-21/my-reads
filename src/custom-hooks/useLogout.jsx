import { auth } from '../firebase/config';
import {signOut} from 'firebase/auth';
import { useAuth } from '../contexts/auth-context';

export const useLogout = () => {
    const {authState, authDispatch} = useAuth();

    const logout = async () => {
        try {
            const response = await signOut(auth);
            authDispatch({type: 'LOGOUT'});
            console.log('Logged out successfully');
        }
        catch(error) {
            console.log(error.message);
        }
    }
    return { logout };
}