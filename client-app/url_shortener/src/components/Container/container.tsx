import * as React from "react";
import FormContainer from "../FormContainer/formContainer";
import { UrlData } from "../../interface/urlData";
import axios from "axios";
import { serverUrl } from "../../helpers/Constants";
import DataTable from "../DataTable/dataTable";
import QRCodeModal from "../QRcode/qrcode";

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<UrlData[]>([]);
  // State variable for reload purposes
  const [reload, setReload] = React.useState<boolean>(false);
  const [qrModalOpen, setQRModalOpen] =React.useState<boolean>(false);
  const [qrUrl, setQrUrl] = React.useState<string>("")

  const updateReloadState = (): void => {
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

  const openQrModal = (url: string) => {
    setQrUrl(url);
    setQRModalOpen(true);
  };

  const closeQrModal = () => {
    setQRModalOpen(false);
  };


  return (
    <>
      <FormContainer updateReloadState={updateReloadState} />
      <DataTable updateReloadState={updateReloadState} data={data} openQrModal={openQrModal} />
      <QRCodeModal isOpen={qrModalOpen} qrUrl={qrUrl} onClose={closeQrModal} />
    </>
  );
};

export default Container;
