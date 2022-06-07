import * as React from "react";

interface ContainerProps {
  children: React.ReactNode
}

const Container:React.FunctionComponent<ContainerProps> = ({children}) => {

  return (
    <div className="flex justify-center my-8 p-5">{children}</div>
  )
}

export default Container