import {colors, fonts} from './fundations'

const theme = () => {
  return({
    /* Colors */
    brandColor: colors.color.brand,
    textColor: colors.color.black.b500,
    whiteColor: colors.color.white.full,
    backgroundColor: colors.color.white.background,
    iris100: colors.color.iris.i100,
    iris200: colors.color.iris.i200,
    iris300: colors.color.iris.i300,
    iris500: colors.color.iris.i500,
    green300: colors.color.green.g300,
    green500: colors.color.green.g500,
    green700: colors.color.green.g700,
    green1000: colors.color.green.g1000,
    gray000: colors.color.gray.g000,
    gray100: colors.color.gray.g100,
    gray200: colors.color.gray.g200,
    gray300: colors.color.gray.g300,
    gray400: colors.color.gray.g400,
    gray500: colors.color.gray.g500,
    yellow200: colors.color.yellow.y200,
    yellow300: colors.color.yellow.y300,
    yellow500: colors.color.yellow.y500,
    yellow700: colors.color.yellow.y700,
    orange100: colors.color.orange.o100,
    orange200: colors.color.orange.o200,
    orange300: colors.color.orange.o300,
    red100 : colors.color.red.r100,
    red300 : colors.color.red.r300,
    red500 : colors.color.red.r500,
    red700 : colors.color.red.r700,
    gradienteBrandColor: colors.color.brand,
    hoverBrand: colors.color.hover.brand,
    hoverNavbarMenu: colors.color.hover.brandTransparent,
    shadowCard: colors.shadow.card,
    shadowCardImage: colors.color.black.b100,
    
    /* Fonts */
    brandFont: fonts.brandFont,
    titleFont: fonts.titleFont,
    textFont: fonts.textFont,
    weight: fonts.weight,
  })
}

export default theme
