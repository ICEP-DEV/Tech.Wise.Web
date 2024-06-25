// import Layout from '../../app/layout' 
// import GoogleMapSection from "./GoogleMapSection";
// import SearchSection from "./SearchSection";
// import { SourceContext } from '../../app/Context/SourceContext';
// import { DestinationContext } from '../../app/Context/DestinationContext';
// import Header from '../Header'
// import Image from "next/image";
// import { useState } from "react";

// export default function Home() {
//   const [source, setSource] = useState([]);
//   const [destination, setDestination] = useState([]);

//   return (
//     <SourceContext.Provider value={{ source, setSource }}>
//       <DestinationContext.Provider value={{ destination, setDestination }}>
//         <Layout>
//           <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
//             <Header />
//             <div className='col-span-3 md:col-span-2'>
//               <GoogleMapSection />
//             </div>
//             <div className='col-span-3 md:col-span-1'>
//               <SearchSection />
//             </div>
//           </div>
//         </Layout>
//       </DestinationContext.Provider>
//     </SourceContext.Provider>
//   );
// }


