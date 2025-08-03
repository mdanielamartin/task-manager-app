import { UserNavbar } from "../../components/UserNavbar";


export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <UserNavbar />
            <main>
                {children}
            </main>
        </div>
    );
}
