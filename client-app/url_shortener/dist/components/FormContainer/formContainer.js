import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import axios from "axios";
import { serverUrl } from "../../helpers/Constants";
import UrlValidation from "../UrlValidation/urlValidate";
const FormContainer = (props) => {
    const { updateReloadState } = props;
    const [fullUrl, setFullUrl] = React.useState("");
    const [isValidUrl, setIsValidUrl] = React.useState(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidUrl)
            return;
        try {
            await axios.post(`${serverUrl}/shortUrl`, {
                fullUrl: fullUrl,
            });
            setFullUrl("");
            updateReloadState();
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.log(error.response);
                // Access other properties as needed
            }
            else {
                console.log(error);
            }
        }
    };
    const handleUrlChange = (e) => {
        const url = e.target.value;
        setFullUrl(url);
        setIsValidUrl(validateUrl(url));
    };
    const validateUrl = (url) => {
        // Regular expression for URL validation
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(url);
    };
    return (_jsx("div", { className: "container mx-auto p-2", children: _jsx("div", { className: "bg-banner my-8 rounded-xl bg-cover bg-center", children: _jsxs("div", { className: "w-full h-full rounded-xl p-20 backdrop-brightness-50", children: [_jsx("h2", { className: "text-white text-4xl text-center pb-4", children: "Optimize Your Online Experience with Briefy" }), _jsx("h2", { className: "text-white text-center pb-2 text-3xl", children: "Advanced URL Shortening Solution" }), _jsx("p", { className: "text-white text-center pb-4 text-sm font-10", children: "Paste your full link to shorten it" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("div", { className: "flex", children: _jsxs("div", { className: "relative w-full", children: [_jsx("div", { className: "absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800", children: "urlshortener/" }), _jsx("input", { type: "text", placeholder: "add your link", required: true, className: "block w-full p-4 ps-32 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500", value: fullUrl, onChange: (e) => {
                                                handleUrlChange(e);
                                                setFullUrl(e.target.value);
                                            } }), _jsx("button", { type: "submit", className: "absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-tr-lg rounded-br-lg rounded-tl-none rounded-bl-none border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300", children: "Shorten URL" })] }) }), _jsx(UrlValidation, { url: fullUrl })] })] }) }) }));
};
export default FormContainer;
