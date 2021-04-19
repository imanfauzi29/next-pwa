import React from "react";
import {useRouter} from "next/router";
import {Button} from "react-bootstrap";

const ButtonRedirect = ({path, label, size, icon, style = {}}) => {
    const router = useRouter()

    function redirect() {
        if (typeof window !== 'undefined') {
            router.push(path)
        }
    }

    return (
        <Button type="button" className="button-add" size={size} variant="primary" onClick={redirect} style={style}>
            {icon} { label }</Button>
    )
}

export default ButtonRedirect