window.addEventListener("message", function(event) {
    // Insecure: No origin check
    // Assuming message is always coming from a trusted source
    if (event.data.action === 'updateUser') {
        updateUser(event.data.payload);
    } else if (event.data.action === 'deleteUser') {
        deleteUser(event.data.userId);
    }
});

function updateUser(payload) {
    console.log("Updating user with payload:", payload);
}

function deleteUser(userId) {
    console.log("Deleting user with ID:", userId);
}
