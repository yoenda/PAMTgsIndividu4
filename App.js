import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import Config from './src/Config';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            note: ''
        }

    }

    async componentDidMount() {

        const notes = await AsyncStorage.getItem('notes');
        if (notes && notes.length > 0) {
            this.setState({
                notes: JSON.parse(notes)
            })
        }

    }

    updateAsyncStorage(notes) {

        return new Promise( async(resolve, reject) => {

            try {

                await AsyncStorage.removeItem('notes');
                await AsyncStorage.setItem('notes', JSON.stringify(notes));
                return resolve(true);

            } catch(e) {
                return reject(e);
            }

        });

    }

    cloneNotes() {
        return [...this.state.notes];
    }

    async addNote() {

        if (this.state.note.length <= 0)
            return;

        try {

            const notes = this.cloneNotes();
            notes.push(this.state.note);

            await this.updateAsyncStorage(notes);

            this.setState({
                notes: notes,
                note: ''
            });

        }

        catch(e) {

            alert(e);

        }

    }

    async removeNote(i) {

        try {

            const notes = this.cloneNotes();
            notes.splice(i, 1);

            await this.updateAsyncStorage(notes);
            this.setState({ notes: notes });

        }

        catch(e) {

            alert(e);

        }

    }

    renderNotes() {

        return this.state.notes.map((note, i) => {
            return (
                <TouchableOpacity 
                    key={i} style={styles.note} 
                    onPress={ () => this.removeNote(i) }
                >
                    <Text style={styles.noteText}>{note}</Text>
                </TouchableOpacity>
            );
        });

    }

    render() {

        return (
            <View style={styles.container}>

                <Header title={Config.title} />

                <ScrollView style={styles.scrollView}>
                    {this.renderNotes()}
                </ScrollView>

                <Footer
                    onChangeText={ (note) => this.setState({note})  }
                    inputValue={this.state.note}
                    onNoteAdd={ () => this.addNote() }
                />

            </View>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    scrollView: {
        maxHeight: '82%',
        marginBottom: 100,
        backgroundColor: '#fff'
    },
    note: {
        margin: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderRadius: 10,
    },
    noteText: {
        fontSize: 14,
        padding: 20,
    }
});