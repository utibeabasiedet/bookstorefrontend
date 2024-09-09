import Testimoni from "../(home)/components/testimonal";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    
      {children}
      <Testimoni />
      <div className="my-[3rem]  sm:my-[6rem]">
        
      </div>
    </>
  );
}
