interface ITlaTag {
  text: any;
}

export const TlaSuccessTag = ({ text }: ITlaTag) => {
  return <div className={"text-green-800 bg-green-100 tla-tag rounded-full text-center text-sm py-0.5 w-fit px-2"}>{text}</div>;
};

export const TlaInfoTag = ({ text }: ITlaTag) => {
  return <div className={"text-blue-700 bg-blue-100 tla-tag rounded-full text-center text-sm py-0.5 w-fit px-2"}>{text}</div>;
};

export const TlaGrayTag = ({ text }: ITlaTag) => {
  return <div className={"text-gray-700 bg-gray-200 tla-tag rounded-full text-center text-sm py-0.5 w-fit px-2"}>{text}</div>;
};

export const TlaErrorTag = ({ text }: ITlaTag) => {
  return <div className={"text-red-700 bg-red-100 tla-tag rounded-full text-center text-sm py-0.5 w-fit px-2"}>{text}</div>;
};
