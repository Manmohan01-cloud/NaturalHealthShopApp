import { StyleSheet } from "react-native";

const getProductStyles = (colors) => StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: "visible",
    margin: 6,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
  },
  touchable: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 160,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  contentContainer: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  category: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.subtleText,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginTop: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 8,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  wishlistButton: {
      position: 'absolute',
      top: -10,
      right: -5,
      backgroundColor: colors.card,
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      zIndex: 10,
  },
});

export default getProductStyles;