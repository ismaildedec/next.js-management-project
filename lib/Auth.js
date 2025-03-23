const DJANGO_API_URL = 'http://10.212.24.245:8080';
export const checkAuth = async () => {
    try {
        const response = await fetch(${DJANGO_API_URL}/api/user-info/, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Auth check successful:', data);  // Debug için
            return { isAuthenticated: true, user: data };
        }

        console.log('Auth check failed:', response.status);  // Debug için
        return { isAuthenticated: false, user: null };
    } catch (error) {
        console.error('Auth check error:', error);  // Debug için
        return { isAuthenticated: false, user: null };
    }
};