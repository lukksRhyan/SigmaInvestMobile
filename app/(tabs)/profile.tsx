import Ionicons from '@expo/vector-icons/Ionicons';
import {StyleSheet, Image, Platform, TextInput, Button, View} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useState} from "react";
import {useAuth} from "@/context/AuthContext";

export default function TabThreeScreen() {
    const  {user, isAuthenticated,login} = useAuth();

    const handleLogin = async () => {
        const dummyUser = {name:"Rhyan", email:'Lucas.rhyan@gmail.com'};
        login(dummyUser);
    }


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        isAuthenticated?(
            <Image source={{uri:''}} style={styles.headerImage}/>
            ):(
        <Ionicons size={310} name="happy-outline" style={styles.headerImage} />
        )}>
        {isAuthenticated?(
            <>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Bem vindo {user?.name}!</ThemedText>
            </ThemedView>
            </>
        ):(
            <>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Profile</ThemedText>
                </ThemedView>
                <View style={styles.inputForm}>
                <ThemedText>Faça login para obter mais funções.</ThemedText>
                <TextInput style={styles.input} placeholder="email"/>
                <TextInput style={styles.input} placeholder="Senha"/>
                <Button title='login' onPress={handleLogin}/>
                </View>
            </>
        )}







    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input:{
      width: '50%',
      backgroundColor:'#555555',
      borderRadius:6,
      padding:10,
      marginVertical:5,
      fontWeight:'bold',
      color:'white',
  },
  inputForm:{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:'space-around',

  }
});
