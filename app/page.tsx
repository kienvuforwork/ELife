import RootLayout from "./layout";
export async function getServerSideProps() {
  const res = await fetch("http://localhost:8080/user/getUser");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
const Home = () => {
  return <div className="text-blue-500"></div>;
};

export default Home;
