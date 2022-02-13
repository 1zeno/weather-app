import React from "react";
import { Modal, IconButton, Input, FlatList, Text, Box } from "native-base";
import SerachIcon from "../../assets/search.svg";
import opencage from "opencage-api-client";
import axios from "axios";
import { CityCard } from "..";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SearchModal: React.FC<IProps> = (props) => {
    const { isOpen, onClose } = props;
    const [ data, setData ] = React.useState();

    const onSearch = async() => {
        const result = await opencage.geocode({ q: 'lauro de freitas', key: "56badb63c1b54d4cae2a842c543e43fb" });
        console.log(result.results[0].geometry);
        console.log(result.results[0].components);
        setData(result)
        // const uhul = await axios("api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=5e19913b2aeff87f49437468cf00fd06")
        // console.log(uhul)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton onPress={onClose} />
                <Modal.Header>Pesquisar</Modal.Header>
                <Modal.Body>
                    <Input InputRightElement={<IconButton background="#3AA7F4" icon={<SerachIcon />} onPress={onSearch} />} />
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
};