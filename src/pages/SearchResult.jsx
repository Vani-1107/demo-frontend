import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from "jspdf";
import { FiFilter } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineFileDownload } from "react-icons/md";

function SearchResult() {
    const location = useLocation();

    const storedFilters = JSON.parse(localStorage.getItem('filters')) || location.state?.filters || {};
    const storedResults = JSON.parse(localStorage.getItem('results')) || location.state?.results || [];

    const [results, setResults] = useState(storedResults);
    const [filters, setFilters] = useState(storedFilters);

    useEffect(() => {
        localStorage.setItem('filters', JSON.stringify(filters));
        localStorage.setItem('results', JSON.stringify(results));
    }, [filters, results]);

    const handleRemoveFilter = async (key) => {
        console.log(key);
        const newFilter = { ...filters };
        if (key === "priceRange") {
            newFilter.priceRange = { min: 0, max: 100 };
        } else {
            newFilter[key] = "";
        }


        console.log(newFilter);
        try {
            const config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://demo-backend-qlhj.onrender.com/api/searchResult",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(newFilter),
            };
            const response = await axios.request(config);

            setFilters(newFilter);
            setResults(response.data);
        } catch (error) {
            console.error("Error fetching updated results:", error);
        }
    };

    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const addPageBorder = (doc) => {
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setDrawColor(0, 0, 0);
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
    };

    const handleDownload = async () => {
        console.log(selectedItems);

        if (!selectedItems.length) {
            alert("No items selected!");
            return;
        }

        try {
            const data = JSON.stringify({ ids: selectedItems });
            const config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://demo-backend-qlhj.onrender.com/api/getCoworkingSpaces",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };

            const response = await axios.request(config);
            const result = response?.data?.data;

            if (!result || !result.length) {
                alert("No coworking space data found!");
                return;
            }


            const doc = new jsPDF();
            addPageBorder(doc);

            doc.setFont("helvetica", "bolditalic");
            doc.setFontSize(40);

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const text = "Coworking Spaces";
            const textWidth = doc.getTextWidth(text);

            // Calculate positions to center the text
            let xPosition = (pageWidth - textWidth) / 2;
            let yPosition = pageHeight / 2;

            // Add the text
            doc.text(text, xPosition, yPosition);

            result.forEach((item, index) => {

                //adding a new page 
                doc.addPage();
                addPageBorder(doc);
                yPosition = 20;

                doc.setFontSize(16);
                doc.setTextColor(0, 0, 255); 
                doc.text(`Coworking Space ${index + 1}`, 14, yPosition);

                // Underline the title
                const titleWidth = doc.getTextWidth(`Coworking Space ${index + 1}`);
                doc.setDrawColor(0, 0, 255);
                doc.line(14, yPosition + 2, 14 + titleWidth, yPosition + 2);

                yPosition += 10;

                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0); 
                doc.text(`Name: `, 14, yPosition);
                doc.setFont("helvetica", "bold");
                doc.text(item.personName, 45, yPosition);
                doc.setFont("helvetica", "normal");
                yPosition += 8;

                doc.text(`Brand Address: `, 14, yPosition);
                doc.setFont("helvetica", "bold");
                doc.text(item.brandAddress, 45, yPosition);
                doc.setFont("helvetica", "normal");
                yPosition += 8;

                doc.text(`Email: `, 14, yPosition);
                doc.setFont("helvetica", "bold");
                doc.text(item.email, 45, yPosition);
                doc.setFont("helvetica", "normal");
                yPosition += 8;

                doc.text(`Parking: `, 14, yPosition);
                doc.setFont("helvetica", "bold");
                doc.text(item.parking === "Parking" ? "Available" : "Not Available", 45, yPosition);
                doc.setFont("helvetica", "normal");
                yPosition += 8;

                doc.text(`Zone: `, 14, yPosition);
                doc.setFont("helvetica", "bold");
                doc.text(item.zone, 45, yPosition);
                doc.setFont("helvetica", "normal");
                yPosition += 8;

                doc.text(`Area: `, 14, yPosition);
                doc.setFont("helvetica", "bold");
                doc.text(item.area, 45, yPosition);
                doc.setFont("helvetica", "normal");
                yPosition += 8;

                doc.text(`Phone Number: `, 14, yPosition);
                doc.setFont("helvetica", "bold");
                doc.text(item.phoneNumber, 45, yPosition);
                doc.setFont("helvetica", "normal");
                yPosition += 8;

                doc.text(`Nearest Metro : `, 14, yPosition);
                doc.setFont("helvetica", "bold");
                doc.text(item.nearMetro, 45, yPosition);
                doc.setFont("helvetica", "normal");
                yPosition += 8;

                doc.text(`Details: `, 14, yPosition);
                doc.setFont("helvetica", "bold");
                doc.text(item.details, 45, yPosition);
                doc.setFont("helvetica", "normal");
                yPosition += 12;



            });

            doc.save("coworking_spaces.pdf");
        } catch (error) {
            console.error("Error fetching coworking space data:", error);
            alert("Failed to fetch coworking space data. Please try again later.");
        }
    };

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
                <div className='text-3xl font-bold text-center my-2'>Lorem Ipsum</div>
                <div className='flex gap-3'>
                    <div className='flex items-center gap-2'>
                        <div className='font-semibold'>Filter</div>
                        <div><FiFilter size={18} /></div>
                    </div>
                    {Object.entries(filters)
                        .filter(([key, value]) => {
                            if (value === "" || value === null) return false;

                            if (key === "priceRange" && value.min === 0 && value.max === 100) return false;

                            return true;
                        })
                        .map(([key, value], index) => (
                            <div
                                key={index}
                                className="bg-gray-200 text-gray-700 px-1 py-1 rounded-sm border border-gray-500 text-sm flex items-center"
                            >
                                {key === "priceRange" && typeof value === "object"
                                    ? `${value.min}-${value.max}`
                                    : `${value}`}

                                <button className="ml-2 text-gray-500 hover:text-red-700" onClick={() => { handleRemoveFilter(key) }}><RxCross2 /></button>
                            </div>
                        ))
                    }
                </div>
                <div className='h-[1px] my-3 w-full bg-gray-300'></div>
                <div className='w-full flex justify-end'>
                    <div className='py-1 px-2 bg-gray-200 border border-gray-400 cursor-pointer flex items-center gap-2' onClick={handleDownload}>
                        <div>Download</div>
                        <div><MdOutlineFileDownload /></div>
                    </div>
                </div>
                <div className='h-[1px] my-3 w-full bg-gray-300'></div>
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <td className="px-4 py-2 border border-gray-200">

                                </td>
                                <th className="px-4 py-2 border border-gray-200 text-left">NAME</th>
                                <th className="px-4 py-2 border border-gray-200 text-left">BRAND ADDRESS</th>
                                <th className="px-4 py-2 border border-gray-200 text-left">EMAIL</th>
                                <th className="px-4 py-2 border border-gray-200 text-left">PARKING</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results?.data?.map((result, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border border-gray-200">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5"
                                            checked={selectedItems.includes(result._id)}
                                            onChange={() => handleCheckboxChange(result._id)}
                                        />
                                    </td>
                                    <td className="px-4 py-2 border border-gray-200 font-bold">{result?.personName}</td>
                                    <td className="px-4 py-2 border border-gray-200">{result?.brandAddress}</td>
                                    <td className="px-4 py-2 border border-gray-200">{result?.email}</td>
                                    <td className={`px-4 py-2 border border-gray-200 font-semibold ${result.parking === "Parking" ? "text-green-600" : "text-red-600"} `}>
                                        {result.parking === "Parking" ? "✓ Parking" : "✘ No Parking"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SearchResult;
