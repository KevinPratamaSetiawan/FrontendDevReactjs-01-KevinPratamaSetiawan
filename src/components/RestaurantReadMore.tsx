import { useState } from "react";

export default function RestaurantReadmore({ text, limit }: { text: string, limit: number }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = limit;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <p className="m-0">
                {isExpanded || text.length <= maxLength
                    ? text
                    : `${text.substring(0, maxLength)}...`}
                {text.length > maxLength && (
                    <a
                        className="p-0 m-0 border-0 ms-2"
                        onClick={toggleExpanded}
                    >
                        {isExpanded ? "Read Less" : "Read More"}
                    </a>
                )}
            </p>
        </div>
    );
}