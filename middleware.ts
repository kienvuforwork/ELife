import { NextRequest, NextResponse } from "next/server";



export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get('token')?.value;

  try {
    const response = await fetch("http://localhost:8080/user/getUser", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },

    });
      const userData = await response.json(); // Parse the JSON response
    // const user =  userData.data.user.username;
    // return user;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};




export const config = {
  matcher: "/home"
};