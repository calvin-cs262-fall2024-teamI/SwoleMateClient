/**
 * @fileoverview Base view component with keyboard avoiding behavior and safe area handling
 */

import React from "react";
import { KeyboardAvoidingView, ViewStyle } from "react-native";
import { Edges, SafeAreaView } from "react-native-safe-area-context";

/**
 * Props for the BaseView component
 * @interface BaseViewProps
 */
interface BaseViewProps {
  /** Child components to render */
  children: React.ReactNode;
  /** Optional style overrides */
  style?: ViewStyle;
  /** Optional className for styling */
  className?: string;
  /** Safe area edges to respect */
  edges?: Edges;
}

/**
 * A base view component that handles keyboard behavior and safe area
 * @param props - Component props
 * @returns JSX.Element
 */
export const BaseView: React.FC<BaseViewProps> = ({
  children,
  style,
  className = "flex-1 px-4 py-2",
  edges,
}) => {
  return (
    <SafeAreaView style={style} className={className} edges={edges}>
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BaseView;
