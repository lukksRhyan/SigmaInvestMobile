import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useAuth} from "@/context/AuthContext";

export default function PortfoliosScreen() {
  const { userPortfolios, } = useAuth();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
        <ThemedText type="title"> Seus Portfolios</ThemedText>
      {userPortfolios?(
          <ThemedView>
            <ThemedText type="subtitle"> Seus Portfolios</ThemedText>
            {userPortfolios?.map((portfolio,index)=>(
                <ThemedText key={index}>{portfolio.name}</ThemedText>
            ))}
          </ThemedView>
      ):(
          <ThemedText type="subtitle"> Faça login ou cadastre-se para ver seus portfolios</ThemedText>
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
});
