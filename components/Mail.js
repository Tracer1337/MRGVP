import qs from 'qs'
import { Linking } from 'react-native'

export default async function sendEmail(subject, body) {
  let url = "mailto:mrg.vertretungsplan.app@gmail.com";
  const query = qs.stringify({
      subject: subject,
      body: body
  });
  if (query.length) url += `?${query}`
  const canOpen = await Linking.canOpenURL(url)
  if (!canOpen) console.log("Provided URL can not be handled")
  return Linking.openURL(url);
}
