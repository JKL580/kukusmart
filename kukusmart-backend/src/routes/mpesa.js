import express from 'express';
import axios from 'axios';

const router = express.Router();

// Generate OAuth token
const generateToken = async () => {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64');
  
  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );
    
    return response.data.access_token;
  } catch (error) {
    throw new Error('Failed to generate token');
  }
};

// STK Push
router.post('/stkpush', async (req, res) => {
  try {
    const { phone, amount, orderNumber } = req.body;
    
    const token = await generateToken();
    
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString('base64');
    
    // Format phone number (remove + and ensure it starts with 254)
    let formattedPhone = phone.replace(/\+/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    }
    
    const stkPushData = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.ceil(amount),
      PartyA: formattedPhone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: orderNumber,
      TransactionDesc: `Payment for order ${orderNumber}`
    };
    
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      stkPushData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('MPesa error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Payment initiation failed',
      error: error.response?.data || error.message 
    });
  }
});

// MPesa callback
router.post('/callback', async (req, res) => {
  try {
    console.log('MPesa Callback:', JSON.stringify(req.body, null, 2));
    
    const { Body } = req.body;
    
    if (Body.stkCallback.ResultCode === 0) {
      // Payment successful
      const items = Body.stkCallback.CallbackMetadata.Item;
      const mpesaReceiptNumber = items.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
      const phoneNumber = items.find(item => item.Name === 'PhoneNumber')?.Value;
      
      // Update order status in database
      // You would implement this based on your Order model
      
      console.log('Payment successful:', mpesaReceiptNumber);
    } else {
      // Payment failed
      console.log('Payment failed:', Body.stkCallback.ResultDesc);
    }
    
    res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (error) {
    console.error('Callback error:', error);
    res.json({ ResultCode: 1, ResultDesc: 'Rejected' });
  }
});

export default router;