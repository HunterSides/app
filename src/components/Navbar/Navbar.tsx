import React, { memo } from 'react'
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native'

import { Navigation } from '../../types'
import { useAppTheme } from '../../theme'
type Props = {
  children: string
  navigation: Navigation
  backButton?: boolean
  title?: string
}

const Navbar = ({ navigation, children, title }: Props) => {
  const { colors } = useAppTheme()

  return (
    <View style={styles.navbar}>
      <View style={styles.toolbar}>
        <View style={styles.flexRow}>
          <Pressable
            onPress={() => navigation.navigate(children)}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
            })}
          >
            <Image
              source={require('../../../assets/icons/backarrow.png')}
              style={{
                marginTop: 2,
                width: 10,
                height: 16,
              }}
            />
          </Pressable>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View
          style={[styles.wallet, { backgroundColor: colors.primary }]}
        >
          <Image
            source={require('../../../assets/icons/JMES_Icon.png')}
            style={{
              marginTop: 2,
              marginRight: 3,
              width: 10,
              height: 13,
            }}
          />
          <Text style={styles.walletText}> 0.0</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: 'auto',
    paddingLeft: 23,
    width: '100%',
    marginBottom: 21,
    height: 23,
  },
  title: {
    marginLeft: 18,
    fontSize: 18,
    alignItems: 'center',
    color: '#FFFFFF',
  },
  walletText: {
    height: 16,
    fontSize: 14,
    alignItems: 'center',
    color: '#FFFFFF',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wallet: {
    borderRadius: 90,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 13,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    justifyContent: 'flex-start',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
})

export default memo(Navbar)
