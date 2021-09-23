import React, {FunctionComponent, useEffect} from 'react'
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Layout, Button, Icon } from "@ui-kitten/components";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useNavigation, CommonActions } from "@react-navigation/native";

interface Props {
    isPlaying: boolean;
    redirect: () => void;
    shouldStillRedirect: boolean;
    setShouldStillRedirect: (arg: boolean) => void;
}

const CountdownButton: FunctionComponent<Props> = ({isPlaying, redirect, shouldStillRedirect, setShouldStillRedirect}) => {

    const handleSkipClick = () => {
        setShouldStillRedirect(false)
        redirect()

    }

    return (
        <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={3}
            size={60}
            strokeLinecap={'round'}
            strokeWidth={8}
            colors={[
            ['#004777', 0.4],
            ['#F7B801', 0.4],
            ['#A30000', 0.2],
            ]}
            onComplete={() => {[false, 0]}}
        >
            {({remainingTime}) => {
                useEffect(() => {
                    console.log(remainingTime)
                    if(shouldStillRedirect && remainingTime === 0) {
                        redirect()
                    }
    
                }, [remainingTime])

                return (
                    <Layout style={styles.nextbutton}>
                        <Button 
                            style={[styles.nextbutton, {}]} 
                            onPress={handleSkipClick}>
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
        borderRadius: 100,
        borderWidth: 0,
    },
})
