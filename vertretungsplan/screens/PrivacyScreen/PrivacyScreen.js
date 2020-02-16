import React from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import Link from "../../components/Link/Link.js"

import { COLORS } from "../../config/constants.js"

export default class PrivacyScreen extends React.Component{
  render(){
    return(
      <ScrollView style={styles.container}>

        <Text style={styles.headline}>
          Einbindung von Diensten und Inhalten Dritter
        </Text>

        <Text style={styles.text}>
          Wir setzen innerhalb unseres Onlineangebotes auf Grundlage unserer berechtigten Interessen
          (d.h. Interesse an der Analyse, Optimierung und wirtschaftlichem Betrieb unseres Onlineangebotes
          im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) Inhalts- oder Serviceangebote von Drittanbietern ein,
          um deren Inhalte und Services, wie z.B. Videos oder Schriftarten einzubinden (nachfolgend einheitlich
          bezeichnet als “Inhalte”).
        </Text>

        <Text style={styles.text}>
          Dies setzt immer voraus, dass die Drittanbieter dieser Inhalte, die IP-Adresse der Nutzer wahrnehmen, da sie ohne die IP-Adresse die Inhalte nicht an deren Browser senden könnten. Die IP-Adresse ist damit für die Darstellung dieser Inhalte erforderlich. Wir bemühen uns nur solche Inhalte zu verwenden, deren jeweilige Anbieter die IP-Adresse lediglich zur Auslieferung der Inhalte verwenden. Drittanbieter können ferner so genannte Pixel-Tags (unsichtbare Grafiken, auch als "Web Beacons" bezeichnet) für statistische oder Marketingzwecke verwenden. Durch die "Pixel-Tags" können Informationen, wie der Besucherverkehr auf den Seiten dieser Website ausgewertet werden. Die pseudonymen Informationen können ferner in Cookies auf dem Gerät der Nutzer gespeichert werden und unter anderem technische Informationen zum Browser und Betriebssystem, verweisende Webseiten, Besuchszeit sowie weitere Angaben zur Nutzung unseres Onlineangebotes enthalten, als auch mit solchen Informationen aus anderen Quellen verbunden werden.
        </Text>

        <Link url="https://datenschutz-generator.de/">Erstellt mit Datenschutz-Generator.de von RA Dr. Thomas Schwenke</Link>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.BACKGROUND
  },

  headline: {
    fontSize: 24,
    fontWeight: "bold",
  },

  text: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
})
