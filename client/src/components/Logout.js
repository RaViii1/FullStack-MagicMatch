export default function Logut({ }){

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()

      };
    return (
        
        <a className="logout" onClick={handleLogout}>Logout</a>
    )
} 