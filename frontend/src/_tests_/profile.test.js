import 'isomorphic-fetch';
const backend = "http://localhost:8000" 

describe('Get profile', () => {
    test('Get profile summary, skills, and connect with me', async () => {
        const response = await fetch(`${backend}/testing/profile/get-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({username: "testing"})
        })

        expect(response.status).toBe(200);

        const result = await response.json();
        expect(result).toHaveProperty('profileImage');
        expect(result).toHaveProperty('profileDesc');
        expect(result).toHaveProperty('userMedia');
        expect(result).toHaveProperty('userSkills');
    })
    
})

describe('Profile Update', () => {
    test('Update profile information', async () => {
        const response = await fetch(`${backend}/testing/profileupdate/update-profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: "testing", 
                profileDesc: "test profile desc", 
                userSkills: [{text: "React.js"}], 
                userMedia: [{text: "Github", mediaURL: "https://github.com/devhyun05", backgroundColor: "black", textColor: "white", iconType: "GitHubIcon"}]
            })
        })
        expect(response.status).toBe(200); 

        const fetchResponse = await fetch(`${backend}/testing/profile/get-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({username: "testing"})
        })
    

        expect(fetchResponse.status).toBe(200);
    
        const result = await fetchResponse.json();
        console.log(result); 
        expect(result).toHaveProperty('profileDesc', 'test profile desc');
        expect(result).toHaveProperty('userSkills');
        expect(result.userSkills).toContainEqual({ text: 'React.js' });
        expect(result).toHaveProperty('userMedia');
        expect(result.userMedia).toContainEqual({text: "Github", mediaURL: "https://github.com/devhyun05", backgroundColor: "black", textColor: "white", iconType: "GitHubIcon"})
    });
});

describe('API call check', () => {
    test('debounce check', async () => {

    }); 

    test('Call only last mount', async () => {

    }); 
}); 

describe('Profile Update Error', () => {
    test('image size error', async () => {

    }); 

    test('profile Description max length exceed', async () => {

    }); 

    test('skills max exceed', async () => {

    }); 

    test('Connect with me max exceed', async () => {

    }); 
});
