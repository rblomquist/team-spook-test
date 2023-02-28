export async function verifyPassword(email: string, password: string) {
    const response = await fetch('/verify-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Error verifying password');
    }
}
  