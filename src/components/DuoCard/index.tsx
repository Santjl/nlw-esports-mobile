import { TouchableOpacity, View, Text } from "react-native";
import {GameController} from 'phosphor-react-native'

import React from "react";
import { THEME } from "../../theme";
import { DuoInfo } from "../DuoInfo";

import { styles } from "./styles";

export interface DuoCardProps {
  id: string;
  name: string;
  useVoiceCHannel: boolean;
  weekDay: string;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
  weekDays: string[];
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={data.name} />
      <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />
      <DuoInfo label="Disponibilidade" value={`${data.weekDay.length} dias`} />
      <DuoInfo
        label="Usa voice"
        value={data.useVoiceCHannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceCHannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
