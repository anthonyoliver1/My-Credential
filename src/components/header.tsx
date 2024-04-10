import { Text, View } from "react-native";

type THeader = {
    title: string;
}


export function Header({ title }: THeader) {
    return (
        <View className="w-full h-28 bg-black/20 flex-row items-end px-8 pb-4 border-b border-white/10">
            <Text className="flex-1 text-white font-medium text-lg text-center">{title}</Text>
        </View>
    );
}