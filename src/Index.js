/** @flow */
'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Modal,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import { Map } from 'immutable';
import List from './List';
import Detail from './Detail';
import Home from './Home';
import NavigationBar from 'react-native-navbar';
import qs from 'qs';
import Dimensions from 'Dimensions';

export const height = Dimensions.get('window').height;

/*
// This Index.js will set the project up and contain the state, the rest of the
// application will be stateless components. On a larger project there would be
// more Index stateful components for simplicity.
*/
export default class Index extends Component {
    // Set the types of each state object
    state: {
        data: Array<*>,
        dataSource: ListView.DataSource,
        fetched: bool,
        fetchMore: bool,
        page: number,
        rows: Array<*>,
        showModal: bool,
        showSquares: bool,
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1.id !== row2.id,
            }),
            fetched: false,
            showModal: false,
            data: [],
            fetchMore: false,
            page: 1,
            rows: [],
            showSquares: true,
        };
    }

    // Fetch deals on mount
    componentWillMount(): void {
        this.fetch();
    }

    getNextPage = (): void => {
        this.setState({ fetchMore: true });

        /*
        // Increment the current page number by one when the end of the page is
        // reached
        */
        this.fetch(this.state.page + 1, true);
    };

    // Allows the user to pick the view style
    renderListType = () => {
        if (this.state.showSquares) {
            return <Home
                dataSource={ this.state.dataSource }
                setStateObject={ this.setStateObject }
                onEndReached={ this.getNextPage }/>
        }

        return <List
            dataSource={ this.state.dataSource }
            setStateObject={ this.setStateObject }
            onEndReached={ this.getNextPage } />
    }

    render() {
        const showModal = this.state.showModal;

        // Show loader while fetching
        if (this.state.fetched === false) {
            return (
                <View>
                    <StatusBar
                        hidden={ true } />
                    <ActivityIndicator
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 8,
                            height,
                            alignSelf: 'center'
                        }}
                        size="large"
                    />
                </View>
            )
        }

        return (
            <View>
                <NavigationBar
                    statusBar={{ style: 'light-content' }}
                    tintColor="#C91821"
                    rightButton={{
                        title: this.state.showSquares ? 'List' : 'Explore',
                        handler: () => {
                            this.setState(
                                { showSquares: !this.state.showSquares }
                            )
                        },
                        tintColor: '#fff'
                    }}
                    title={{ tintColor: '#fff', title: 'Give Me Coupons!' }} />

                    { this.renderListType() }

                <Modal
                    animationType="slide"
                    transparent={ false }
                    visible={ showModal }>
                    <Detail
                        showModal={ showModal }
                        setStateObject={ this.setStateObject }
                        data={ this.state.data } />
                </Modal>

            </View>
        );
    }

    // Will allow for a state object to be set from within a stateless component
    setStateObject = (name: string, state: bool, data: Array<*>) => {
        this.setState({ [name]: state, data: data });
    }

    fetch = (page: number = 1) => {
        const query = Map({
            page: page,
        }).toJS();

        fetch('http://giveme.coupons/api/deals?' + qs.stringify(query), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            var rows = this.state.rows.concat(responseJson.data);

            this.setState({
                rows,
                dataSource: this.state.dataSource.cloneWithRows(
                    rows
                ),
                fetched: true,
                fetchMore: false,
                page: responseJson.current_page,
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }
}
