import * as React from "react";

interface IUrlValidationProps {
  url: string;
}

const UrlValidation: React.FunctionComponent<IUrlValidationProps> = ({ url }) => {
  const [isValid, setIsValid] = React.useState<boolean>(true);

  React.useEffect(() => {
    const validateUrl = (url: string): boolean => {
      // Regular expression for URL validation
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      return urlRegex.test(url);
    };

    setIsValid(validateUrl(url));
  }, [url]);

  return (
    <p className={`text-red-500 ${isValid || url === "" ? 'hidden' : ''}`}>
      Invalid URL
    </p>
    // <div className={`rounded-md p-2 ${isValid || url === "" ? 'hidden' : 'block'} bg-red-100 border border-red-400 text-red-700 inline-block`}>
    //   {isValid ? '' : 'Invalid URL'}
    // </div>
  );
};

export default UrlValidation;
