import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';

const PaystackPayment = () => {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');

  const publicKey = 'pk_test_57203cdd69a2d02fe13d12cd6114454c22634947'; // Replace with your Paystack public key

  const handlePaymentSuccess = async (reference) => {
    console.log('Payment Successful! Reference:', reference);

    try {
      // Send the payment reference to your backend for verification
      const response = await fetch('http://localhost:3000/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference: reference.reference }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Payment verified successfully!');
      } else {
        alert('Payment verification failed: ' + result.message);
      }
    } catch (error) {
      alert('Error verifying payment. Please try again later.');
    }
  };

  const handlePaymentFailure = (error) => {
    alert('Payment Failed! Please try again.');
    console.error('Payment Error:', error);
  };

  const componentProps = {
    reference: `${new Date().getTime()}`, // Generate a unique reference for each payment
    email: email,
    amount: amount * 100, // Convert Naira to kobo
    publicKey: publicKey,
    onSuccess: handlePaymentSuccess,
    onClose: () => alert('Payment popup closed'),
    onFailure: handlePaymentFailure,
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pay with Paystack</h1>
      <form
        style={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (!amount || !email) {
            alert('Please fill in all fields.');
            return;
          }
        }}
      >
        <label style={styles.label}>
          Enter Amount (₦):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in Naira"
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Enter Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={styles.input}
          />
        </label>
        <div style={styles.buttonContainer}>
          <PaystackButton {...componentProps} className="paystack-button" style={styles.payButton}   />
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  payButton: {
    backgroundColor: 'blue',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default PaystackPayment;
