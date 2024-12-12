import { useState, useEffect } from 'react';

const useUserInfo = (isLoggedIn) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!isLoggedIn) {
                setUserInfo(null);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:8080/api/admin/admininfo', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    setUserInfo(await response.json());
                } else {
                    const errorData = await response.text();
                    console.error('사용자 정보 가져오기 실패:', errorData);
                    setError(errorData);
                }
            } catch (err) {
                console.error('사용자 정보 가져오기 중 오류 발생:', err);
                setError('사용자 정보 가져오기 중 오류 발생');
            } finally {
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, [isLoggedIn]);

    return { userInfo, loading, error };
};

export default useUserInfo;