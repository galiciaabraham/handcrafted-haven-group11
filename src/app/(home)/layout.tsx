import NavBar from "../ui/layout/NavBar";
export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <>
            <header>
              <NavBar />
            </header>
            {children}
        </>
    );
  }
  