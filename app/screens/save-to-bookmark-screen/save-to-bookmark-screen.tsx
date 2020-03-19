import * as React from "react"
import { View } from "react-native"
import ShareExtension from "react-native-share-extension"

import { SaveToBookmarkScreenStyle as Style } from "./save-to-bookmark-screen.style"

import { Button } from "../../components/button"
import { Text } from "../../components/text"

import { LikerLandAPI } from "../../services/api"
import { color } from "../../theme"
import { Icon } from "../../components/icon"
import { Screen } from "../../components/screen"
import { LoadingScreen } from "../../components/loading-screen"

export class SaveToBookmarkScreen extends React.Component {
  likerLandAPI = new LikerLandAPI()

  state = {
    url: "",
    error: undefined,
    isLoading: true,
  }

  async componentDidMount() {
    // FIXME: Hard-coded endpoint
    this.likerLandAPI.setup("https://liker.land/api")

    try {
      const { value: url } = await ShareExtension.data()
      if (!/^https?:\/\//.test(url)) {
        this.setState({ error: "invalid-url" })
        return
      }
      this.setState({ url })
      const response = await this.likerLandAPI.addBookmark(url)
      switch (response.kind) {
        case "ok":
          break

        default:
          this.setState({ error: response.kind })
      }
    } catch (error) {
      console.log(error)
      this.setState({ error: "unknown" })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  onClose = () => ShareExtension.close()

  render() {
    if (this.state.isLoading) {
      return (
        <LoadingScreen style={Style.Root} />
      )
    }

    return (
      <Screen
        preset="fixed"
        style={Style.Root}
      >
        <View style={Style.HandleWrapper}>
          <View style={Style.Handle} />
        </View>
        <View style={Style.Inner}>
          <Icon
            name="bookmark-outlined"
            fill={color.palette.lightCyan}
            width={64}
            height={64}
          />
          {this.state.error ? (
            <Text
              tx={`SaveToBookmarkScreen.Error.${this.state.error}`}
              size="medium"
              weight="600"
              color="angry"
            />
          ) : (
            <Text
              text="Saved to Liker Land!"
              size="medium"
              weight="600"
              color="likeCyan"
            />
          )}
          <Text
            text={this.state.url}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={Style.LabelURL}
          />
        </View>
        <Button
          preset="outlined"
          tx="SaveToBookmarkScreen.DismissButtonText"
          onPress={this.onClose}
        />
      </Screen>
    )
  }
}