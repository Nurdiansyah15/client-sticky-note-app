import Header from "../components/Header";

function Layout({ children }) {
  return (
    <div className="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 flex flex-col h-screen bg-slate-700 m-auto relative">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
