import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, Pressable, TouchableOpacity } from 'react-native'

interface ChatSendBoxProps {
}

const charLimit = 255;

const ChatSendBox: React.FC<ChatSendBoxProps> = ({ }) => {

    const [content, setContent] = useState('')

    const onPressSend = () => {
        // TODO: Connect to backend
        setContent("")
    }

    return (
        <View style={styles.container}>
            <TextInput onChangeText={setContent} value={content} placeholder="Send a message..." style={styles.content_container}>

            </TextInput>
            <TouchableOpacity style={styles.send_button} onPress={onPressSend}>
                <Text style={styles.send_label}>
                    Send
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 25,
        right: 25,
        height: 50,
        backgroundColor: "#ffffff",
        borderColor: '#D9D9D9',
        borderWidth: 1,
        flexDirection: 'row',
        borderRadius: 100,
    },
    content_container: {
        flex: 0.85,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    send_button: {
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 15,
    },
    send_label: {
        color: '#007AFF',
        fontSize: 16,
    }
})

export default ChatSendBox