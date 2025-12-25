const API_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Auth API
export const verifySecretCode = async (secretCode) => {
    return apiCall('/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ secretCode }),
    });
};

// Love Letters API
export const getAllLoveLetters = async () => {
    return apiCall('/love-letters');
};

export const getLoveLetter = async (id) => {
    return apiCall(`/love-letters/${id}`);
};

export const createLoveLetter = async (letterData) => {
    return apiCall('/love-letters', {
        method: 'POST',
        body: JSON.stringify(letterData),
    });
};

// Reasons API
export const getAllReasons = async () => {
    return apiCall('/reasons');
};

export const createReason = async (reasonData) => {
    return apiCall('/reasons', {
        method: 'POST',
        body: JSON.stringify(reasonData),
    });
};

// Stories API
export const getAllStories = async () => {
    return apiCall('/stories');
};

export const createStory = async (storyData) => {
    return apiCall('/stories', {
        method: 'POST',
        body: JSON.stringify(storyData),
    });
};

// Bucket List API
export const getAllBucketList = async () => {
    return apiCall('/bucket-list');
};

export const createBucketListItem = async (itemData) => {
    return apiCall('/bucket-list', {
        method: 'POST',
        body: JSON.stringify(itemData),
    });
};

// Music API
export const getAllMusic = async () => {
    return apiCall('/music');
};

export const createMusic = async (musicData) => {
    return apiCall('/music', {
        method: 'POST',
        body: JSON.stringify(musicData),
    });
};

// Quiz API
export const submitQuizAnswers = async (answers) => {
    return apiCall('/quiz', {
        method: 'POST',
        body: JSON.stringify({ answers }),
    });
};

export const getAllQuizAnswers = async () => {
    return apiCall('/quiz');
};