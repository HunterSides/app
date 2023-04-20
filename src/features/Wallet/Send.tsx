import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  Platform,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
  ActionSheetIOS,
} from 'react-native'
import { getUserIdentity } from '../../utils'
import {
  Background,
  BackdropSmall,
  Navbar,
  View,
  Text,
  StyledButton as NextButton,
} from '../../components'
import { Navigation } from '../../types'
import { Route } from '@react-navigation/native'

type Props = {
  navigation: Navigation
  route: Route<any>
}
const isIOS = Platform.OS === 'ios'
const isWeb = Platform.OS === 'web'

export default function SendScreen({ navigation, route }: Props) {
  const [data, setData] = useState('')
  const [identity, setIdentity] = useState<any>()
  const [amount, setAmount] = useState('')

  useEffect(() => {
    if (route.params) {
      if (route.params.payload.amount)
        setAmount(route.params.payload.amount)
      if (route.params.payload.username)
        setIdentity(route.params.payload.username)
    }
  }, [route.params])

  // const handleTxParams = async (data: string) => {
  //   const requestedIdentity = await getUserIdentity(data)
  //   if (requestedIdentity.statusText !== 'OK') {
  //     //@ts-ignore
  //     return navigation.navigate({
  //       name: 'WalletSendConfirm',
  //       params: {
  //         identity: data,
  //         amount,
  //       },
  //     })
  //   } else {
  //     //@ts-ignore
  //     return navigation.navigate({
  //       name: 'WalletSendConfirm',
  //       params: {
  //         identity: requestedIdentity.data.identity,
  //         amount,
  //       },
  //     })
  //   }
  // }
  const handleTxParams = async (username: string) => {
    const requestedIdentity = await getUserIdentity(username)
    const recipientAddress = await requestedIdentity.data.identity
      .address

    // @ts-ignore
    return navigation.navigate({
      name: 'WalletSendConfirm',
      params: {
        username,
        amount,
        recipientAddress,
      },
    })
  }

  return (
    <View style={styles.container}>
      <Background>
        <View
          style={
            isWeb
              ? { height: 44, backgroundColor: 'transparent' }
              : { height: 'auto', backgroundColor: 'transparent' }
          }
        >
          <StatusBar style={isIOS ? 'light' : 'auto'} />
        </View>
        <Navbar
          title={'Send to'}
          navigation={navigation}
          children={'Root'}
        />
        <BackdropSmall>
          <Text style={styles.title}>Recipient</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={setData}
              value={data}
              placeholder={'Search, Public Address or ENS'}
            />
          </SafeAreaView>
          <Text style={styles.title}>Amount</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={setAmount}
              value={amount}
              placeholder={'Amount to send'}
            />
          </SafeAreaView>
          <View style={styles.buttonContainer}>
            <NextButton
              onPress={() => handleTxParams(data)}
              enabled={true}
            >
              Next
            </NextButton>
          </View>
        </BackdropSmall>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </Background>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    width: '90%',
    height: 48,

    backgroundColor: 'transparent',
  },

  iconImageView: {
    flexDirection: 'row',
  },
  button: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    color: '#000000',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
  },
  title: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 24,
    marginBottom: 10,
  },
  input: {
    placeholderTextColor: 'rgba(112, 79, 247, 0.5)',
    paddingLeft: 19,
    marginLeft: 14,
    marginRight: 14,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(112, 79, 247, 0.5)',
    borderRadius: 24,
    backgroundColor: 'rgba(112, 79, 247, 0.1)',
    width: '90%',
    height: 60,
  },
  secondTitle: {
    fontSize: 36,
    fontFamily: 'Comfortaa_300Light',
    paddingTop: 40,
  },
  balanceJMES: {
    fontWeight: 'bold',
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  balanceEUR: {
    fontWeight: 'bold',
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  buttonImage: {
    padding: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
    margin: 10,
  },
  section: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'flex-start',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  noAssetText: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})