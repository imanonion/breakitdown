import React from 'react'
import { StyleSheet } from "react-native";
import { Avatar, Button, ListItem } from "@ui-kitten/components";
import { Firebase } from "../services/Firebase";

export const NarrowList = () => {

    const goToGenre = () => {
        //navigate to genre page with props from narrowlist 
    }
    
    const RoundButton = () => {
        return (
            <Button onPress={goToGenre}>{'>'}</Button>
        )
    }

    return (
        <ListItem 

        />
    )
}

const styles = StyleSheet.create({
    roundButton: {
        width: 24,
        height: 24,
        borderRadius: 50
    }
})
