import axios from "axios";
import { useEffect, useState } from "react";


function Profile() {
    const [user, setUser] = useState(null)
    const [loading, setLoad] = useState(true)
    const [error, setError] = useState(null)


    
    useEffect(function () {
        function verification() {
            const token_exist = false
            if (localStorage.getItem('token')) {
                token_exist = true
            }

            if (!token_exist) {
                window.location.href= "/login"
            }
        }
        verification()
        async function infos() {
            try {
                const token = localStorage.getItem('token')
                console.log(token)
                const res = await axios.get('http://127.0.0.1:8000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                })

                setUser(res.data.user)
                console.log(res.data)

            } catch (error) {
                setError(error.message)
            } finally {
                setLoad(false)
            }
            
        }

        infos()
    }, [])

    if (loading) return <p>loading ...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md w-80 text-center">

                <h2 className="text-2xl font-bold mb-4">Profile</h2>

                <div className="mb-3">
                    <p className="text-gray-500 text-sm">Name</p>
                    <p className="font-semibold text-lg">{user?.name}</p>
                </div>

                <div className="mb-5">
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="font-semibold text-lg">{user?.email}</p>
                </div>

                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}
                    className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>

            </div>
        </div>
    );
}






export default  Profile