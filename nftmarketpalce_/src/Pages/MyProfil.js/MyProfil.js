import styles from "./MyProfil.module.scss";
import { useGetNFTs } from "../../Hooks/useGetNFTs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const MyProfil = () => {
    const{useGetNFTs} = useGetNFTs();
    useEffect( ()=> {
        const get = async () =s> {
            usegetNFTs()
        }
        get()
    }, [])
    return <div>listedItems Page</div>
};

export { MyProfil } ;
