import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import t from "../translator/helper";
import Utils from "../utils/Utils";

const ButtonGoBack = ({language}) => {
    let router = useRouter()

    return (
        <Button
            variant="link"
            size="sm"
            className="shadow-0"
            onClick={() => router.back()}
            style={{ color: "#73879C" }}>
            <FaChevronLeft /> {t("button:Back", language)}
        </Button>
    );
};

export default ButtonGoBack;
