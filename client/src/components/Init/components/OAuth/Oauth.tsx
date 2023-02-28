export function OAuth() {
  const handleLoginWithGoogle = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };
  const handleLoginWithMicrosoft = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };
  const handleLoginWithApple = () => {
    window.location.href = 'http://localhost:3000/auth/apple';
  };

  return (
    <div className="OAuth_Wrapper">
    <button className="button OAuth" onClick={handleLoginWithGoogle}>Login with Google</button>
    <button className="button OAuth"  onClick={handleLoginWithMicrosoft}>Login with Microsoft</button>
    <button className="button OAuth" onClick={handleLoginWithApple}>Login with Apple</button>
    </div>
  );
}

