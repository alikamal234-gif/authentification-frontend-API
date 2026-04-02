import axios from "axios";
import { useEffect, useState } from "react";

async function changePassword(password, new_passw, conf_new_passw) {
    try {
        const token = localStorage.getItem('token');

        const res = await axios.patch(
            'http://127.0.0.1:8000/api/changepassword',
            {
                password,
                new_password: new_passw,
                confirme_new_password: conf_new_passw
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(res)
        return res;
    } catch (error) {
        return error.response;
    }
}

function Profile() {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [new_passw, setNewPassw] = useState(null);
    const [conf_new_passw, setConfNewPassw] = useState(null);
    const [loading, setLoad] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
    const [errorPassword, setErrorPassword] = useState(null);

    useEffect(function () {
        function verification() {
            let token_exist = false;

            if (localStorage.getItem('token')) {
                token_exist = true;
            }

            if (!token_exist) {
                window.location.href = "/login";
            }
        }

        verification();

        async function infos() {
            try {
                const token = localStorage.getItem('token');

                const res = await axios.get('http://127.0.0.1:8000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(res.data.user);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoad(false);
            }
        }

        infos();
    }, []);

    async function startChange(e) {
        e.preventDefault();

        const response = await changePassword(password, new_passw, conf_new_passw);

        if (response && response.status === 200) {
            setSuccess("Password changed");
            setErrorPassword(null);
        } else {
            setErrorPassword(response?.data?.message);
            setSuccess("");
        }
    }

    if (loading) return <p>loading ...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

            <div className="bg-white mb-5 p-6 rounded-xl shadow-md w-80 text-center">
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

            <form
                onSubmit={startChange}
                className="bg-white p-6 rounded-xl shadow-md w-80"
            >
                <h2 className="text-2xl font-bold mb-5 text-center">Change Password</h2>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">New password</label>
                    <input
                        type="password"
                        onChange={(e) => setNewPassw(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Confirm new password</label>
                    <input
                        type="password"
                        onChange={(e) => setConfNewPassw(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button className="w-full bg-green-500 text-white p-2 rounded">
                    change password
                </button>
            </form>

            <p className="mt-5">
                {errorPassword ? errorPassword : success}
            </p>
        </div>
    );
}

export default Profile;