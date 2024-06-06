import { useState } from 'react';
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from 'react-router-dom';

interface featureType {
    name: string;
    path: string;
}

const Searchbar = () => {
    const featureList: featureType[] = [
        { name: "dashboard", path: "/" },
        { name: "My Station", path: "/station" },
        { name: "Add Station", path: "/station/add" },
        { name: "Task Assignment", path: "/station/tasks" },
        { name: "Manpower", path: "/Manpower" },
        { name: "Law and order", path: "/law" },
        { name: "Chargesheet", path: "/chargesheet" },
        { name: "Witness Management", path: "/witness" },
        { name: "Case Preparation", path: "/CourtTwo" },
        { name: "Add Fir", path: "/fir" },
        { name: "All Fir", path: "/fir/all" },
        { name: "Add new user", path: "/user/register" },
        { name: "Underlyings", path: "/user/underlying" },
        { name: "Profile", path: "/user" }
    ];

    const navigate = useNavigate()

    const [query, setQuery] = useState('');
    const [filteredFeatures, setFilteredFeatures] = useState<featureType[]>([]);

    const handleSearch = (
        e: React.ChangeEvent<HTMLInputElement> | undefined
    ): void => {

        if (!e) {
            return;
        }

        const value = e.target.value;
        setQuery(value);
        if (value) {
            const results = featureList.filter(feature =>
                feature.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredFeatures(results);
        } else {
            setFilteredFeatures([]);
        }
    };

    return (
        <div className="relative w-full max-w-md mx-auto">
            <Input
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search here"
                value={query}
                onChange={handleSearch}
                suffix={<SearchOutlined className="cursor-pointer text-xl" />}
            />
            {query && (
                <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {filteredFeatures.length > 0 ? (
                        filteredFeatures.map((feature, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    navigate(feature.path)
                                    setQuery('')
                                }}
                                className="font-semibold block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            >
                                {feature.name}
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-gray-800">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Searchbar;
