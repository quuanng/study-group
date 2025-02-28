import React from 'react'
import { View, Text, StyleSheet, FlatList, Button, SafeAreaView} from 'react-native'
import ChatMessage from '../components/ChatMessage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/MainNavigator';

export default function ChatsScreen() {

  const DATA: {sender: string, is_self: boolean, timestamp: number, content: string}[] = [
    {
        sender: "Tony Rutherford",
        timestamp: 5001,
        is_self: true,
        content: "Hey guys how we doin"
    },
    {
        sender: "Quang Pham",
        timestamp: 5002,
        is_self: false,
        content: "Doin good tony"
    },
    {
        sender: "Adam Douiri",
        timestamp: 5003,
        is_self: false,
        content: "Alriight"
    },
  ];

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.background}>
          <View style={styles.container}>
              <View style={styles.head_container}>
                  <Button title="Back" onPress={() => navigation.goBack()} />
                  <View style={styles.title_container}>
                      <Text style={styles.chat_title}>Chat Title Here</Text>
                  </View>
              </View>
          <FlatList contentContainerStyle={styles.list} data={DATA}
              renderItem={({item}) => <ChatMessage Message={item} />}
              keyExtractor={(item, idx) => idx.toString()} />
          </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    background: {
        backgroundColor:'#ffffff',
        width:'100%',
        height:'100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#f2f2f2',
    },
    head_container: {
        height: 50,
        backgroundColor: '#ffffff',
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    title_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    chat_title: {
        fontSize: 18,
    },
    list: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 2,
        gap: 2,
        flexDirection: 'column',
        alignItems: 'center',
    },
});
