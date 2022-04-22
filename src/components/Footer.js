import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';

export default class Footer extends React.Component {

    render() {

        return (
            <KeyboardAvoidingView 
                style={styles.footer}
                behavior="position" 
                enabled={true}
            >

                <View style={styles.footerInner}>

                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={ () => this.props.onNoteAdd() }
                    >
                        <Text style={styles.btnText}>+</Text>
                    </TouchableOpacity>

                    <TextInput 
                        style={styles.textInput}
                        placeholder={'Catat Disini'}
                        placeholderTextColor={'rgba(255, 255, 255, .7)'}
                        onChangeText={ (val) => this.props.onChangeText(val) }
                        value={this.props.inputValue}
                    />

                </View>

            </KeyboardAvoidingView>
        );

    }

}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        width: '100%',
        height: 80,
        bottom: 0,
    },
    footerInner: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    btn: {
        zIndex: 1,
        position: 'absolute',
        right: 20,
        top: -50,
        width: 80,
        height: 80,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#c890de'
    },
    btnText: {
        color: '#fff',
        fontSize: 30,
    },
    textInput: {
        zIndex: 0,
        flex: 1,
        padding: 20,
        fontSize: 16,
        color: '#fff',
        backgroundColor: '#692d80'
    }
});