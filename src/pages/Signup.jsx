import React,{useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({name:"",email:"",password:"",cf:""});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formData.password != formData.cf){
            alert("password and confirm password do not match!!");
            return;
        }

        let data = JSON.stringify({name:formData.name,email:formData.email,password:formData.password});

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://demo-backend-qlhj.onrender.com/api/signup',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            navigate("/search");
          })
          .catch((error) => {
            console.log(error);
          });
    }

    return (
        <div className='min-h-screen w-full flex'>
            <div className="flex w-1/2 items-center justify-center">
                <div className='max-w-md w-full '>
                    <h2 className="text-3xl font-bold  text-gray-800 mb-6">
                        New Here? Signup.
                    </h2>

                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your Name"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your Email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                Create a Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a Password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="cf"
                                value={formData.cf}
                                onChange={handleChange}
                                placeholder="Confirm your Password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800"
                            onClick={handleSubmit}
                        >
                            Signup
                        </button>
                    </form>

                    <div className="text-center my-4 text-gray-600">OR</div>

                    <button
                        className="w-full py-2 border border-green-700 text-green-700 font-semibold rounded-md hover:bg-green-50"
                    >
                        Signup using Phone Number
                    </button>

                    <div className="text-center mt-4">
                        <Link to="/" className="text-sm text-green-700 hover:underline">
                            Existing User? Login
                        </Link>
                    </div>
                </div>
            </div>

            <div className='w-[50%] bg-green-950'></div>
        </div>
    )
}

export default Signup
