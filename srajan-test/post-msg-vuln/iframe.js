document.getElementById("sendMessage").addEventListener("click", function() {
    // Insecure: Sending a message without ensuring the target origin is correct
    window.parent.postMessage({
        action: 'updateUser',
        payload: { name: 'John Doe', email: 'john@example.com' }
    }, '*');
});
