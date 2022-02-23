import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
          {...props}
          IconComponent={FontAwesome5}
          iconSize={23}
          color="white"
        />
    );
};

export default CustomHeaderButton;