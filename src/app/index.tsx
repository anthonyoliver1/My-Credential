import { useState } from "react";
import { Alert, Image, View } from "react-native";
import { Link, Redirect, router } from "expo-router";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "@/styles/colors";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { api } from "@/server/api";

import { useBadgeStore } from "@/store/badge-store";
import { useCredentialStore } from "@/store/credential-store";

export default function Home() {
    const [code, setCode] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const badgeStore = useBadgeStore();
    const credentialStore = useCredentialStore();

    async function handleAccessCredential() {

        try {
            if (!code.trim()) {
                return Alert.alert('Credencial', 'É necessário ter uma credencial!');
            }

            // const responseCredential = await api('GET', `attendees/${code}/badge`);

            // console.log(badgeStore.data)
            // console.log(credentialStore.data)
            // badgeStore.save(responseCredential.data.badge);

            if (!credentialStore.data) throw Error('Sem credencial')
            badgeStore.save(credentialStore.data!);

            setIsLoading(true);
        } catch (error: any) {
            console.error(error);

            Alert.alert(
                'Credencial',
                'Credencial não encontrada!'
            );
        } finally {
            setIsLoading(false);
        }
    }

    if (badgeStore.data?.checkInURL) {
        return <Redirect href="/ticket" />
    }

    return (
        <View className="flex-1 bg-green-500 items-center justify-center p-8">

            <Image
                className="h-16"
                source={require("@/assets/logo.png")}
                resizeMode="contain"
            />
            <View className="w-full mt-12 gap-3">
                <Input>
                    <MaterialCommunityIcons name="ticket-confirmation-outline" size={20} color={colors.green[200]} />
                    <Input.Field
                        autoFocus
                        placeholder="Código do ingresso"
                        placeholderTextColor={colors.gray[200]}
                        onChangeText={setCode}
                        keyboardType="number-pad"
                    />
                </Input>

                <Button
                    title="Acessar credencial"
                    onPress={handleAccessCredential}
                    isLoading={isLoading}
                />

                <Link
                    href="/register"
                    className="text-gray-100 text-base font-bold text-center mt-8"
                >
                    Ainda não possui ingresso?
                </Link>
            </View>
        </View>
    );
}