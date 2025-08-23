import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Refresh = () => {
    const router = useRouter();

    useEffect (() => {
        router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ( 
    <>
    
    </> );
}
 
export default Refresh 