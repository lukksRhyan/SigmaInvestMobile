import Ionicons from '@expo/vector-icons/Ionicons';
import {StyleSheet, Image, Platform, Button, View, Modal, TouchableOpacity, TextInput} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
//import {PortfolioCard}
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useAuth} from "@/context/AuthContext";
import React, {useState} from "react";
import PortfolioCard from "@/components/PortfolioCard";
import CreatePortfolioCard from "@/components/CreatePortfolioCard";

export default function PortfoliosScreen() {
  const {
    token,
    userPortfolios,
    fetchUserPortfolios,
    createPortfolio } = useAuth();


  const [currentPortfolio, setCurrentPortfolio] = useState<any|null>(null);


  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isCreationOKModalVisible, setIsCreationOKModalVisible] = useState(false);
  const [isCreationERRORModalVisible, setIsCreationERRORModalVisible] = useState(false);


  const [newPortfolioTitle, setNewPortfolioTitle] = useState<string>('');

  const handleCreateNewPortfolio = async () => {
    if(token&&newPortfolioTitle){
      const tryCreation = await createPortfolio(token,newPortfolioTitle);
      if(tryCreation === 'OK'){
        console.log('Porfolio criado com sucesso');
        setIsCreationOKModalVisible(true);
        setNewPortfolioTitle('');
      }
      if(tryCreation === 'ERROR'){
        console.log('Erro ao criar o portfolio');
        setIsCreationERRORModalVisible(true);
      }
    }
  }

  const closeAllModals = () =>{ //Evita bugs de mais de um modal ficar aberto
    setIsCreateModalVisible(false);
    setIsCreationOKModalVisible(false);
    setIsCreationERRORModalVisible(false);
    setIsDetailModalVisible(false);
    setCurrentPortfolio(null);
  }

  const handleFetchUserPortfolios = async () => {
    if(token){//Um pouco reduntante, mas assegurado
      await fetchUserPortfolios(token);
      return;
    }
    console.error("Token de autenticação não definido!");
  }

  const handlePortfolioCardPress = (portfolio:any) =>{
    setCurrentPortfolio(portfolio);
    setIsDetailModalVisible(true);
  }




  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="briefcase" style={styles.headerImage} />}>
        <ThemedText type="title"> Seus Portfolios</ThemedText>
          {userPortfolios?(
            <ThemedView>
              <ThemedView style={styles.buttonHolder}>
              <Button title='Recarregar porfolios'  onPress={handleFetchUserPortfolios}/>
              </ThemedView>


                {userPortfolios?.map((portfolio,index)=>(
                   <PortfolioCard thisPortfolio={portfolio} onPress={() =>{handlePortfolioCardPress(portfolio);}} />
                 ))}
                   <CreatePortfolioCard onPress={() => {
                       setIsCreateModalVisible(true)
                   }}/>

              {/*Modal para criar portfolios*/}
              <Modal
                  animationType='slide'
                  transparent={true}
                  visible={isCreateModalVisible}
                  onRequestClose={closeAllModals}
                >
                <View style={styles.modalContent}>
                  <ThemedText style={styles.modalTitle}>Criar novo portfolio</ThemedText>
                  <TextInput
                  onChangeText={setNewPortfolioTitle}
                  placeholder='Titulo do portfolio'
                  value={newPortfolioTitle}
                  style={styles.titleInput}
                  />
                  <View style={styles.buttonHolder}>
                    <Button title='Criar Portfolio'  onPress={handleCreateNewPortfolio}/>
                    <Button title='Cancelar' color='red' onPress={closeAllModals}/>
                  </View>
                </View>
              </Modal>

              {/* Modal de criacao bem sucedida */}
              <Modal
                  animationType='slide'
                  transparent={true}
                  visible={isCreationOKModalVisible}
                  onRequestClose={closeAllModals}
              >
                <View style={styles.modalContent}>
                  <ThemedText style={styles.modalTitle}>Portfolio Criado com sucesso! ✔</ThemedText>
                  <Button title='Fechar' onPress={closeAllModals}/>
                </View>
              </Modal>

              {/* Modal de criacao com erro */}
              <Modal
                animationType='slide'
                transparent={true}
                visible={isCreationERRORModalVisible}
                onRequestClose={closeAllModals}
              >
                <ThemedText style={styles.modalTitle}>Houve um erro ao criar o portfolio ❌</ThemedText>
                  <Button title='Fechar' onPress={closeAllModals}/>
              </Modal>

              {/* Modal de detalhes do portfolio */}
              <Modal
                  animationType='slide'
                  transparent={true}
                  visible={isDetailModalVisible}
                  onRequestClose={closeAllModals}
                >


                <View style={styles.modalContent}>
                  {currentPortfolio&&
                currentPortfolio.title?(
                    <View style={styles.modalTitleHolder}>
                    <ThemedText style={styles.modalTitle}>Detalhes do portfolio</ThemedText>
                    </View>
                ):(
                    <ThemedText style={styles.modalTitle}>Portfolio não carregado</ThemedText>
                )}
                  {
                    currentPortfolio&&
                      currentPortfolio.title&&
                      currentPortfolio.total&&
                      currentPortfolio.appreciation?(
                          <>
                            <View style={styles.infoTable}>
                              <View style={styles.infoRowContainer}>
                                <ThemedText style={styles.portfolioInfoDescription}>Título:</ThemedText>
                                <ThemedText style={styles.portfolioInfoContent}>{currentPortfolio.title}</ThemedText>
                              </View>
                              <View style={styles.infoRowContainer}>
                                <ThemedText style={styles.portfolioInfoDescription}>Total:</ThemedText>
                                <ThemedText style={styles.portfolioInfoContent}>{currentPortfolio.total}</ThemedText>
                              </View>
                              <View style={styles.infoRowContainer}>
                                <ThemedText style={styles.portfolioInfoDescription}>Valorização:</ThemedText>
                                <ThemedText style={styles.portfolioInfoContent}>{currentPortfolio.appreciation}</ThemedText>
                              </View>


                            </View>
                          </>
                    ):('')
                  }
                  <View style={styles.buttonHolder}>
                    <Button title='Criar Portfolio'  onPress={()=>{closeAllModals()}}/>
                    <Button title='Cancelar' color='red' onPress={()=>{closeAllModals()}}/>
                  </View>
                </View>
              </Modal>

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
  buttonHolder:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems: 'flex-start',
  },
    modalTitle: {
    fontWeight:"bold",
    fontSize:30,
    flexDirection: 'row',
    gap: 8,
  },
    modalTitleHolder:{
      width:'100%',
      backgroundColor:'#555555',
      alignItems:'center',
      padding:10,
      borderColor:'white',
      borderTopLeftRadius:6,
      borderTopRightRadius:6,
    },
    modalContent:{
      margin:'10%',
      backgroundColor:'#444444',
      borderRadius:10,
      paddingBottom:5,
      flexDirection:'column',
      justifyContent:'space-evenly',
      alignItems: 'center',
      boxShadow:'10px 5px 5px black',
      gap:10,
    },

  titleInput:{
    width:'95%',
    height:50,
    fontSize:20,
    backgroundColor:'#777777',
    borderColor:'white',
    borderRadius:5,
    padding:10,
    borderStyle:'solid',
    color:'white'
  },
  infoTable:{
    alignItems: "flex-start",
    justifyContent:'flex-start',
    flexDirection:"column",
    gap:5,
  },
  portfolioInfoDescription:{
    fontWeight:'bold',
    fontSize:25,
  },
  portfolioInfoContent:{
    fontSize:25,
  },
  infoRowContainer:{
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
  }

});
