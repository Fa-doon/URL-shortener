import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import * as React from "react";
import FormContainer from "../../../src/components/FormContainer/formContainer";
import axios from "axios";
import { serverUrl } from "../../../src/helpers/Constants";
import DataTable from "../../../src/components/DataTable/dataTable";
import QRCodeModal from "../../../src/components/QRcode/qrcode";
const Container = () => {
  const [data, setData] = React.useState([]);
  // State variable for reload purposes
  const [reload, setReload] = React.useState(false);
  const [qrModalOpen, setQRModalOpen] = React.useState(false);
  const [qrUrl, setQrUrl] = React.useState("");
  const updateReloadState = () => {
    setReload(true);
  };
  const fetchTableData = async () => {
    const response = await axios.get(`${serverUrl}/shortUrl`);
    console.log("The response from the server is: ", response);
    setData(response.data);
    setReload(false);
  };
  React.useEffect(() => {
    fetchTableData();
  }, [reload]);
  const openQrModal = (url) => {
    setQrUrl(url);
    setQRModalOpen(true);
  };
  const closeQrModal = () => {
    setQRModalOpen(false);
  };
  return _jsxs(_Fragment, {
    children: [
      _jsx(FormContainer, { updateReloadState: updateReloadState }),
      _jsx(DataTable, {
        updateReloadState: updateReloadState,
        data: data,
        openQrModal: openQrModal,
      }),
      _jsx(QRCodeModal, {
        isOpen: qrModalOpen,
        qrUrl: qrUrl,
        onClose: closeQrModal,
      }),
    ],
  });
};
export default Container;
