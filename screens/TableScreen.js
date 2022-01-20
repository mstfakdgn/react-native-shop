import React from "react";
import {StyleSheet, Text,View,ScrollView,Dimensions} from 'react-native';
import CustomHeaderButton from '../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Card from "../components/UI/Card";
import Colors from "../constants/Colors";

const TableScreen = props => {

    // const tableHead = ['Head', 'Head2', 'Head3', 'Head4'];
    // const tableData = [
    //     ['1', '2', '3', '4'],
    //     ['a', 'b', 'c', 'd'],
    //     ['1', '2', '3', '456\n789'],
    //     ['a', 'b', 'c', 'd']
    // ]

    // const tableHead2 = ['', 'Head1', 'Head2', 'Head3'];
    // const tableTitle2 = ['Title', 'Title2', 'Title3', 'Title4'];
    // const tableData2 = [
    //     ['1', '2', '3'],
    //     ['a', 'b', 'c'],
    //     ['1', '2', '3'],
    //     ['a', 'b', 'c']
    // ];
    
    const tableHead3 = ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'];
    const widthArr3 = [120, 120, 120, 120, 120, 120, 120, 120, 120];

    const tableData3 = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData3 = [];
      for (let j = 0; j < 9; j += 1) {
        rowData3.push(`${i}${j}`);
      }
      tableData3.push(rowData3);
    }
    return (
        <ScrollView >
            <View style={styles.screen}>
                {/* <Card style={styles.card}>
                    <View style={styles.container}>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                        <Rows data={tableData} textStyle={styles.text}/>
                        </Table>
                    </View>
                </Card>

                <Card style={styles.card}>
                    <View style={styles.container2}>
                    <Table borderStyle={{borderWidth: 1}}>
                    <Row data={tableHead2} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
                    <TableWrapper style={styles.wrapper}>
                        <Col data={tableTitle2} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                        <Rows data={tableData2} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
                    </TableWrapper>
                    </Table>
                    </View>
                </Card> */}

                <Card style={styles.card}>
                    <View style={styles.container}>
                        <ScrollView>
                            <ScrollView horizontal={true}>
                                <View>
                                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                    <Row data={tableHead3} widthArr={widthArr3} style={styles.header} textStyle={styles.text}/>
                                    </Table>
                                    <ScrollView style={styles.dataWrapper}>
                                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                            {
                                            tableData3.map((rowData3, index) => (
                                                <Row
                                                key={index}
                                                data={rowData3}
                                                widthArr={widthArr3}
                                                style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                                                textStyle={styles.text}
                                                />
                                            ))
                                            }
                                        </Table>
                                    </ScrollView>
                                </View>
                            </ScrollView>
                        </ScrollView>
                    </View>
                </Card>
            </View>
        </ScrollView>
    );
}

TableScreen.navigationOptions =  navData => {
    return {
        headerTitle: 'User Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title='Menu' 
                    iconName='ios-menu'
                    onPress={() => {navData.navigation.toggleDrawer();}}
                />
            </HeaderButtons>
        )
    }
}
const tableHeight = Dimensions.get('window').height * 0.8;

const styles = StyleSheet.create({
    
    // container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    // container2: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff',marginTop:50 },
    // head: { height: 40, backgroundColor: '#f1f8ff' },
    // text: { margin: 6 },
    
    screen: { flex:1, justifyContent:'center', alignItems:'center'},
    card: { width:'95%', height:tableHeight, marginTop:20, overflow:'hidden'},
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: Colors.primary },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' }
});

export default TableScreen;