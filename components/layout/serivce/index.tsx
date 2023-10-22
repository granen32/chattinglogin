import Head from "next/head";
import React, { ReactNode } from "react";

type ServiceProps = {
  title: string;
  children: React.ReactNode;
};

const ServiceLayout = ({ title, children }: ServiceProps) => {
  return (
    <>
      <Head>{title}</Head>
      {children}
    </>
  );
};

export default ServiceLayout;
