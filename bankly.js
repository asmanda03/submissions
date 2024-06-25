// TESTS BUG #1
it('should authenticate user correctly', async function () {
    const res = await request(app)
      .get('/user/profile')
      .set('Authorization', `Bearer ${validUserTokenForUser123}`);
    expect(res.body.username).toBe('user123');
  });
// FIXES BUG #1
async function authUser(req, res, next) {
    try {
      const token = req.headers['authorization'].split(' ')[1];
      const payload = jwt.verify(token, SECRET_KEY);
      const user = await User.findOne({ username: payload.username });
      if (!user) throw new Error('Invalid user');
      req.user = user;
      return next();
    } catch (err) {
      return next(err);
    }
  }

// TESTS BUG #2
it('should calculate balance correctly', function () {
    const transactions = [
      { type: 'deposit', amount: 100 },
      { type: 'withdrawal', amount: 50 }
    ];
    const balance = calculateBalance(transactions);
    expect(balance).toBe(50);
  });
// FIXES BUG #2
function calculateBalance(transactions) {
    return transactions.reduce((balance, transaction) => {
      if (transaction.type === 'deposit') {
        return balance + transaction.amount;
      } else if (transaction.type === 'withdrawal') {
        return balance - transaction.amount;
      }
      return balance;
    }, 0);
  }

  // TESTS BUG #3
it('should validate input on createTransaction', async function () {
    const res = await request(app)
      .post('/transactions')
      .send({ type: 'withdrawal', amount: 'invalid_amount' });
    expect(res.status).toBe(400);
  });
// FIXES BUG #3
app.post('/transactions', (req, res) => {
    const { type, amount } = req.body;
    if (!['deposit', 'withdrawal'].includes(type) || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    // Process transaction
  });
    