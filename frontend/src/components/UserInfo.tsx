import { useQueryUser } from '../hooks/user/useQueryUser';
import { Loader } from '@mantine/core';

//login時、user.idを取得。ログインしていない場合はuseQueryにより、indexページへ移動させる。
export const UserInfo = () => {
    const { data: user, status } = useQueryUser();
    if (status === 'loading') return <Loader />
    return <p>{ user?.id && 'ログインしています'}</p>
}
