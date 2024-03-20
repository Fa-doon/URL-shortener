import * as React from "react";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  return (
    <div className="bg-gray-900">
      <div className="container flex justify-between items-center py-5 mx-auto">
        <div className="text-white font-bold text-3xl tracking-wide ml-4">BRIEFY</div>

        {/* center nav */}
        <ul className="flex justify-center space-x-8">
          <li>
            <a href="#" className="text-white hover:text-blue-300">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-blue-300">
              My URLs
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-blue-300">
              Analytics
            </a>
          </li>
        </ul>

        {/* End: Try for Free Button */}
        <div className="mr-4">
          <button className="bg-white border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white hover:border-transparent font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
