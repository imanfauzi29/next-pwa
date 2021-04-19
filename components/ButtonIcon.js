import {useRouter} from 'next/router'
import {Button} from "react-bootstrap";
import React from "react";

const ButtonIcon = ({url, label, faIcon}) => {
    const router = useRouter()

    function redirect() {
        if (typeof window !== 'undefined') {
            router.push(url)
        }
    }

    const icon = "fa " + faIcon
    return (
        <Button type="button" variant="primary" size="sm" onClick={redirect}>
            <i className={icon}/> {label}
        </Button>
    )

}
export default ButtonIcon