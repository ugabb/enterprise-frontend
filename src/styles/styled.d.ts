import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      brandColorDefault: string;
      textColorPrimary: string;
      outlineGrayDark: string;
      bgWhite: string
    };
  }
}
