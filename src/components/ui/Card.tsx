import React from "react";
import { StyledCard } from "../../styles";


interface Props {
    children: React.ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
    return (
        <StyledCard>
            {children}
        </StyledCard>
    );
};


export default Card;