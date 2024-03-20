import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Link } from "react-router-dom";
import { serverUrl } from "../../../src/helpers/Constants";
import QRCodeModal from "../../../src/components/QRcode/qrcode";
import axios from "axios";
const DataTable = (props) => {
  const { data, updateReloadState } = props;
  console.log("Data in DataTable is: ", data);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [qrUrl, setQrUrl] = React.useState("");
  const openModal = (url) => {
    setIsModalOpen(true);
    setQrUrl(url);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const renderTableData = () => {
    // Rendering the table
    return data.map((item) => {
      return _jsxs(
        "tr",
        {
          className:
            "border-b text-white bg-gray-600 hove:bg-white hover:text-gray",
          children: [
            _jsx("td", {
              className: "px-6 py-3 break-words",
              children: _jsx(Link, {
                to: item.fullUrl,
                target: "_blank",
                rel: "noreferrer noopener",
                children: item.fullUrl,
              }),
            }),
            _jsx("td", {
              className: "px-6 py-3",
              children: _jsx(Link, {
                to: `${serverUrl}/shortUrl/${item.shortUrl}`,
                target: "_blank",
                rel: "noreferrer noopener",
                children: item.shortUrl,
              }),
            }),
            _jsx("td", { className: "px-6 py-3", children: item.clicks }),
            _jsx("td", {
              className: "px-6 py-3",
              children: _jsxs("div", {
                className: "flex content-center",
                children: [
                  _jsx("div", {
                    className: "cursor-pointer px-2",
                    title: "copy to clipboard",
                    onClick: () => copyToClipboard(item.shortUrl),
                    children: _jsxs("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 24 24",
                      fill: "currentColor",
                      className: "w-6 h-6 fill-white-600",
                      children: [
                        _jsx("path", {
                          fillRule: "evenodd",
                          d: "M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z",
                          clipRule: "evenodd",
                        }),
                        _jsx("path", {
                          fillRule: "evenodd",
                          d: "M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z",
                          clipRule: "evenodd",
                        }),
                      ],
                    }),
                  }),
                  _jsx("div", {
                    className: "cursor-pointer px-2",
                    title: "QR code",
                    onClick: () => openModal(item.fullUrl),
                    children: _jsxs("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      className: "w-6 h-6",
                      children: [
                        _jsx("rect", {
                          x: "3",
                          y: "3",
                          width: "18",
                          height: "18",
                          rx: "2",
                          ry: "2",
                        }),
                        _jsx("path", {
                          d: "M8 14H5.6A2.6 2.6 0 0 1 3 11.4V9m5 6v2m0-11v2m0 6H5.6M16 14h2.4A2.6 2.6 0 0 0 21 11.4V9m-5 6v2m0-11v2m0 6h-2.4M14 5.6A2.6 2.6 0 0 1 16.6 3H19m-5 11H12m2-6v2m-2 0v-2m-2 0H8",
                        }),
                      ],
                    }),
                  }),
                  _jsx("div", {
                    className: "cursor-pointer px-2",
                    title: "delete",
                    onClick: () => deleteURL(item._id),
                    children: _jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 24 24",
                      fill: "currentColor",
                      className: "w-6 h-6 fill-red-500",
                      children: _jsx("path", {
                        fillRule: "evenodd",
                        d: "M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z",
                        clipRule: "evenodd",
                      }),
                    }),
                  }),
                ],
              }),
            }),
          ],
        },
        item._id
      );
    });
  };
  // Copy to Clipboard
  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(`${serverUrl}/shortUrl/${url}`);
      alert(`URL copied: ${serverUrl}/shortUrl/${url}`);
    } catch (error) {
      console.log(error);
    }
  };
  // Delete URL
  const deleteURL = async (id) => {
    const response = await axios.delete(`${serverUrl}/shortUrl/${id}`);
    console.log(response);
    updateReloadState();
  };
  return _jsxs("div", {
    className: "container mx-auto pt-2 pb-10",
    children: [
      _jsx("div", {
        className: "relatve overflow-x-auto shadow-sm sm:rounded-lg",
        children: _jsxs("table", {
          className:
            "w-full table-fixed text-sm text-left rtl:text-right text-gray-500",
          children: [
            _jsx("thead", {
              className: "text-md uppercase text-gray-50 bg-gray-700",
              children: _jsxs("tr", {
                children: [
                  _jsx("th", {
                    scope: "col",
                    className: "px-6 py-3 w-6/12",
                    children: "FullUrl",
                  }),
                  _jsx("th", {
                    scope: "col",
                    className: "px-6 py-3 w-3/12",
                    children: "ShortUrl",
                  }),
                  _jsx("th", {
                    scope: "col",
                    className: "px-6 py-3 ",
                    children: "Clicks",
                  }),
                  _jsx("th", {
                    scope: "col",
                    className: "px-6 py-3 ",
                    children: "ACtion",
                  }),
                ],
              }),
            }),
            _jsx("tbody", { children: renderTableData() }),
          ],
        }),
      }),
      _jsx(QRCodeModal, {
        isOpen: isModalOpen,
        qrUrl: qrUrl,
        onClose: closeModal,
      }),
    ],
  });
};
export default DataTable;
