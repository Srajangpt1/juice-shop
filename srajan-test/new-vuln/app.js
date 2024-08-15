async function loadUserProfile() {
const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get('userID');

const apiUrl = `https://api.example.com/v1/users/${userID}/profile`;

try {
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        }
    });

    const data = await response.json();

    document.getElementById('user-profile').innerHTML = `
            <h1>\${data.name}</h1>
            <p>\${data.bio}</p>
        `;
    
    } catch (error) {
        console.error('Error loading user profile:', error);
    }
    }
    
    window.onload = () => {
        loadUserProfile();
    };