import {
  ActivityIndicator,
  Appbar,
  AppbarHeaderProps,
} from "react-native-paper";

export const NavbarTop = ({
  backgroundColor,
  title,
  titleColor,
  actionArrow,
  actionArrowColor,
  rightActions = [],
}) => {
  return (
    <Appbar.Header
      style={{
        backgroundColor: backgroundColor ?? "#1a1a1a",
      }}
    >
      {actionArrow && (
        <Appbar.BackAction
          onPress={actionArrow}
          color={actionArrowColor ?? "#fff"}
        />
      )}
      {title && <Appbar.Content title={title} color={titleColor ?? "#fff"} />}
      {rightActions.map(({ icon, iconColor, action, loading }, index) =>
        !!loading ? (
          <ActivityIndicator
            animating={true}
            color="#fff"
            size={24}
            key={`navbar-top-loading`}
          />
        ) : (
          <Appbar.Action
            icon={icon}
            iconColor={iconColor ?? "#fff"}
            onPress={action}
            key={`navbar-app-${index}`}
          />
        )
      )}
    </Appbar.Header>
  );
};
