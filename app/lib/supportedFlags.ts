export const supportedFlags: {
  name: string;
  flag: string;
}[] = [
  {
    name: "English",
    flag: "/images/flags/british-flag.png",
  },
  {
    name: "Mandarin",
    flag: "/images/flags/chinese-flag.png",
  },
  {
    name: "French",
    flag: "/images/flags/french-flag.png",
  },
  {
    name: "German",
    flag: "/images/flags/germany-flag.png",
  },
  {
    name: "Hindi",
    flag: "/images/flags/indian-flag.png",
  },
  {
    name: "Italian",
    flag: "/images/flags/italian-flag.png",
  },
  {
    name: "Japanese",
    flag: "/images/flags/japanese-flag.png",
  },
  {
    name: "Korean",
    flag: "/images/flags/korean-flag.png",
  },
  {
    name: "Urdu",
    flag: "/images/flags/pakistani-flag.png",
  },
  {
    name: "Portuguese",
    flag: "/images/flags/portuguese-flag.png",
  },
  {
    name: "Russian",
    flag: "/images/flags/russian-flag.png",
  },
  {
    name: "Spanish",
    flag: "/images/flags/spain-flag.png",
  },
  {
    name: "Swedish",
    flag: "/images/flags/swedish-flag.png",
  },
  {
    name: "Thai",
    flag: "/images/flags/thai-flag.png",
  },
  {
    name: "Turkish",
    flag: "/images/flags/turkish-flag.png",
  },
  {
    name: "United Arab Emirates",
    flag: "/images/flags/uae-flag.png",
  },
  {
    name: "Ukrainian",
    flag: "/images/flags/ukraine-flag.png",
  },
  {
    name: "United States",
    flag: "/images/flags/usa-flag.png",
  },
  {
    name: "Arabic",
    flag: "/images/flags/saudi-flag.png",
  },
  {
    name: "Dutch",
    flag: "/images/flags/netherlands-flag.png",
  },
  {
    name: "Polish",
    flag: "/images/flags/polish-flag.png",
  },
  {
    name: "Brazilian",
    flag: "/images/flags/brazil-flag.png",
  },
  {
    name: "Hebrew",
    flag: "/images/flags/israel-flag.png",
  },
];

export const getFlagForLanguage = (language: string) => {
  const flag = supportedFlags.find((flag) => flag.name === language);
  return flag ? flag.flag : null;
};
