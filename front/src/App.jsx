import React from 'react';
import { LogBox, Animated, View, Image } from 'react-native';
import { NavigationContainer, useFocusEffect, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, IconButton, Text } from 'react-native-paper';
import Http from './utils/Http';
import Utils from './utils/Utils';
import { Routing } from './utils/Routing';
import HomeScreen from './screens/Home';
import ArticleScreen from './screens/Article';
import ArticleList from './data/articles.json';

LogBox.ignoreAllLogs(); //Ignore all log notifications

const FadeInView = (props, { navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useFocusEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };
  });

  return (
    <Animated.View // Special animatable View
      style={{
        flex: 1,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

const App = () => {
  const [articlesList, setArticlesList] = React.useState([]);
  const Tab = createBottomTabNavigator();

  /**
   * Fonction pour fetch pour récupérer un article par son id
   * @param {String} articleId ID d'un article
   * @param {*} funcAs200 Fonction callback
   * @param {*} funcAsErr Fonction callback
   */
  const get_article = (articleId, funcAs200, funcAsErr) => {
    Http.request_get_article(articleId, (statusCode, jsonBody) => {
      if (200 === statusCode) {
        if (!Utils.isEmpty(funcAs200)) {
          funcAs200(jsonBody);
        };
      } else {
        if (!Utils.isEmpty(funcAsErr)) {
          funcAsErr(statusCode, jsonBody);
        };
      };
    });
  };

  /** 
    * Fonction pour ajouter un article au panier ==> From screens/Home
    * @param {Object} article
    */
  const addArticle = (article) => {
    setArticlesList(current => {
      const existingArticleIndex = current.findIndex(item => item.id === article.id);

      if (existingArticleIndex !== -1) {
        const updatedArticles = [...current];
        updatedArticles[existingArticleIndex].articleNbr += article['articleNbr'];
        return updatedArticles;
      } else {
        return [article, ...current];
      }
    });
  };

  /** 
   * Fonction pour supprimer un article du panier ==> From screens/Article
   * @param {Object} articleToDelete 
   */
  const deleteArticle = (articleToDelete) => {
    setArticlesList(current =>
      current.filter(article => {
        return article.id !== articleToDelete.id;
      }),
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Accueil'
        screenOptions={
          ({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === Routing.Home) {
                iconName = focused ? 'home' : 'home-outline';
              }
              if (route.name === Routing.Panier) {
                iconName = focused ? 'cart' : 'cart-outline';
              }
              return (
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name={iconName} size={size} color={color} />
                  {(route.name === Routing.Panier && articlesList.length > 0) && (
                    <Text style={{ color: '#fff', fontWeight: 'bold', opacity: focused ? 1 : 0.5 }}>({articlesList.length})</Text>)}
                </View>
              );
            },
            tabBarStyle: {
              backgroundColor: '#009ee3',
            },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#ffffff70',
            tabBarShowLabel: false,
            headerTitleStyle: { color: '#fff', fontWeight: 'bold', fontSize: 25 },
            headerStyle: { backgroundColor: '#009ee3' },
          })
        }
      >
        <Tab.Screen
          name={Routing.Home}
          children={() =>
            <FadeInView>
              <HomeScreen
                onAddArticle={addArticle}
                getArticle={get_article}
                ArticleList={ArticleList}
              />
            </FadeInView>
          }
        />
        <Tab.Screen
          name={Routing.Panier}
          children={() =>
            <FadeInView>
              <ArticleScreen
                articlesList={articlesList}
                onDeleteArticle={deleteArticle}
              />
            </FadeInView>
          }
        />
      </Tab.Navigator>
    </NavigationContainer >
  );
}
export default App;
