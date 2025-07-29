import { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import React, { FC, useRef, useState } from "react"
import { View, ActivityIndicator, ViewStyle } from "react-native"
import { WebView } from "react-native-webview"
import { Screen } from "../../components/Screen"
interface WebViewEtechScreenProps extends AppStackScreenProps<"WebViewEtech"> {}
export const WebViewEtechScreen: FC<WebViewEtechScreenProps> = () => {
  const webViewRef = useRef<WebView>(null)
  const [loading, setLoading] = useState(true)
  const {
    themed,
    theme: { colors },
  } = useAppTheme()
  return (
    <Screen preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <View style={themed($container)}>
        {loading && (
          <View style={themed($loading)}>
            <ActivityIndicator size="large" color="#007aff" />
          </View>
        )}
        <WebView
          ref={webViewRef}
          source={{ uri: "http://etechpro.com.vn" }}
          startInLoadingState={true}
          cacheEnabled={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          onLoadEnd={(event) => {
            setLoading(false)
            console.log("WebView loaded:", event.nativeEvent.url)
          }}
          style={themed({ flex: 1 })}
          onError={(error) => {
            console.error("WebView error:", error)
          }}
        />
      </View>
    </Screen>
  )
}
const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  width: "100%",
  height: "100%",
})

const $loading: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: colors.background,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
})
