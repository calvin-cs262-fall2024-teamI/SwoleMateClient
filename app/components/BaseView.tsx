import React from "react";
import { ViewStyle } from "react-native";
import { Edges, SafeAreaView } from "react-native-safe-area-context";

interface BaseViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
  edges?: Edges;
}

export const BaseView: React.FC<BaseViewProps> = ({
  children,
  style,
  className = "flex-1 px-4 py-2",
  edges,
}) => {
  return (
    <SafeAreaView style={style} className={className} edges={edges}>
      {children}
    </SafeAreaView>
  );
};

export default BaseView;
