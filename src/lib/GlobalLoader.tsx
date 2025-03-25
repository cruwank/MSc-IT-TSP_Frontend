import React from "react";
import { useLoader } from "./LoaderContext"; // Import the loader context
import { ThreeDots } from "react-loader-spinner"; // Optional: Loader Spinner from `react-loader-spinner`

const GlobalLoader: React.FC = () => {
    const { isLoading } = useLoader(); // Get loading state from context

    if (!isLoading) return null; // If not loading, do not render the loader

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <ThreeDots color="#00BFFF" height={50} width={50} />
        </div>
    );
};

export default GlobalLoader;
