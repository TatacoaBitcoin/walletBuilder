import Clipboard from '@react-native-clipboard/clipboard';

export const copyToClipboard = (content: string) => {
  if (!content) {
    return;
  }
  Clipboard.setString(content);
};

export const getFromClipboard = async () => {
  try {
    const content = await Clipboard.getString();
    return content;
  } catch (err) {
    console.log('error reading clipboard', err);
  }
};
