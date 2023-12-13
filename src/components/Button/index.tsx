import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, ...rest }: Props): JSX.Element => {
  return <button {...rest}>{children}</button>;
};

export default Button;
