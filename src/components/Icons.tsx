import React, {FunctionComponent} from "react"
import { Icon, IconProps, IconElement } from "@ui-kitten/components";

export function EmailIcon (props: IconProps): IconElement {
    return <Icon {...props} name="email-outline" />;
}

export function PasswordIcon(props: IconProps): IconElement {
    return <Icon {...props} name="lock-outline" />;
}

export const HomeIcon = (props: IconProps): IconElement => {
    return <Icon {...props} name="home-outline" />;
}

export const BrowseIcon = (props: any): IconElement => {
    return <Icon {...props} name="book-outline" />;
}

export const CreateVideoIcon = (props: any): IconElement => {
    return <Icon {...props} name="plus-square-outline" />;
}
 
export const ProfileIcon = (props: any): IconElement => {
    return <Icon {...props} name="person-outline" />;
}