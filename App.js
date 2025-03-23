import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Màn hình thanh toán
const CheckoutScreen = ({ navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('5261 4141 0151 8472');
  const [cardholderName, setCardholderName] = useState('Christine Doe');
  const [expiryDate, setExpiryDate] = useState('06 / 2024');
  const [cvv, setCvv] = useState('915');

  const formatCardNumber = (text) => {
    // Remove any spaces from the text
    const cleaned = text.replace(/\s+/g, '');
    // Add a space after every 4 characters
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted;
  };

  const handleCardNumberChange = (text) => {
    const formatted = formatCardNumber(text);
    setCardNumber(formatted);
  };

  const handlePayment = () => {
    navigation.navigate('PaymentSuccess');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#00BE7E" />
        </TouchableOpacity>
      </View>

      {/* Checkout Title and Amount */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Checkout <MaterialIcon name="credit-card" size={24} color="#000" /></Text>
        <Text style={styles.amount}>₹ 1,527</Text>
        <Text style={styles.taxInfo}>Including GST (18%)</Text>
      </View>

      {/* Payment Method Options */}
      <View style={styles.paymentOptions}>
        <TouchableOpacity 
          style={[
            styles.paymentOptionButton, 
            paymentMethod === 'creditCard' && styles.activePaymentOption
          ]}
          onPress={() => setPaymentMethod('creditCard')}
        >
          <Icon name="card" size={20} color={paymentMethod === 'creditCard' ? '#fff' : '#333'} />
          <Text style={[styles.paymentOptionText, paymentMethod === 'creditCard' && styles.activePaymentOptionText]}>Credit card</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.paymentOptionButton, 
            paymentMethod === 'applePay' && styles.activePaymentOption
          ]}
          onPress={() => setPaymentMethod('applePay')}
        >
          <Icon name="logo-apple" size={20} color={paymentMethod === 'applePay' ? '#fff' : '#333'} />
          <Text style={[styles.paymentOptionText, paymentMethod === 'applePay' && styles.activePaymentOptionText]}>Apple Pay</Text>
        </TouchableOpacity>
      </View>

      {/* Card Form */}
      <View style={styles.cardForm}>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Card number</Text>
          <View style={styles.cardNumberContainer}>
            <TextInput
              style={styles.cardNumberInput}
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              keyboardType="numeric"
              maxLength={19}
            />
            <View style={styles.cardIconsContainer}>
              {/* Thay bằng biểu tượng hình ảnh hoặc icon khác vì không có thư mục assets */}
              <Icon name="card" size={24} color="#FF5F00" style={styles.cardIcon} />
              <Icon name="card-outline" size={24} color="#1A1F71" style={styles.cardIcon} />
            </View>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Cardholder name</Text>
          <TextInput
            style={styles.input}
            value={cardholderName}
            onChangeText={setCardholderName}
          />
        </View>

        <View style={styles.formRow}>
          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.formLabel}>Expiry date</Text>
            <TextInput
              style={styles.input}
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholder="MM / YYYY"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.formGroup, styles.halfWidth]}>
            <View style={styles.cvvLabelContainer}>
              <Text style={styles.formLabel}>CVV / CVC</Text>
              <TouchableOpacity>
                <Icon name="help-circle-outline" size={18} color="#00BE7E" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
            />
          </View>
        </View>
      </View>

      <Text style={styles.noticeText}>
        We will send you an order details to your email after the successful payment
      </Text>

      {/* Pay Button */}
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Icon name="lock-closed" size={18} color="#fff" />
        <Text style={styles.payButtonText}>Pay for the order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Màn hình thành công thanh toán
const PaymentSuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#5C5CE0" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.successContent}>
        {/* Payment Terminal Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.circleBackground}>
            {/* Thiết bị thanh toán và biểu tượng thành công */}
            <View style={styles.paymentTerminal}>
              {/* Màn hình thiết bị */}
              <View style={styles.terminalScreen}>
                <Text style={styles.terminalSmile}>:)</Text>
              </View>
              
              {/* Bàn phím */}
              <View style={styles.keypad}>
                {[...Array(12)].map((_, index) => (
                  <View key={index} style={styles.keypadButton} />
                ))}
              </View>
              
              {/* Khe thẻ */}
              <View style={styles.cardSlot} />
            </View>
            
            {/* Biểu tượng tích xanh */}
            <View style={styles.checkmarkCircle}>
              <Icon name="checkmark" size={20} color="white" />
            </View>
          </View>
        </View>
        
        {/* Nội dung thông báo thành công */}
        <Text style={styles.successTitle}>Payment Success, Yayy!</Text>
        <Text style={styles.successMessage}>
          We will send order details and invoice in your contact no. and registered email
        </Text>
        
        {/* Buttons */}
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Check Details</Text>
          <Icon name="arrow-forward" size={16} color="#5C5CE0" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Download Invoice</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Stack = createStackNavigator();

// Component chính của ứng dụng
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Checkout">
          <Stack.Screen 
            name="Checkout" 
            component={CheckoutScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="PaymentSuccess" 
            component={PaymentSuccessScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Các styles cho cả hai màn hình
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00BE7E',
    marginBottom: 4,
  },
  taxInfo: {
    fontSize: 14,
    color: '#888',
  },
  paymentOptions: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  paymentOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 12,
  },
  activePaymentOption: {
    backgroundColor: '#00BE7E',
  },
  paymentOptionText: {
    marginLeft: 8,
    fontWeight: '500',
    color: '#333',
  },
  activePaymentOptionText: {
    color: '#fff',
  },
  cardForm: {
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  cardNumberInput: {
    flex: 1,
    height: 50,
  },
  cardIconsContainer: {
    flexDirection: 'row',
  },
  cardIcon: {
    marginLeft: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  cvvLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noticeText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
    textAlign: 'center',
  },
  payButton: {
    backgroundColor: '#00BE7E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  
  // Styles cho màn hình thành công
  successContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  illustrationContainer: {
    marginVertical: 40,
    alignItems: 'center',
  },
  circleBackground: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#EFF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  paymentTerminal: {
    width: 100,
    height: 150,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 10,
    overflow: 'visible',
  },
  terminalScreen: {
    width: 70,
    height: 40,
    backgroundColor: '#A0E7A0', // Màu xanh lá nhạt
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  terminalSmile: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  keypad: {
    width: 70,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  keypadButton: {
    width: 20,
    height: 15,
    backgroundColor: '#D6E4FF',
    borderRadius: 3,
    margin: 2,
  },
  cardSlot: {
    width: 40,
    height: 6,
    backgroundColor: '#D6E4FF',
    marginTop: 15,
    borderRadius: 3,
  },
  checkmarkCircle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#52C41A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  detailsButtonText: {
    color: '#5C5CE0',
    fontWeight: '500',
    marginRight: 6,
  },
  downloadButton: {
    backgroundColor: '#5C5CE0',
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  downloadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});