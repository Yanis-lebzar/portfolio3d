import "@/styles/globals.css";
import "../styles/homePage.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  // const router = useRouter();
  // console.log(router.pathname);
  // useEffect(() => {
  //   // Check if the current URL is "/project-gallery"
  //   if (router.pathname === "/_error") {
  //     // Redirect to "/"
  //     router.push("/");
  //   }
  // }, [router.pathname]);
  return <Component {...pageProps} />;
}
