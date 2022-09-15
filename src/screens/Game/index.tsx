import { View, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import logoImg from "../../assets/logo-nlw-esports.png";

import { THEME } from "../../theme";
import { styles } from "./styles";

import { GameParams } from "../../@types/navigation";

import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import React, { useEffect, useState } from "react";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";


export function Game() {
  const [ads, setAds] = useState<DuoCardProps[]>([])
  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack();
  }

   useEffect(() => {
    fetch(`http://192.168.1.64:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setAds(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right}></View>
        </View>

        <Image
        style={styles.cover}
          source={{ uri: game.bannerUrl}}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard data={item} onConnect={() => {}}/>
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.containerList}
          contentContainerStyle={styles.contentList}
        />
        
      </SafeAreaView>
    </Background>
  );
}
