import * as RNLocalize from "react-native-localize"
import i18n from "i18n-js"

const en = require("./en")
const zhHantHK = require("./zh-Hant-HK")

i18n.fallbacks = true
i18n.translations = {
  en,
  'zh-Hant-HK': zhHantHK,
  'zh-Hant-TW': zhHantHK,
  'zh-Hant-CN': zhHantHK,
}

const fallback = { languageTag: "en", isRTL: false }
const { languageTag } =
  RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback
i18n.locale = languageTag
i18n.missingTranslationPrefix = "Missing Translation: "
i18n.missingBehaviour = "guess"
