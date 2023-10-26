import { FC } from "react";

interface ICompanyName {
  company: string;
}

const CompanyName: FC<ICompanyName> = (props) => {
  const { company } = props;

  return (
    <h4 className="text-xl font-semibold leading-none text-default-600 capitalize">
      {company}
    </h4>
  );
};

export default CompanyName;
