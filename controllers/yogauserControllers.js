const YogaUser = require('../models/yogauserModel')
const mongoose = require('mongoose')
const validator = require('validator');


const getUsers = async (req, res) => {
    const users = await YogaUser.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}


const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }

    const user = await YogaUser.findById(id)

    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }

    res.status(200).json(user)
}


const createYogaUser = async (req, res) => {
    const {name, age,email, batch} = req.body

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!age) {
        emptyFields.push('age')
    }
    if (!email) {
        emptyFields.push('email')
    }
    if (!batch) {
        emptyFields.push('batch')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }


    if(age < 18 || age > 65){
        return res.status(400).json({error: 'Age must be between 18-65'})
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({error: 'Enter a valid email'})
    }

     try {
    const existingUser = await YogaUser.findOne({ email: email })
    
    if(existingUser){
        const originalDate = new Date(existingUser.createdAt);

        const options = { year: 'numeric', month: '2-digit' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(originalDate);

        console.log(`${formattedDate}`);

        const currentDate = new Date();

        const option = { year: 'numeric', month: '2-digit' };
        const formattedDate2 = new Intl.DateTimeFormat('en-US', option).format(currentDate);

        console.log(`${formattedDate2}`);

        if(formattedDate === formattedDate2){
            return res.status(400).json({error: 'You have already registered for this month'})
        }
        
        if(formattedDate !== formattedDate2){
            await existingUser.deleteOne();
        }
    }
    } catch (error) {
    console.error('Error checking email existence or deleting user:', error);
    return false;
    }

    try {
        const user = await YogaUser.create({name, age, email, batch})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createYogaUser,
    getUsers,
    getUser
}
