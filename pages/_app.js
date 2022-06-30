import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>CEBOOSTUPX</title>
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
}

export default MyApp;
