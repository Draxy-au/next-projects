import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import NotificationContext, {
  NotificationContextProvider,
} from "../contexts/notification-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider store={NotificationContext}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
