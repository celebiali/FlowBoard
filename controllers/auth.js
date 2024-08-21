const Auth = require('../models/auth.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');    

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await Auth.findOne({ email });
        if(user) {
            return res.status(500).json({ message: 'Bu email hesabı bulunmakta!!!' });
        } 
        if(password.length < 6) {
            return res.status(500).json({ message: 'Şifre en az 6 karakter olmalıdır!!!' });
        }

        const passwordHash = bcrypt.hashSync(password, 12);

        const newUser = await Auth.create({
            username,
            email,
            password: passwordHash
        });

        const userToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({status:"OK", message: 'Kayıt başarılı!',newUser, token: userToken });

    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ email });
        if(!user) {
            return res.status(500).json({ message: 'Böyle bir kullanıcı bulunmamakta!!!' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch) {
            return res.status(500).json({ message: 'Şifre hatalı!!!' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({status:"OK", message: 'Giriş başarılı!', user, token });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }  
}


module.exports = { register, login };