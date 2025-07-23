// custom_event_system.js
  const EventEmitter = require('events');

  class PaymentProcessor extends EventEmitter {
      processPayment(amount, userId) {
          console.log(`Processing payment for user ${userId} with amount ${amount}...`);
          // Giả lập quá trình xử lý thanh toán
          setTimeout(() => {
              const success = Math.random() > 0.3; // 70% thành công
              if (success) {
                  this.emit('paymentSuccess', userId, amount, Date.now());
              } else {
                  this.emit('paymentFailed', userId, amount, 'Insufficient funds');
              }
          }, 1500);
      }
  }

  const processor = new PaymentProcessor();

  // Module quản lý đơn hàng lắng nghe
  processor.on('paymentSuccess', (userId, amount, timestamp) => {
      console.log(`[Order Manager] User ${userId} payment of ${amount} successful at ${new Date(timestamp).toLocaleTimeString()}. Updating order status.`);
  });

  // Module gửi email lắng nghe
  processor.on('paymentSuccess', (userId, amount) => {
      console.log(`[Email Service] Sending confirmation email to user ${userId} for ${amount}.`);
  });

  processor.on('paymentFailed', (userId, amount, reason) => {
      console.error(`[Error Handler] Payment for user ${userId} failed. Reason: ${reason}. Logging error.`);
  });

  // Kích hoạt quá trình thanh toán
  processor.processPayment(100, 'user_123');
  processor.processPayment(50, 'user_456');
  processor.processPayment(200, 'user_789');