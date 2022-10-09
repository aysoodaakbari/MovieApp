
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-web";
import GenreCard from "../components/GenreCard";
import MovieCard from "../components/MovieCard";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  getNowPlayingMovies,
  getUpcomingMovies,
  getAllGenres,
} from "../services/Movieservices.js";

const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];

const HomeScreen = ({ navigation }) => {
  const [activeGenre, setActiveGenre] = useState("All");
  const [nowPlayingMovies, setNowPlayingMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const [genres, setGenres] = useState([{ id: 10110, name: "All" }]);

  useEffect(() => {
    getNowPlayingMovies().then((movieResponse) =>
      setNowPlayingMovies(movieResponse.data)
    );
    getUpcomingMovies().then((movieResponse) =>
      setUpcomingMovies(movieResponse.data)
    );
    getAllGenres().then((genreResponse) =>
      setGenres([...genres, ...genreResponse.data.genres])
    );
  }, []);

  return (
    
    <SafeAreaView>
      <TouchableOpacity
      onPress={navigation.openDrawer}>
<FontAwesome5 name="bars" size={24}></FontAwesome5>
      </TouchableOpacity>
    <Text style={styles.title}>Movies App</Text>
    <View style={styles.container}>
  
      <View>
        <FlatList
          data={nowPlayingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ width:20}} />}
          ListHeaderComponent={() => <View style={{ width:20}} />}
          ListFooterComponent={() => <View style={{ width:20}} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              voteAverage={item.vote_average}
              poster={item.poster_path}
              size={0.4}
              onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
          )}
        />
      </View>
      <View style={styles.genreListContainer}>
        <FlatList
          data={genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ width:'30px'}} />}
          ListHeaderComponent={() => <View style={{ width:'30px'}} />}
          ListFooterComponent={() => <View style={{ width:'30px'}} />}
          renderItem={({ item }) => (
            <GenreCard
              genreName={item.name}
              active={item.name === activeGenre ? true : false}
              onPress={setActiveGenre}
            />
          )}
        />
      </View>
      <View>
        <FlatList
          data={upcomingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ width:20}} />}
          ListHeaderComponent={() => <View style={{ width:20}} />}
          ListFooterComponent={() => <View style={{ width:20}} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              voteAverage={item.vote_average}
              poster={item.poster_path}
              size={0.6}
              onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
          )}
        />
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  headerContainer: {
 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  genreListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom:20
  },

  title:{
    paddingHorizontal: 20,
    paddingVertical: 10,
   
  }
  
});

export default HomeScreen;