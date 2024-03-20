import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import Header from "../src/components/Header/header";
import Footer from "../src/components/Footer/footer";
import Container from "../src/components/Container/container";
const App = () => {
  return _jsxs(_Fragment, {
    children: [_jsx(Header, {}), _jsx(Container, {}), _jsx(Footer, {})],
  });
};
export default App;
