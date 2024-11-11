import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Text = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
};

export type DescriptionLine = {
  children: Text[];
};

export type CardProps = {
  id: string;
  title: string;
  description: DescriptionLine[];
  category: string;
  codeExample: string;
};
