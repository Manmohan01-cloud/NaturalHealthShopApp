import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Product from './Product';
import { useNavigation } from '@react-navigation/native';

const ProductList = ({ data }) => {
    const navigation = useNavigation();

    const handleProductPress = (product) => {
        navigation.navigate("Details", { product });
    };

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            style={styles.listContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
                return (
                    <View style={styles.productWrapper}>
                        <Product
                            {...item}
                            onPress={() => handleProductPress(item)}
                        />
                    </View>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 8,
    },
    productWrapper: {
        flex: 1,
        padding: 4,
    },
});

export default ProductList;