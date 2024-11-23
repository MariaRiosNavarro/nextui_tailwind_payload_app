import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface DescriptionChild {
  text?: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  type?: string;
  url?: string;
  newTab?: boolean;
  children?: Array<DescriptionChild>;
}

export interface DescriptionLine {
  children: Array<DescriptionChild>;
  type: string;
}

export interface CardProps {
  id: string;
  order: number;
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
