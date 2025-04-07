import {useEffect} from "react";

type Props = {
    url?: string | any;
}

const Navigator = ({ url }: Props) => {

    useEffect(() => {
       (url) && document.location.assign(url);
       return;
    }, []);

    return <> </>
}


export  default Navigator;