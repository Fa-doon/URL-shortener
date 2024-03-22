import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
const UrlValidation = ({ url }) => {
    const [isValid, setIsValid] = React.useState(true);
    React.useEffect(() => {
        const validateUrl = (url) => {
            // Regular expression for URL validation
            const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
            return urlRegex.test(url);
        };
        setIsValid(validateUrl(url));
    }, [url]);
    return (_jsx("p", { className: `text-red-500 ${isValid || url === "" ? 'hidden' : ''}`, children: "Invalid URL" })
    // <div className={`rounded-md p-2 ${isValid || url === "" ? 'hidden' : 'block'} bg-red-100 border border-red-400 text-red-700 inline-block`}>
    //   {isValid ? '' : 'Invalid URL'}
    // </div>
    );
};
export default UrlValidation;
