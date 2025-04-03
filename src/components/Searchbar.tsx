"use client"
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

const SearchBar = () => {
    const [searchTerm , setSearchTerm] = useState("");
    const router = useRouter();

    return (<div className="flex items-center justify-center gap-2 mt-4 mb-4">
        <input
            type="text"
            placeholder="Search..."
            onKeyUp={(e) => {
                const target = e.target as HTMLInputElement;
                target.value.length > 0 ? setSearchTerm(target.value) : setSearchTerm("");
            }}
            className="w-full max-w-[300px] px-4 py-2 text-lg 
                   text-gray-900 bg-white border-2 border-gray-300 
                   rounded-full shadow-md outline-none transition-all 
                   duration-300 ease-in-out 
                   focus:shadow-lg focus:ring-2 focus:ring-blue-300"
        />
        <Button variant="outline" onClick={() => {
            setTimeout(() => {
                router.push(`/search/${searchTerm}`);
            }, 500);
        }}><FaSearch /></Button>
        </div>)
}

export default SearchBar;