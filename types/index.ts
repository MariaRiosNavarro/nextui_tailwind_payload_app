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

export interface DescriptionLine {
  children: Array<{
    children: any;
    text: string;
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    underline?: boolean;
    strikethrought?: boolean;
  }>;
  type: String;
}
export interface CardProps {
  id: string; // Añadido el id
  title: string;
  description: DescriptionLine[];
  category: string;
  codeExample: string;
}

export type ApiCard = CardProps;

export type ApiResponse = {
  docs: ApiCard[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};
