import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { spotify_accounts } from '../../../axios';
import * as actions from '../../../store/actions';
import { updateObject, checkValidity, mapControlsToFormElements } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input';
import './SongPane.scss';

const SongPane = (props: any) => {

    const [songInfo, setSongInfo] = useState<string>("");
    const [songDate, setSongDate] = useState<Date>(new Date());
    const [controls, setControls] = useState<string | any>({
        songSearch: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Search song'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        songDate: {
            elementType: 'input',
            elementConfig: {
                type: 'date',
                placeholder: 'Date'
            },
            value: '',
        }
    });
    
    const formElementsArray = mapControlsToFormElements(controls);

    const inputChangedHandler = (value: any, id: string) => {
        const updatedControls = updateObject(controls, {
            [id]: updateObject(controls[id], {
                value: value,
                valid: checkValidity(value, controls[id].validation),
                touched: true
            })
        });
        setControls(updatedControls);
    }

    const inputs = formElementsArray.map(formElement => (
        <Input 
            label={formElement.config.elementConfig.placeholder}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event: any) => {setSongInfo(event.target.value); inputChangedHandler(event.target.value, formElement.id)}}
        />
    ));

    const onSearch = () => {
        
    };

    const onSave = () => {

    };

    const onAuthorize = () => {
        console.log(process.env)
        const redirectUri = process.env.REACT_APP_REDIRECT_URI;
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        spotify_accounts.get('authorize?client_id='+clientId
        +"&response_type=code&redirect_uri="+redirectUri)
        .then(res => {
            console.log("succ");
            
            console.log(res);            
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="song-pane">
            <h1>Song Pane</h1>
            {inputs}
            <button className="button" onClick={onAuthorize}>Get token</button>
            <button className="button" onClick={onSearch}>Search</button>
            {/* {searchResult with spinning loader, five best results, pick one} */}
            <button className="save button" onClick={onSave}>Save</button>
        </div>
    )
};

// const mapStateToProps = (state: any) => {
//     return {

//     }
// }

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//         onSearchSong: () => dispatch(actions.()),
//         onSaveSong: () => dispatch(actions.())
//     }
// }

export default SongPane;