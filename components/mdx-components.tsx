import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { Callout } from "./callout";
import { JSX, ClassAttributes, HTMLAttributes, ThHTMLAttributes } from "react";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
  strong: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLElement> &
      HTMLAttributes<HTMLElement>
  ) => {
    return (
      <strong className=" text-ST_primary dark:text-ST_postive" {...props} />
    );
  },
  th: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLTableHeaderCellElement> &
      ThHTMLAttributes<HTMLTableHeaderCellElement>
  ) => {
    return (
      <th className="bg-slate-100 text-ST_primary dark:bg-white" {...props} />
    );
  },
};
interface MdxProps {
  code: string;
}

export default function MDXcomponent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
