import {useRouter} from 'next/router'
import {Button} from "react-bootstrap";
import React from "react";

const ButtonLink = ({url, label, icon}) => {
    const router = useRouter()

    function redirect() {
        if (typeof window !== 'undefined') {
            router.push(url)
        }
    }

    return (
        <Button size="sm" className="shadow-0" variant="link" onClick={redirect}>{icon} {label}  </Button>
    )

}
export default ButtonLink