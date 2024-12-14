import { Roboto } from "next/font/google";

const roboto = Roboto({

    weight: ["100","300","500","700"],
    subsets: ["latin"],
  })
  
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
  
      <html lang="en" >
        <body className={roboto.className} style={{ height: '100vh', margin: 0 }}>
          {children}
        </body>
      </html>
    );
  }