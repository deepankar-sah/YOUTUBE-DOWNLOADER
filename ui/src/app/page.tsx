import Header from "@/components/Header";
import Main from "@/components/Main";

const Home = () => {
  return (
    <div className=" h-screen bg-gradient-to-b from-[#020024] from-20% via-[#090979] via-60% to-[#00D4FF] to-100% flex flex-col space-y-6 items-center justify-center">
      <Header />
      <Main />
    </div>
  );
};
export default Home;
