import { colors } from "@/styles/colors";

type TQRCode = {
    value: string;
    size: number
}

import QRCodeSvg from "react-native-qrcode-svg"

export function QRCode({ size, value }: TQRCode) {
    return <QRCodeSvg
        backgroundColor="transparent"
        color={colors.white}
        size={size}
        value={value}
    />
}