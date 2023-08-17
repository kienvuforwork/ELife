import { GetServerSideProps } from "next";
import {parse} from "cookie"

export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log("asdf")
    const cookies = parse(context.req.headers.cookie || "");
    const jwtToken = cookies.token; // Replace with your actual cookie name
    console.log("getServerSideProps is running!");
    if (jwtToken) {
      try {
        const response = await fetch("http://localhost:8080/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
  
        const user = await response.json();
  
        return {
          props: {
            user,
          },
        };
      } catch (error) {
        console.log("error")
      }
    }
  
    return {
      props: {},
    };
  };
  

  
