//type checking for Navigator and Screens
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamsList = {
    childrenProps: undefined
}

export type OnboardScreenProp = NativeStackScreenProps<RootStackParamsList, "childrenProps">