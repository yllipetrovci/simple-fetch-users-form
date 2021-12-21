import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Modal, useColorScheme } from 'react-native';
import { BlurView } from '@react-native-community/blur';
/**
 * Constants
 */
import { FETCH_STATUSES } from './constants/statuses';
/**
 * Components
 */
import Header from './componnets/header';
import Users from './componnets/users';
import Profile from './componnets/profile';
/**
 * Service
 */
import _userService from './service/user-service';
import { COLORS } from './constants/colors';
// import { infoLogger, errorLogger, warningLogger } from './utilities/logger';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(FETCH_STATUSES.PENDING);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20 });

  useEffect(() => {
    fetchUsers();
  }, []);

  const onPressUser = (user) => {
    setCurrentUser(user);
    setIsOpenModal(true);
  }

  const onPressCloseModal = () => {
    setIsOpenModal(false);
  }

  const fetchUsers = async () => {
    try {
      const response = await _userService.getUsers(pagination);
      setCurrentStatus(FETCH_STATUSES.SUCCESS);
      setUsers(response?.results);
      setPagination({ page: (pagination.page + 1), pageSize: pagination.pageSize });

    } catch (error) {
      setCurrentStatus(FETCH_STATUSES.FAILED);
    };
  };

  const isDarkMode = useColorScheme() === 'dark';
  
  const onEndReached = () => {
    fetchUsers();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? COLORS.pure.BLACK : 'rgb(219,231,234)' }}>
      <Header isDarkMode={isDarkMode} title="Select User" />
      <Users isDarkMode={isDarkMode} status={currentStatus} users={users} onEndReached={onEndReached} onPressUser={onPressUser} />
      {isOpenModal && <BlurView
        style={styles.blurView}
        blurType={isDarkMode ? "light" : "dark"}
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />}
      <Modal visible={isOpenModal} transparent={true} animationType={'slide'} animated={true} onRequestClose={() => { this.setIsOpenModal(false); }}>
        <Profile isDarkMode={isDarkMode} onPressCloseModal={onPressCloseModal} user={currentUser} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
