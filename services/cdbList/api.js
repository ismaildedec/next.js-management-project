const API_BASE_URL = 'http://localhost:8080/manage/api/cdb-lists/';
export const cdbService = {
    async getCDBLists() {
        try {
            const response = await fetch(API_BASE_URL);
            const data = await response.json();
            //Yanıt dizi değilse boş bir dizi dönsün
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching CDB lists:', error);
            return [];
        }
    },
    
    async addCDBList(listName, enabled, content) {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    list_name: listName,
                    enabled,
                    content
                }),
            });
            return await response.json();
        } catch (error) {
            throw new Error('Failed to add CDB list');
        }
    },
    async viewCDBList(listName) {
        try {
            //encodeURIComponent güvenli şekilde listname gönderir.
            const response = await fetch(`${API_BASE_URL}${encodeURIComponent(listName)}/`);
            if (!response.ok) {
                throw new Error('Liste getirilemedi');
            }
            return await response.json();
        } catch (error) {
            console.error('View CDB List Error:', error);
            throw error;
        }
    }
};