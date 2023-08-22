import Container from "../components/container";
import Content from "../components/mainBar/content";

// async function getData() {
//   const res = await fetch("http://localhost:8080/user/getUser");

//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   return res.json();
// }

export default async function Home() {
  return <div className="border-2 border-elife-700 h-[100vh] w-full"></div>;
}
