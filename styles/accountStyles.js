import { StyleSheet } from "react-native";

const getAccountStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
  },
  scrollView: {
    paddingBottom: 30,
  },
  profileHeader: {
    backgroundColor: colors.card,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
  },
  userEmail: {
    fontSize: 15,
    color: colors.subtleText,
    marginTop: 4,
  },
  menuSection: {
    marginTop: 20,
  },
  menuSectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.subtleText,
      paddingHorizontal: 20,
      marginBottom: 10,
      textTransform: 'uppercase',
  },
  menuContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginHorizontal: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuRowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  chevronIcon: {
    color: '#ccc',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 75,
  },
  profileIconBg: { backgroundColor: '#e7f3fe' },
  ordersIconBg: { backgroundColor: '#fef6e6' },
  wishlistIconBg: { backgroundColor: '#feeef0' },
  themeIconBg: { backgroundColor: colors.theme === 'dark' ? '#2c2c2c' : '#f0f0f0' },
  logoutIconBg: { backgroundColor: '#fdecec' },
  logoutText: {
      color: '#e74c3c',
      fontWeight: '600',
  }
});

export default getAccountStyles;