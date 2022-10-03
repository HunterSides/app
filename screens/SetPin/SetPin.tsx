import React, { memo, useEffect, useState } from "react";
import {
    Background2 as Background,
    BackButton,
    Header,
    NumberKeyboard,
} from "../../components";
import { useStoreActions } from "../../hooks/storeHooks";
import { Navigation } from "../../types";

type Props = {
    navigation: Navigation;
};

const SetPinScreen = ({ navigation }: Props) => {
    const initialMessage = "Create your passcode";
    const confirmMessage = "Confirm your passcode";
    const [pinMessage, setPinMessage] = useState(initialMessage);
    const [pin, setPin] = useState([]);
    const [pin1, setPin1] = useState([]);
    const [pinOk, setPinOk] = useState(false);

    const addPasscode = useStoreActions((actions) => actions.addPasscode);

    useEffect(() => {
        if (pin.length === 4 && pin1.length === 0) {
            setPin1(pin);
            setPin([]);
            setPinMessage(confirmMessage);
        }

        if (pin.length === 4 && pin1.length === 4) {
            if (JSON.stringify(pin) === JSON.stringify(pin1)) {
                setPinOk(true);
            } else {
                setPinMessage("Create your passcode");
                setPin([]);
                setPin1([]);
            }
        }
    }, [pin]);

    const _onPressNumber = (n: number) => {
        setPin([...pin, n]);
    };

    useEffect(() => {
        async function generate() {
            addPasscode({
                passcode: pin.join(""),
            });
            navigation.navigate("Root")

        }

        if (pinOk) {
            generate();
        }
    }, [pinOk]);

    return (
        <Background noMenu skipHeader>
            <BackButton goBack={() => navigation.navigate("Onboarding")} />
            <Header>{pinMessage}</Header>

            <NumberKeyboard onPress={_onPressNumber} pin={pin} />
        </Background>
    );
};

export default memo(SetPinScreen);
