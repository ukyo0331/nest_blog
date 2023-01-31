import { useQueryUser } from '../hooks/user/useQueryUser';
import { Loader } from '@mantine/core';

export const UserInfo = () => {
    const { data: user, status } = useQueryUser();
    if (status === 'loading') return <Loader />
    return <p>{ user?.id }</p>
}