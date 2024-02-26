export interface Banner {
  title: string;
  cta: CallToAcction;
  backgroundCssClass: string;
  imgPath: string;
  isSmall: boolean;
}

export interface CallToAcction {
  text: string;
  link: string;
}
