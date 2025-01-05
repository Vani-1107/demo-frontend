import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { FiFilter } from "react-icons/fi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Search() {
    const navigate = useNavigate();

    //for price range
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(100);

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), max - 1); 
        console.log(value);
        setMin(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), min + 1);
        console.log(value);
        setMax(value);
    };

    const [formData, setFormData] = useState({
        searchQuery: '',
        zone: '',
        personName: '',
        spaceType: '',
        area: '',
        contactNumber: '',
        parking: '',
        brandAddress: '',
        phoneNumber: '',
        priceRange: { min: 0, max: 100 },
        googleMap: '',
        email: '',
        details: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePriceChange = (type, value) => {
        setFormData((prev) => ({
            ...prev,
            priceRange: {
                ...prev.priceRange,
                [type]: value
            }
        }));
    };

    const clearInput = () => {
        setFormData((prev) => ({
            ...prev,
            searchQuery: "",
        }));
    };

    const handleSearch = async() => {
        console.log("formdata : ",formData);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://demo-backend-qlhj.onrender.com/api/searchResult',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify(formData)
          };
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            localStorage.setItem('filters', JSON.stringify(formData));
            localStorage.setItem('results', JSON.stringify(response.data));
            navigate("/searchResult", { state: { results: response.data, filters: formData } });
          })
          .catch((error) => {
            console.log(error);
          });
          
    }
    return (
        <div className='w-full min-h-screen'>
            {/* sidebar */}
            <aside className='w-1/12 fixed left-0 top-0 bg-green-900 h-screen flex flex-col items-center gap-10 justify-center'>
                <div className="w-16 h-16 bg-white"></div>
                <div className="w-16 h-16 bg-white"></div>
                <div className="w-16 h-16 bg-white"></div>
                <div className="w-16 h-16 bg-white"></div>
                <div className="w-16 h-16 bg-white"></div>
            </aside>

            <div className='ml-[8.4vw] p-6'>
                <div className='text-center text-4xl font-bold my-3'>Dashboard</div>
                <div className='mb-1'>Search</div>
                <div className="relative ml-[1/12vw]">
                    <input
                        type="text"
                        name="searchQuery"
                        value={formData.searchQuery}
                        onChange={handleChange}
                        placeholder="What are you looking for? Search with the name here"
                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none"
                    />
                    <button className="absolute right-3 top-3 text-gray-300" onClick={clearInput}><RxCross2 size={28} /></button>
                </div>
                
                <div className='flex gap-2 mt-8 mb-3 items-center'>
                    <div className='text-xl font-semibold'>Filter</div>
                    <div><FiFilter size={18} /></div>
                </div>

                <div className='border border-gray-200 rounded-lg p-5 flex flex-col gap-8'>
                    <div className='flex gap-4 w-full'>
                        <div className='w-[32%]'>
                            <label className="block font-medium mb-1">Zone</label>
                            <select className="w-full p-3 border rounded-lg" 
                                name="zone"
                                value={formData.zone}
                                onChange={handleChange}
                            >
                                <option>Select your Zone</option>
                                <option value="North-Zone">North Zone</option>
                                <option value="South-Zone">South Zone</option>
                                <option value="East-Zone">East Zone</option>
                                <option value="West-Zone">West Zone</option>
                            </select>
                        </div>
                        <div className='w-[32%]'>
                            <label className="block font-medium mb-1">Name of the Person</label>
                            <input type='text' 
                                name="personName"
                                value={formData.personName}
                                onChange={handleChange} 
                                placeholder='Enter the name' 
                                className="w-full p-3 border rounded-lg focus:outline-none" />
                        </div>
                        <div className='w-[32%]'>
                            <label className="block font-medium mb-1">Type of Space</label>
                            <select 
                                className="w-full p-3 border rounded-lg"
                                name="spaceType"
                                value={formData.spaceType}
                                onChange={handleChange}
                            >
                                <option>Select your Space</option>
                                <option value="1">Option1</option>
                                <option value="2">Option2</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex gap-4 w-full'>
                        <div className='w-[32%]'>
                            <label className="block font-medium mb-1">Area</label>
                            <select 
                                className="w-full p-3 border rounded-lg"
                                name="area"
                                value={formData.area}
                                onChange={handleChange}   
                            >
                                <option>Select your Area</option>
                                <option value="1">Option1</option>
                                <option value="2">Option2</option>
                            </select>
                        </div>
                        <div className='w-[32%]'>
                            <label className="block font-medium mb-1">Contact Number</label>
                            <input type='text' 
                                placeholder='Enter Contact Number' 
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange} 
                                className="w-full p-3 border rounded-lg focus:outline-none" />
                        </div>
                        <div className='w-[32%]'>
                            <label className="block font-medium mb-1">Parking</label>
                            <select className="w-full p-3 border rounded-lg"
                                name="parking"
                                value={formData.parking}
                                onChange={handleChange}   
                            >
                                <option>Select your choice</option>
                                <option value="Parking">Parking</option>
                                <option value="NoParking">No Parking</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex gap-4 w-full'>
                        <div className='w-[32%]'>
                            <label className="block font-medium mb-1">Brand Address</label>
                            <input type='text'
                                name="brandAddress"
                                value={formData.brandAddress}
                                onChange={handleChange} 
                                placeholder='Enter the Brand Address' 
                                className="w-full p-3 border rounded-lg focus:outline-none" />
                        </div>
                        <div className='w-[32%]'>
                            <label className="block font-medium mb-1">Phone Number</label>
                            <input type='text' 
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange} 
                                placeholder='Enter the phone number' 
                                className="w-full p-3 border rounded-lg focus:outline-none" />
                        </div>
                        <div className='w-[32%]'>
                            <div className="flex justify-between items-center mb-5">
                                <label className="block font-medium">Price Range</label>
                                <span className="text-gray-700 text-sm font-medium">${formData.priceRange.min} - ${formData.priceRange.max}</span>
                            </div>

                            <div className="relative w-full">

                                <div className="absolute top-1/2 w-full h-2 bg-gray-300 rounded-md transform -translate-y-1/2"></div>

                                <div
                                    className="absolute top-1/2 h-2 bg-black rounded-md transform -translate-y-1/2"
                                    style={{
                                        left: `${(min / 100) * 100}%`,
                                        right: `${100 - (max / 100) * 100}%`,
                                    }}
                                ></div>


                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.priceRange.min}
                                    onChange={(e) => {handlePriceChange('min', Number(e.target.value))
                                        handleMinChange()
                                    }
                                    }
                                    className="absolute w-full appearance-none range-slider pointer-events-auto bg-transparent h-2 outline-none"
                                    style={{ zIndex: 2 }}
                                />
                                <div
                                    className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-black rounded-full cursor-pointer pointer-events-none"
                                    style={{ left: `${(min / 100) * 100}%`, zIndex: 3 }}
                                ></div>


                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.priceRange.max}
                                    onChange={(e) => {
                                        setMax(Math.max(Number(e.target.value), min + 1))
                                        handlePriceChange('max', Number(e.target.value))
                                        
                                    }}
                                    className="absolute w-full appearance-none range-slider bg-transparent pointer-events-auto h-2 outline-none"
                                    style={{ zIndex: 2 }}
                                />
                                <div
                                    className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-black rounded-full cursor-pointer pointer-events-none"
                                    style={{ left: `${(max / 100) * 100}%`, zIndex: 3 }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4 w-full'>
                        <div className='w-[32%]'>
                            <label className="block font-medium mb-1">Google map</label>
                            <input type='text'
                                name="googleMap"
                                value={formData.googleMap}
                                onChange={handleChange} 
                                placeholder='Enter the Location' className="w-full p-3 border rounded-lg focus:outline-none" />
                        </div>
                        <div className='w-[32%]'>
                            <label className="block font-medium mb-1">Email</label>
                            <input type='email'
                                name="email"
                                value={formData.email}
                                onChange={handleChange}  
                                placeholder='Enter the email address' className="w-full p-3 border rounded-lg focus:outline-none" />
                        </div>
                        <div className='w-[32%]'>
                            <label className="block font-medium mb-1">Details</label>
                            <textarea type='text' 
                                name="details"
                                value={formData.details}
                                onChange={handleChange} 
                                placeholder='Enter the details' className="w-full p-3 border rounded-lg focus:outline-none" />
                        </div>
                    </div>

                    <div className='flex items-center justify-center w-full'>
                        <div className='rounded-lg px-7 py-2 bg-green-900 text-white cursor-pointer' onClick={handleSearch}>Search</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Search
