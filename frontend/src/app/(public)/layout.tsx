import { PublicNavbar } from "../../components/PublicNavbar";


export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <PublicNavbar />
            <main>
                {children}
            </main>
        </div>
    );
}
