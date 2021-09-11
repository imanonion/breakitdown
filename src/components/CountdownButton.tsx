import React, {FunctionComponent, useEffect} from 'react'
import { StyleSheet, Image, Animated, TouchableOpacity } from "react-native";
import { Layout, Button, Icon } from "@ui-kitten/components";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useNavigation, CommonActions } from "@react-navigation/native";

interface Props {
    isPlaying: boolean,
    destination: string
}

const CountdownButton: FunctionComponent<Props> = ({destination, isPlaying}) => {
    
    const navigation = useNavigation()
    console.log(isPlaying)
    console.log(destination)

    const navigateToNextScreen = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: destination
            })
        )
    }

    return (
        
        <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={5}
            initialRemainingTime={5}
            size={60}
            strokeLinecap={'round'}
            strokeWidth={8}
            colors={[
            ['#004777', 0.4],
            ['#F7B801', 0.4],
            ['#A30000', 0.2],
            ]}
            onComplete={() => {[false, 1]}}
        >
            {({remainingTime}) => {

                useEffect(() => {
                    if (remainingTime === 0) {
                        navigateToNextScreen()
                     }
                })
                return (
                    <Layout style={styles.nextbutton}>
                        <Button 
                            style={[styles.nextbutton, {}]} 
                            onPress={() => navigateToNextScreen()}>
                            {'>'}
                        </Button>
                    </Layout>
                )
                }
            }
        </CountdownCircleTimer>
    )
}

export default CountdownButton

const styles = StyleSheet.create ({
    nextbutton: {
        borderRadius: 50,
        borderWidth: 0,
    },
})