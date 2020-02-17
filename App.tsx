import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import NfcManager, {Ndef, NfcTech, NfcEvents} from 'react-native-nfc-manager';
import ActionButton from 'react-native-action-button';
import {Modalize} from 'react-native-modalize';
import {NAnimation, NButton, NItem, NToggle} from './src/components/atoms';
import {Animations, Colors, Typography} from './src/ressources';
import {decodeNdef} from './src/business';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const App = () => {
  const [isReading, setIsReading] = useState(false);
  const [payload, setPayload] = useState('Payload');
  const modalRef = useRef(null);

  useEffect(() => {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      setPayload(decodeNdef(tag));
      setIsReading(false);
      onOpen();
      NfcManager.setAlertMessageIOS('I got your tag!');
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent().catch(() => 0);
    };
  }, []);

  function buildUrlPayload(valueToWrite) {
    return Ndef.encodeMessage([Ndef.uriRecord(valueToWrite)]);
  }

  const onOpen = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.open();
    }
  };

  const _cancel = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
    setIsReading(false);
  };

  const read = async () => {
    try {
      await NfcManager.registerTagEvent();
      setIsReading(true);
    } catch (ex) {
      NfcManager.unregisterTagEvent().catch(() => 0);
      setIsReading(false);
    }
  };

  const _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  };

  const _write = async () => {
    try {
      let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to write some NFC tags!',
      });
      console.warn(resp);
      let ndef = await NfcManager.getNdefMessage();
      console.warn(ndef);
      let bytes = buildUrlPayload('https://www.nabylbennouri.com');
      await NfcManager.writeNdefMessage(bytes);
      console.warn('successfully write ndef');
      await NfcManager.setAlertMessageIOS('I got your tag!');
      _cleanUp();
    } catch (ex) {
      console.warn('ex', ex);
      _cleanUp();
    }
  };

  const onAnimationFinish = () => {
    const r = 3;
  };

  const toggle = toggle => {
    toggle ? read() : _cancel();
  };
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'space-between',
          margin: 20,
        }}>
        <Text
          style={{
            ...Typography.headline2,
            color: Colors.primary,
          }}>
          Scan NFC Tag
        </Text>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <NAnimation
            width={SCREEN_WIDTH - 20}
            height={SCREEN_WIDTH - 20}
            loop={true}
            autoPlay={true}
            source={Animations.scan}
            onAnimationFinish={onAnimationFinish}
          />
          <NToggle onPress={toggle} initialState={isReading} />
        </View>
        <ActionButton buttonColor={Colors.secondary} onPress={_write} />
      </SafeAreaView>
      <Modalize
        ref={modalRef}
        handlePosition="inside"
        adjustToContentHeight
        flatListProps={{
          data: payload,
          renderItem: item => <NItem item={item} />,
          keyExtractor: item => item.key,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default App;
