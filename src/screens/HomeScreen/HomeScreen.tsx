import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../const/colors';
import {useTranslation} from 'react-i18next';
import NewDonationModal from '../../components/Modal/NewDonationModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteDonation,
  getDonations,
} from '../../store/actions/donationActions';
import Swipeout from 'react-native-swipeout';
import Cross from '../../components/Icons/Cross';
import Pen from '../../components/Icons/Pen';
import EditModal from '../../components/Modal/EditModal';

const HomeScreen = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editedDonationId, setEditedDonationId] = useState<string | undefined>(
    undefined,
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {donations} = useSelector((state: any) => state.donation);
  const donationNumber = donations.length * 450;

  useEffect(() => {
    dispatch(getDonations(() => setLoading(false)));
  }, [dispatch]);

  const deleteDonationHandler = (id: string) => {
    dispatch(deleteDonation(id));
  };

  const openEditModal = () => {
    setIsEdit(true);
    setModalVisible(true);
  };

  const createTwoButtonAlert = (id: string) =>
    Alert.alert(t('homeScreen.delete'), t('homeScreen.confirmation'), [
      {
        text: t('homeScreen.yes'),
        onPress: () => deleteDonationHandler(id),
        style: 'default',
      },
      {
        text: t('homeScreen.cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'destructive',
      },
    ]);

  const getSwipeoutBtns = (id: string) => {
    return [
      {
        component: (
          <View style={styles.swipeoutButton}>
            <Cross />
          </View>
        ),
        backgroundColor: colors.white,
        onPress: () => createTwoButtonAlert(id),
      },
      {
        component: (
          <View style={styles.swipeoutButton}>
            <Pen />
          </View>
        ),
        backgroundColor: colors.white,
        onPress: () => {
          setEditedDonationId(id);
          openEditModal();
        },
      },
    ];
  };

  const renderItem = ({item}: any) => (
    <Swipeout
      right={getSwipeoutBtns(item.id)}
      style={styles.swipeout}
      autoClose={true}>
      <View style={styles.newDonationContainer}>
        <Text style={styles.topic}>{item.date}</Text>
        <Text style={styles.topic}>{t('homeScreen.blood')} 450 ml</Text>
      </View>
    </Swipeout>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/images/BloodDonation.png')}
        style={styles.logo}
      />
      <View style={styles.donationContainer}>
        <Text style={styles.donationValue}>{donationNumber} ml</Text>
        <View style={styles.buttonContainer}>
          <NewDonationModal />
        </View>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.header}>{t('homeScreen.header')}</Text>
        <Text style={styles.days}>21 {t('homeScreen.days')}</Text>
        <Text style={styles.date}>23-02-2021</Text>
      </View>
      <View style={styles.visitsContainer}>
        <Text style={styles.visits}>{t('homeScreen.yourDonations')}</Text>
      </View>
      <View style={styles.donationsContainer}>
        {donations.length > 0 ? (
          <FlatList
            keyExtractor={item => item.id}
            data={donations}
            renderItem={renderItem}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              {t('homeScreen.placeholder')}
            </Text>
            <Image
              style={styles.logo2}
              source={require('../../../assets/images/heart.png')}
            />
          </View>
        )}
        <EditModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setIsEdit(false);
          }}
          onConfirm={() => {
            setModalVisible(!modalVisible);
            setIsEdit(false);
          }}
          donation={donations}
          isEdit={isEdit}
          editedDonationId={editedDonationId}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    top: 10,
    height: 100,
    width: 100,
    zIndex: 10,
    marginTop: 30,
  },
  logo2: {
    height: 100,
    width: 100,
  },
  header: {
    fontFamily: 'BreeSerif-Regular',
    color: colors.danger,
    fontSize: 30,
  },
  visits: {
    fontFamily: 'BreeSerif-Regular',
    color: colors.white,
    fontSize: 24,
  },
  date: {
    fontFamily: 'ConcertOne-Regular',
    color: colors.danger,
  },
  days: {
    fontFamily: 'ConcertOne-Regular',
    color: colors.danger,
    fontSize: 30,
    marginTop: 10,
  },
  donationContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.danger,
    width: '100%',
    height: 150,
    marginTop: 50,
  },
  visitsContainer: {
    flex: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.danger,
    width: '100%',
    height: 70,
    marginTop: 30,
  },
  donationValue: {
    color: colors.white,
    fontSize: 35,
    fontFamily: 'BreeSerif-Regular',
  },
  dateContainer: {
    flex: 0,
    alignItems: 'center',
    marginTop: 50,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  placeholderText: {
    color: colors.danger,
    fontSize: 35,
    textAlign: 'center',
    fontFamily: 'BreeSerif-Regular',
  },
  swipeout: {
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  donationsContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 30,
    backgroundColor: colors.white,
  },
  newDonationContainer: {
    flex: 0,
    borderColor: colors.danger,
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 30,
    justifyContent: 'space-between',
    marginHorizontal: 25,
    padding: 10,
    marginBottom: 15,
    //shadow
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.52,
    shadowRadius: 2.52,

    elevation: 4,
  },
  swipeoutButton: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  topic: {
    color: colors.danger,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'BreeSerif-Regular',
  },
});
