import * as React from "react";
import axios from "axios";
import { serverUrl } from "../../helpers/Constants";
import UrlValidation from "../UrlValidation/urlValidate";

interface IFormContainerProps {
  updateReloadState: () => void;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
  const { updateReloadState } = props;
  const [fullUrl, setFullUrl] = React.useState<string>("");
  const [isValidUrl, setIsValidUrl] = React.useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidUrl) return;
    try {
      await axios.post(`${serverUrl}/shortUrl`, {
        fullUrl: fullUrl,
      });
      setFullUrl("");
      updateReloadState();

  
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response);
        // Access other properties as needed
      } else {
        console.log(error);
      }
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFullUrl(url);
    setIsValidUrl(validateUrl(url));
  };

  const validateUrl = (url: string): boolean => {
    // Regular expression for URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };
  return (
    <div className="container mx-auto p-2">
      <div className="bg-banner my-8 rounded-xl bg-cover bg-center">
        <div className="w-full h-full rounded-xl p-20 backdrop-brightness-50">
          <h2 className="text-white text-4xl text-center pb-4">
            Optimize Your Online Experience with Briefy
          </h2>
          <h2 className="text-white text-center pb-2 text-3xl">
            Advanced URL Shortening Solution
          </h2>
          <p className="text-white text-center pb-4 text-sm font-10">
            Paste your full link to shorten it
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800">
                  urlshortener/
                </div>
                <input
                  type="text"
                  placeholder="add your link"
                  required
                  className="block w-full p-4 ps-32 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                  value={fullUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleUrlChange(e);
                    setFullUrl(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-tr-lg rounded-br-lg rounded-tl-none rounded-bl-none border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Shorten URL
                </button>
              </div>
            </div>
            <UrlValidation url={fullUrl} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
