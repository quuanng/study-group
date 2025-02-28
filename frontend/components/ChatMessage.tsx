import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, Pressable } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/MainNavigator';

interface ChatMessageProps {
    Message: {sender: string, is_self: boolean, timestamp: number, content: string}
}

// interface CondensedMessage {
//     CondensedMessage: {sender: string, is_self: boolean, timestamps: number[], content: string[]}
// }

const ChatMessage: React.FC<ChatMessageProps> = ({ Message }) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
        {Message.is_self || <View style={styles.icon_container}>
          <View style={styles.placeholder_icon}>

          </View>
        </View>}
        <View style={styles.text_parent_container}>
            {!Message.is_self &&
                <View style={styles.other_text_headline_container}>
                    <Text style={styles.other_message_sender}>{Message.sender}</Text>
                    <Text style={styles.other_message_date}>{Message.timestamp}</Text>
                </View>
            ||
                <View style={styles.self_text_headline_container}>
                    <Text style={styles.self_message_sender}>{Message.sender}</Text>
                    <Text style={styles.self_message_date}>{Message.timestamp}</Text>
                </View>
            }
            {!Message.is_self &&
                <View style={styles.other_text_body_container}>
                    <Text style={styles.body_label}>{Message.content}</Text>
                </View>
            ||
                <View style={styles.self_text_body_container}>
                    <Text style={styles.body_label}>{Message.content}</Text>
                </View>
            }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 400/60,
    borderRadius: 5,
    width:'100%',
  },
  sub_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon_container: {
    flex: 68/400,
    alignContent: 'center',
    justifyContent: 'center',
  },
  placeholder_icon: {
    width:40,
    height:40,
    aspectRatio: 1,
    margin: 'auto',
    borderRadius: 100,
    backgroundColor: '#D9D9D9'
  },
  text_parent_container: {
    flex: 1-68/400,
    flexDirection: 'column',
  },
  other_text_headline_container: {
    paddingTop: 8,
    flex: 0.3,
    fontSize: 16,
    flexDirection: 'row',
  },
  self_text_headline_container: {
    paddingTop: 8,
    flex: 0.3,
    fontSize: 16,
    paddingRight: 10,
    flexDirection: 'row-reverse',
  },
  other_message_sender: {
    textAlign: 'left',
  },
  other_message_date: {
    textAlign: 'left',
    paddingLeft: 5,
    color: '#696969'
  },
  self_message_sender: {
    textAlign: 'right',
  },
  self_message_date: {
    textAlign: 'right',
    paddingRight: 5,
    color: '#696969'
  },
  other_text_body_container: {
    flex: 0.7,
    fontSize: 14,
    paddingRight: 10,
  },
  self_text_body_container: {
    flex: 0.7,
    fontSize: 14,
    paddingRight: 10,
    flexDirection: 'row-reverse',
  },
  body_label: {
    color: '#696969'
  },
  image: {
    width: 150,
    height: 150,
  },
})

export default ChatMessage