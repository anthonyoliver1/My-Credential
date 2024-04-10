import { useState } from "react";
import { Alert, Modal, ScrollView, Share, Text, TouchableOpacity, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { Credential } from "@/components/credential";
import { Header } from "@/components/header";
import { Button } from "@/components/button";
import { QRCode } from "@/components/qrcode";

import { colors } from "@/styles/colors";

import { useBadgeStore } from "@/store/badge-store";

import * as ImagePicker from "expo-image-picker";
import { Redirect, router } from "expo-router";
import { MotiView } from "moti";

export default function Ticket() {

    const [expandQRCode, setExpandQRCode] = useState<boolean>(false);

    const badgeStore = useBadgeStore();

    async function handleSelectImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4]
            });

            if (!result.assets) throw result;

            badgeStore.updateAvatar(result.assets[0].uri);
        } catch (error: any) {
            console.error(error);
            if (!error.canceled) {
                Alert.alert("Foto", "Não foi possível selecionar a imagem!");
            }
        }
    }

    async function handleShare() {
        try {
            if (badgeStore.data?.checkInURL) {
                await Share.share({
                    message: badgeStore.data.checkInURL,
                    url: badgeStore.data.checkInURL
                })
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Compartilhar", "Não foi possível compartilhar a sua credencial!")
        }
    }

    function removeCredential() {
        badgeStore.remove();
    }

    if (!badgeStore.data?.checkInURL) {
        return <Redirect href="/" />
    }

    return (
        <View className="flex-1 bg-green-500">
            <Header title="Minha credencial" />
            <ScrollView
                className="-mt-28 -z-10"
                contentContainerClassName="px-8 pb-8"
                showsVerticalScrollIndicator={false}
            >
                <Credential
                    data={badgeStore.data}
                    image={badgeStore.data.image}
                    onChangeAvatar={handleSelectImage}
                    onExpandQRCode={() => setExpandQRCode(!expandQRCode)}
                />

                <MotiView
                    from={{
                        translateY: 0
                    }}
                    animate={{
                        translateY: 5
                    }}
                    transition={{
                        loop: true,
                        type: "timing",
                        duration: 700
                    }}
                >
                    <FontAwesome
                        name="angle-double-down"
                        size={24}
                        color={colors.gray[300]}
                        className="self-center my-6"
                    />
                </MotiView>

                <Text
                    className="text-white font-bold text-2xl mt-4"
                >
                    Compartilhar credencial
                </Text>
                <Text
                    className="text-white font-regular text-base mt-1 mb-6"
                >
                    Mostre ao mundo que você vai participar do {badgeStore.data.eventTitle}!
                </Text>

                <Button title="Compartilhar" onPress={handleShare} />

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="mt-10"
                    onPress={removeCredential}
                >
                    <Text className="text-white text-base text-center font-bold">Remover ingresso</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal visible={expandQRCode} animationType="fade" statusBarTranslucent>
                <View className="flex-1 bg-green-500 items-center justify-center">
                    <QRCode
                        value={badgeStore.data.checkInURL}
                        size={300}
                    />

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setExpandQRCode(!expandQRCode)}
                        className="mt-10"
                    >
                        <Text className="font-body text-orange-500 text-sm">Fechar QR Code</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </View>
    );
}