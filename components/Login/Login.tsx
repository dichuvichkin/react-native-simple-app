import React, { memo, useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Text, Divider, Snackbar } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import CheckMark from '../../assets/check_mark.svg';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    paddingTop: 20,
    height: '100%',
  },
  phoneInputWrapper: {
    position: 'relative',
  },
  input: {
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  checkMarkIcon: {
    position: 'absolute',
    right: 15,
    top: 28,
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: 20,
    color: '#01BFAC',
  },
  divider: {
    marginVertical: 30,
  },
  buttonLabelStyle: {
    color: '#fff',
    textTransform: 'none',
  },
  buttonContentStyle: {
    height: 55,
  },
  buttonStyle: {
    marginTop: 30,
  },
  snackbarWrapper: {
    position: 'absolute',
    bottom: 0,
  },
  noAccount: { textAlign: 'center' },
  registerLink: { textAlign: 'center', color: '#01BFAC' },
});

const customTextInputProps = {
  label: 'Телефон*',
  mode: 'outlined',
};

const options = {
  mask: '+7 (999) 999-99-99',
};

function toRawValue(phone: string) {
  return phone.replace(/[+ ()-]/gi, '');
}

function Login() {
  const [status, setStatus] = useState<string>();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const isCorrect = useMemo(() => toRawValue(phone).length === 11, [phone]);

  const onChangePhone = useCallback((value: string) => {
    setPhone(value);
  }, []);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const login = useCallback(() => {
    if (isCorrect && password === '123') {
      setStatus('Success');
    } else {
      setStatus('Error');
    }
  }, [isCorrect, password]);

  const onDismiss = useCallback(() => {
    setStatus(undefined);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.phoneInputWrapper}>
        <TextInputMask
          type="custom"
          value={phone}
          keyboardType="phone-pad"
          includeRawValueInChangeText
          onChangeText={onChangePhone}
          customTextInput={TextInput}
          customTextInputProps={customTextInputProps}
          options={options}
        />
        {isCorrect && (
          <View style={styles.checkMarkIcon}>
            <CheckMark />
          </View>
        )}
      </View>
      <TextInput
        style={{ marginTop: 10 }}
        label="Пароль*"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={onChangePassword}
      />
      <Button
        labelStyle={styles.buttonLabelStyle}
        style={styles.buttonStyle}
        contentStyle={styles.buttonContentStyle}
        mode="contained"
        onPress={login}
      >
        Войти
      </Button>

      <Text style={styles.forgotPassword}>
        Забыл пароль или поменял телефон!
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.noAccount}>Еще нет аккаунта?</Text>
      <Text style={styles.registerLink}>Зарегистрируйтесь</Text>
      <Snackbar
        visible={Boolean(status)}
        onDismiss={onDismiss}
        duration={Snackbar.DURATION_SHORT}
        wrapperStyle={styles.snackbarWrapper}
        style={{
          backgroundColor: status === 'Success' ? '#01bfac' : '#01bfac',
        }}
      >
        {status}
      </Snackbar>
    </View>
  );
}

export default memo(Login);
