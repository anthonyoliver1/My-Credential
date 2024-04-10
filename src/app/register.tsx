import { Alert, Image, StatusBar, View } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/styles/colors";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { api } from "@/server/api";

import { Link, router } from "expo-router";
import { useState } from "react";
import { TBadgeStore, useBadgeStore } from "@/store/badge-store";
import { useCredentialStore } from "@/store/credential-store";

const EVENT_ID = '9e9bd979-9d10-4915-b339-3786b1634f33';

export default function Register() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const badgeStore = useBadgeStore();
    const credentialStore = useCredentialStore();


    async function handleRegisterCredential(): Promise<void> {
        try {
            if (!name.trim() || !email.trim()) {
                return Alert.alert('Inscrição', 'Preencha os campos para realizar a inscrição!')
            }

            setIsLoading(true);

            // const responseRegister = await api('POST', `events/${EVENT_ID}/attendees`,
            //     {
            //         name: name.trim(),
            //         email: email.trim().toLowerCase()
            //     },

            // );

            // if (!responseRegister.data?.attendeeId) {
            //     throw responseRegister
            // };

            // const responseCredential = await api('GET', `attendees/${responseRegister.data?.attendeeId}/badge`);

            const credencial: TBadgeStore = {
                checkInURL: 'https://github.com/anthonyoliver1',
                email: email.trim().toLowerCase(),
                eventTitle: 'Unite Summit',
                name: name.trim(),
                id: Math.random().toFixed(3).replace('.','')
            }


            // badgeStore.save(responseCredential.data.badge);
            badgeStore.save(credencial);
            credentialStore.save(credencial);

            Alert.alert("Inscrição", "Inscrição realizada com sucesso!", [
                {
                    text: 'Ok',
                    onPress: () => router.push('/ticket')
                }
            ])

        } catch (error: any) {
            if (String(error.message).includes('already registered')) {
                return Alert.alert("Inscrição", "Credencial já cadastrada!")
            }

            Alert.alert("Inscrição", "Não foi possível fazer a sua inscrição!")
        } finally {
            setIsLoading(false);
        }
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
                    <FontAwesome6
                        name="user-circle"
                        size={20}
                        color={colors.green[200]}
                    />
                    <Input.Field
                        autoFocus
                        placeholder="Nome completo"
                        placeholderTextColor={colors.gray[200]}
                        onChangeText={setName}
                    />
                </Input>
                <Input>
                    <MaterialIcons
                        name="alternate-email"
                        size={20}
                        color={colors.green[200]}
                    />
                    <Input.Field
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor={colors.gray[200]}
                        onChangeText={setEmail}
                    />
                </Input>
                <Button
                    title="Realizar inscrição"
                    onPress={handleRegisterCredential}
                    isLoading={isLoading}
                />
            </View>

            <Link
                href="/"
                className="text-gray-100 text-base font-bold text-center mt-8"
            >
                Já possui ingresso?
            </Link>
        </View>
    );
}