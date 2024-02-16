import { StyleSheet, View } from "react-native";
import { Menu } from "react-native-paper";

export const MenuComponent = ({ visible, dismiss, posX, posY, items = [] }) => {
  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={dismiss}
        anchor={{
          x: posX,
          y: posY,
        }}
        contentStyle={{
          backgroundColor: "#1a1a1a",
        }}
        anchorPosition="top"
        elevation={2}
      >
        {items.map(
          (
            { title, theme, leadingIcon, trailingIcon, rippleColor, action },
            index
          ) => (
            <Menu.Item
              key={`menu-${title}-item-${index}`}
              title={title}
              theme={theme}
              leadingIcon={leadingIcon}
              trailingIcon={trailingIcon}
              rippleColor={rippleColor}
              onPress={action}
              titleStyle={{
                color: "#fff",
              }}
            />
          )
        )}
      </Menu>
    </View>
  );
};

const s = StyleSheet.create({});
